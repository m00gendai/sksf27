"use client"

import { Map, Marker, Overlay } from "pigeon-maps"
import { ShootingRange } from "./Interface_Map"
import { useState } from "react"
import s from "./MapPane.module.css"

interface Props{
    ranges: ShootingRange[]
}

export default function MapPane({ranges}:Props){  
    
    const [currentMakrer, setCurrentMarker] = useState<[number, number]>([0,0])
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false)
    const [currentRange, setCurrentRange] = useState<ShootingRange | null>(null)

    function handleMarkerClick(coordinates:[number, number], range:ShootingRange){
        setCurrentMarker(coordinates)
        setCurrentRange(range)
        setOverlayVisible(!overlayVisible)
    }

    return(
        <Map defaultCenter={[47.7363, 8.6845]} defaultZoom={11}>
            {ranges.map((range, index)=>{
                const coordinates: [number, number] = [parseFloat(range.coordinates.lat), parseFloat(range.coordinates.lon)]
                return <Marker key={`range_${index}`} width={50} anchor={coordinates} onClick={()=>handleMarkerClick(coordinates, range)}/>
            })}
            {overlayVisible ? 
            <Overlay anchor={currentMakrer} offset={[0,0]}>
                <div className={s.overlay}>
                    <div className={s.close} onClick={()=>setOverlayVisible(!overlayVisible)}>X</div>
                    <div className={s.content}>
                        <div className={s.range}>
                            {`${currentRange?.name}, ${currentRange?.location}`}
                        </div>
                        <div className={s.categories}>
                            {currentRange?.category.map(cat=>{
                                return <p key={`${currentRange.name}_${cat}`}>{cat}</p>
                            })}
                        </div>
                    </div>
                </div>
            </Overlay> 
            :
            null}
        </Map>
    )
}