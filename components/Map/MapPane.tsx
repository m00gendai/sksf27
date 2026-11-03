"use client"

import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps"
import { FestivalCentre, ShootingRange } from "./Interface_Map"
import { useState } from "react"
import s from "./MapPane.module.css"
import IconBar from "../IconBar/IconBar"
import { getCenter} from "geolib"
import Link from "next/link"
import Image from "next/image"
import { Card, Inset } from "@radix-ui/themes"
import { IoCloseCircleOutline } from "react-icons/io5"

interface Props{
    ranges: ShootingRange[]
    festivalCentre: FestivalCentre
    isMobile: boolean
}

type SelectedLocation =
    | { kind: "shootingRange"; range: ShootingRange }
    | { kind: "festivalCentre" }
    | null

export default function MapPane({ranges, festivalCentre, isMobile}:Props){

    const rangeCoordinates:{latitude: string, longitude: string}[] = ranges.map(range=>{
        return(
            {
                latitude: range.coordinates.lat,
                longitude: range.coordinates.lon
            }
        )
    })

    const initCenter = getCenter([
        ...rangeCoordinates,
        {latitude: festivalCentre.coordinates[0], longitude: festivalCentre.coordinates[1]},
    ])
    const initialCoordinates: [number, number] = initCenter
        ? [initCenter.latitude, initCenter.longitude]
        : festivalCentre.coordinates

    const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>(null)
    const [center, setCenter] = useState<[number, number]>(initialCoordinates)
    const [zoom, setZoom] = useState(11)

    const currentRange = selectedLocation?.kind === "shootingRange" ? selectedLocation.range : null
    const currentMarker = selectedLocation ? getMarkerCoordinates(selectedLocation) : null

    function getMarkerCoordinates(location: NonNullable<SelectedLocation>): [number, number]{
        return location.kind === "shootingRange"
            ? [parseFloat(location.range.coordinates.lat), parseFloat(location.range.coordinates.lon)]
            : festivalCentre.coordinates
    }

    function handleMarkerClick(location: NonNullable<SelectedLocation>){
        setSelectedLocation(location)
        setCenter(getMarkerCoordinates(location))
    }

    function handleClose(){
        setSelectedLocation(null)
    }

    return(
        <Map 
            defaultCenter={initialCoordinates}
            center={center}
            defaultZoom={12}
            zoom={zoom}
            twoFingerDrag={isMobile}
            onBoundsChanged={({ center, zoom }) => { 
                setCenter(center) 
                setZoom(zoom) 
              }} 
            boxClassname={s.mapLayer}
        >
             <ZoomControl />
            {ranges.map((range, index)=>{
                const coordinates: [number, number] = [parseFloat(range.coordinates.lat), parseFloat(range.coordinates.lon)]
                return <Marker className={s.marker} key={`range_${index}`} width={50} anchor={coordinates} onClick={()=>handleMarkerClick({kind: "shootingRange", range})}/>
            })}
            <Marker width={50} className={s.festivalMarker} anchor={festivalCentre.coordinates} color={festivalCentre.color} onClick={()=>handleMarkerClick({kind: "festivalCentre"})}/>
            {currentRange && currentMarker ? <Marker className={s.marker} width={50} anchor={currentMarker} color={"#FFD730"} /> : null}
            {currentMarker ?
            <Overlay anchor={currentMarker} offset={[0,0]}>
                <Card className={`${s.overlay} ${selectedLocation?.kind === "festivalCentre" ? s.festivalOverlay : ""} boxShadow`}>
                <Inset side="top" clip="padding-box" className={s.cardTop}>
                <div className={s.location}><div className={s.name}>{currentRange ? currentRange.name : festivalCentre.name}</div>
                <div className={s.place}>{currentRange ? currentRange.location : festivalCentre.location}</div></div>
                
                <div className={s.close} onClick={()=>handleClose()}><IoCloseCircleOutline style={{width: "100%", height: "100%"}} /></div>
                </Inset>
                    
                    <div className={s.content}>
                        {currentRange ? <IconBar degrees={currentRange.direction} category={currentRange.category} positions={currentRange.positions}/> : <p className={s.festivalDescription}>{festivalCentre.description}</p>}
                        {selectedLocation?.kind === "festivalCentre" ? <div className={s.festivalLogo}>
                            <Image src={festivalCentre.logo} alt="Logo GVS" width={512} height={238} sizes="160px" className={s.festivalLogoImage}/>
                        </div> : null}
                        <Link className={s.more} href={currentRange ? `/schiessen/schiessanlagen#${currentRange.name}` : festivalCentre.href}>mehr...</Link>
                    </div>
                </Card>
            </Overlay> 
            :
            null}
        </Map>
    )
}
