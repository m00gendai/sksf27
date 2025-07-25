"use client"

import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps"
import { ShootingRange } from "./Interface_Map"
import { useState } from "react"
import s from "./MapPane.module.css"
import IconBar from "../IconBar/IconBar"
import { IoCloseCircleOutline } from "react-icons/io5";
import { getCenter} from "geolib"
import Link from "next/link"
import { Card, Inset } from "@radix-ui/themes"

interface Props{
    ranges: ShootingRange[]
    isMobile: boolean
}

export default function MapPane({ranges, isMobile}:Props){  


    const rangeCoordinates:{latitude: string, longitude: string}[] = ranges.map(range=>{
        return(
            {
                latitude: range.coordinates.lat,
                longitude: range.coordinates.lon
            }
        )
    })

    const initCenter: false | {latitude: number, longitude: number} = getCenter(rangeCoordinates);
    
    const [currentMakrer, setCurrentMarker] = useState<[number, number]>([0,0])
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false)
    const [currentRange, setCurrentRange] = useState<ShootingRange | null>(null)
    const [center, setCenter] = useState<[number, number]>([initCenter ? initCenter.latitude : 0, initCenter ? initCenter.longitude : 0])
    const [zoom, setZoom] = useState(11)
    const [clicked, setClicked] = useState<boolean>(false)

    function handleMarkerClick(coordinates:[number, number], range:ShootingRange){
        setCenter(coordinates)
        setCurrentMarker(coordinates)
        setCurrentRange(range)
        setOverlayVisible(true)
        setClicked(true)
    }

    function handleClose(){
        setOverlayVisible(false)
        setClicked(false)
    }

    return(
        <Map 
            defaultCenter={initCenter ? [initCenter.latitude, initCenter.longitude] : [0,0]} 
            center={center}
            defaultZoom={12}
            zoom={zoom}
            twoFingerDrag={isMobile ? true : false}
            onBoundsChanged={({ center, zoom }) => { 
                setCenter(center) 
                setZoom(zoom) 
              }} 

        >
             <ZoomControl />
            {ranges.map((range, index)=>{
                const coordinates: [number, number] = [parseFloat(range.coordinates.lat), parseFloat(range.coordinates.lon)]
                return <Marker key={`range_${index}`} width={50} anchor={coordinates} onClick={()=>handleMarkerClick(coordinates, range)}/>
            })}
            {clicked ? <Marker width={50} anchor={currentMakrer} color={"#FFD730"} /> : null}
            {overlayVisible ? 
            <Overlay anchor={currentMakrer} offset={[0,0]}>
                <Card className={`${s.overlay} boxShadow`}>
                <Inset side="top" clip="padding-box" className={s.cardTop}>
                <div className={s.location}><div className={s.name}>{currentRange?.name}</div>
                <div className={s.place}>{currentRange?.location}</div></div>
                
                <div className={s.close} onClick={()=>handleClose()}><IoCloseCircleOutline style={{width: "100%", height: "100%"}} /></div>
                </Inset>
                    
                    <div className={s.content}>
                        <IconBar degrees={currentRange!.direction} category={currentRange!.category} positions={currentRange!.positions}/>
                        <Link className={s.more} href={`/schiessen/schiessanlagen#${currentRange?.name}`}>mehr...</Link>
                    </div>
                </Card>
            </Overlay> 
            :
            null}
        </Map>
    )
}