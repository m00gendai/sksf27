"use client"

import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps"
import type { Point } from "pigeon-maps"
import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { FestivalCentre, ShootingRange } from "./Interface_Map"
import { getOverviewCamera, keepPopupVisible } from "./mapViewport"
import type { MapCamera, MapSize } from "./mapViewport"
import s from "./MapPane.module.css"
import IconBar from "../IconBar/IconBar"
import Link from "next/link"
import Image from "next/image"
import { Card, Inset } from "@radix-ui/themes"
import { IoArrowForward, IoCloseCircleOutline } from "react-icons/io5"

interface Props {
    ranges: ShootingRange[]
    festivalCentre: FestivalCentre
}

type SelectedLocation =
    | { kind: "shootingRange"; range: ShootingRange }
    | { kind: "festivalCentre" }
    | null

function rangeCoordinates(range: ShootingRange): Point {
    return [parseFloat(range.coordinates.lat), parseFloat(range.coordinates.lon)]
}

export default function MapPane({ ranges, festivalCentre }: Props) {
    const viewportRef = useRef<HTMLDivElement>(null)
    const popupRef = useRef<HTMLDivElement>(null)
    const overviewMode = useRef(true)
    const popupNeedsPan = useRef(false)
    const [viewport, setViewport] = useState<MapSize | null>(null)
    const [camera, setCamera] = useState<MapCamera | null>(null)
    const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>(null)
    const [popupSize, setPopupSize] = useState<MapSize | null>(null)
    const [twoFingerDrag, setTwoFingerDrag] = useState(false)
    const locations = useMemo(
        () => [...ranges.map(rangeCoordinates), festivalCentre.coordinates],
        [ranges, festivalCentre.coordinates],
    )
    const currentRange = selectedLocation?.kind === "shootingRange" ? selectedLocation.range : null
    const currentMarker = useMemo(() => selectedLocation
        ? selectedLocation.kind === "shootingRange"
            ? rangeCoordinates(selectedLocation.range)
            : festivalCentre.coordinates
        : null, [selectedLocation, festivalCentre.coordinates])

    useEffect(() => {
        const media = window.matchMedia("(any-pointer: coarse)")
        const update = () => setTwoFingerDrag(media.matches || navigator.maxTouchPoints > 0)
        update()
        media.addEventListener("change", update)
        return () => media.removeEventListener("change", update)
    }, [])

    useEffect(() => {
        const element = viewportRef.current
        if (!element) return
        let previousSize: MapSize | null = null

        const measure = () => {
            const { width, height } = element.getBoundingClientRect()
            if (width <= 0 || height <= 0) return
            if (previousSize?.width === width && previousSize.height === height) return
            const size = { width, height }
            previousSize = size
            setViewport(size)
            popupNeedsPan.current = true
            if (overviewMode.current) setCamera(getOverviewCamera(locations, size))
        }
        const observer = new ResizeObserver(measure)
        observer.observe(element)
        measure()
        return () => observer.disconnect()
    }, [locations])

    useEffect(() => {
        const element = popupRef.current
        if (!element || !selectedLocation) return
        let previousSize: MapSize | null = null

        const measure = () => {
            const { width, height } = element.getBoundingClientRect()
            if (previousSize?.width === width && previousSize.height === height) return
            previousSize = { width, height }
            popupNeedsPan.current = true
            setPopupSize(previousSize)
        }
        const observer = new ResizeObserver(measure)
        observer.observe(element)
        measure()
        element.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true })
        return () => observer.disconnect()
    }, [selectedLocation])

    useEffect(() => {
        if (!popupNeedsPan.current || !camera || !currentMarker || !viewport || !popupSize) return
        popupNeedsPan.current = false
        const next = keepPopupVisible(camera, currentMarker, viewport, popupSize)
        if (next !== camera) setCamera(next)
    }, [camera, currentMarker, viewport, popupSize])

    function handleMarkerClick(location: NonNullable<SelectedLocation>) {
        overviewMode.current = false
        popupNeedsPan.current = true
        setPopupSize(null)
        setSelectedLocation(location)
    }

    function handleClose() {
        setSelectedLocation(null)
        setPopupSize(null)
        viewportRef.current?.focus({ preventScroll: true })
    }

    function showOverview() {
        if (!viewport) return
        overviewMode.current = true
        setSelectedLocation(null)
        setPopupSize(null)
        setCamera(getOverviewCamera(locations, viewport))
    }

    const viewportStyle = viewport ? {
        "--map-popup-max-height": `${Math.max(80, viewport.height - 92)}px`,
        "--map-popup-max-width": `${Math.max(1, viewport.width - 32)}px`,
    } as CSSProperties : undefined

    return (
        <div
            className={s.viewport}
            ref={viewportRef}
            style={viewportStyle}
            role="region"
            tabIndex={-1}
            aria-label="Karte der Schiessanlagen und des Festzentrums"
            onPointerDownCapture={() => { overviewMode.current = false }}
            onWheelCapture={event => {
                if (event.ctrlKey || event.metaKey) overviewMode.current = false
            }}
            onClickCapture={event => {
                if ((event.target as Element).closest(".pigeon-zoom-buttons")) overviewMode.current = false
            }}
            onKeyDown={event => {
                if (event.key === "Escape") handleClose()
            }}
        >
            {viewport && camera ? <>
                <Map
                    width={viewport.width}
                    height={viewport.height}
                    center={camera.center}
                    zoom={camera.zoom}
                    twoFingerDrag={twoFingerDrag}
                    twoFingerDragWarning="Die Karte mit zwei Fingern verschieben."
                    metaWheelZoom
                    metaWheelZoomWarning="Zum Zoomen META gedrückt halten und scrollen."
                    onBoundsChanged={({ center, zoom }) => {
                        setCamera(previous => previous
                            && Math.abs(previous.center[0] - center[0]) < 0.0000001
                            && Math.abs(previous.center[1] - center[1]) < 0.0000001
                            && Math.abs(previous.zoom - zoom) < 0.000001
                            ? previous : { center, zoom })
                    }}
                    boxClassname={s.mapLayer}
                >
                    <ZoomControl buttonStyle={{ width: 44, height: 44, lineHeight: "42px", color: "var(--generalFontColor)" }} />
                    {ranges.map(range => <Marker
                        className={s.marker}
                        key={range._id}
                        width={50}
                        anchor={rangeCoordinates(range)}
                        onClick={() => handleMarkerClick({ kind: "shootingRange", range })}
                    />)}
                    <Marker width={50} className={s.festivalMarker} anchor={festivalCentre.coordinates}
                        color={festivalCentre.color} onClick={() => handleMarkerClick({ kind: "festivalCentre" })} />
                    {currentRange && currentMarker ? <Marker className={s.marker} width={50} anchor={currentMarker} color="#FFD730" /> : null}
                    {currentMarker ? <Overlay anchor={currentMarker} offset={[0, 0]}>
                        <Card ref={popupRef} className={`${s.overlay} ${selectedLocation?.kind === "festivalCentre" ? s.festivalOverlay : ""} boxShadow pigeon-drag-block`}
                            onWheelCapture={event => event.stopPropagation()}>
                            <Inset side="top" clip="padding-box" className={s.cardTop}>
                                <div className={s.location}>
                                    <div className={s.name}>{currentRange ? currentRange.name : festivalCentre.name}</div>
                                    <div className={s.place}>{currentRange ? currentRange.location : festivalCentre.location}</div>
                                </div>
                                <button type="button" className={s.close} onClick={handleClose} aria-label="Popup schliessen">
                                    <IoCloseCircleOutline aria-hidden="true" />
                                </button>
                            </Inset>
                            <div className={s.content}>
                                {currentRange ? <div className={s.rangeDetails}>
                                    <IconBar degrees={currentRange.direction} category={currentRange.category} positions={currentRange.positions} />
                                </div> : <p className={s.festivalDescription}>{festivalCentre.description}</p>}
                                {selectedLocation?.kind === "festivalCentre" ? <div className={s.festivalLogo}>
                                    <Image src={festivalCentre.logo} alt="Logo GVS" width={512} height={238} sizes="160px" className={s.festivalLogoImage} />
                                </div> : null}
                                <Link className={s.more}
                                    href={currentRange ? `/schiessen/schiessanlagen#${currentRange.name}` : festivalCentre.href}
                                    aria-label={`Mehr erfahren: ${currentRange ? currentRange.name : festivalCentre.name}`}>
                                    Mehr erfahren <IoArrowForward aria-hidden="true" />
                                </Link>
                            </div>
                        </Card>
                    </Overlay> : null}
                </Map>
                <button type="button" className={`${s.overview} pigeon-drag-block pigeon-click-block`} onClick={showOverview}>Alle Standorte anzeigen</button>
            </> : null}
        </div>
    )
}
