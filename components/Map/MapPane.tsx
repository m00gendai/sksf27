"use client"

import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps"
import { ShootingRange } from "./Interface_Map"
import { useState } from "react"
import s from "./MapPane.module.css"
import IconBar from "../IconBar/IconBar"
import { LuXCircle } from "react-icons/lu"
import { getCenter} from "geolib"
import Link from "next/link"

interface Props{
    ranges: ShootingRange[]
    isMobile: boolean
}

export default function MapPane({ranges, isMobile}:Props){  
    
    const [currentMakrer, setCurrentMarker] = useState<[number, number]>([0,0])
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false)
    const [currentRange, setCurrentRange] = useState<ShootingRange | null>(null)

    function handleMarkerClick(coordinates:[number, number], range:ShootingRange){
        setCurrentMarker(coordinates)
        setCurrentRange(range)
        setOverlayVisible(!overlayVisible)
    }

    const rangeCoordinates:{latitude: string, longitude: string}[] = ranges.map(range=>{
        return(
            {
                latitude: range.coordinates.lat,
                longitude: range.coordinates.lon
            }
        )
    })
    const center: false | {latitude: number, longitude: number} = getCenter(rangeCoordinates);

    return(
        <Map 
            defaultCenter={center ? [center.latitude, center.longitude] : [0,0]} 
            defaultZoom={12}
            twoFingerDrag={isMobile ? true : false}

        >
             <ZoomControl />
            {ranges.map((range, index)=>{
                const coordinates: [number, number] = [parseFloat(range.coordinates.lat), parseFloat(range.coordinates.lon)]
                return <Marker key={`range_${index}`} width={50} anchor={coordinates} onClick={()=>handleMarkerClick(coordinates, range)}/>
            })}
            {overlayVisible ? 
            <Overlay anchor={currentMakrer} offset={[0,0]}>
                <div className={s.overlay}>
                    <div className={s.close} onClick={()=>setOverlayVisible(!overlayVisible)}><LuXCircle style={{width: "100%", height: "100%"}} /></div>
                    <div className={s.content}>
                        <div className={s.name}>{currentRange?.name}</div>
                        <div className={s.place}>{currentRange?.location}</div>
                        <IconBar degrees={currentRange!.direction} category={currentRange!.category} positions={currentRange!.positions}/>
                        <Link className={s.more} href={`/schiessen/schiessanlagen#${currentRange?.name}`}>mehr...</Link>
                    </div>
                </div>
            </Overlay> 
            :
            null}
        </Map>
    )
}