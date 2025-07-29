"use client"

import { Map, Marker, Overlay } from "pigeon-maps"
import { ShootingRange } from "./Interface_Map"
import s from "./MapSingle.module.css"
import Image from "next/image"
import MapMarker from "@/public/maps.png"
import Link from "next/link"

interface Props{
    range: ShootingRange
}


export default function MapSingle({range}:Props){
    return(
        <div className={s.container}>
            <Link href={`https://www.google.com/maps/search/?api=1&query=${range.coordinates.lat}%2C${range.coordinates.lon}`} target="_blank" className={s.mapsLink}  title={`${range.name} in Google Maps öffnen`}>
                <div className={s.icon}>
                    <Image
                        src={MapMarker}
                        alt={"Mit Google Maps öffnen"}
                        fill={true}
                        style={{objectFit: "contain"}}
                    />
                </div>
            </Link>
        <Map 
            defaultCenter={[parseFloat(range.coordinates.lat), parseFloat(range.coordinates.lon)]} defaultZoom={13}
            boxClassname={s.mapLayer}
        >
            <Marker className={s.marker} width={50} anchor={[parseFloat(range.coordinates.lat), parseFloat(range.coordinates.lon)]}/>
        </Map>
        </div>
    )
}