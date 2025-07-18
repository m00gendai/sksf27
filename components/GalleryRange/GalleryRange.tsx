"use client"

import s from "./GalleryRange.module.css"
import Image from 'next/image'
import { useState } from "react"
import { BiBorderRadius, BiMessageDetail } from "react-icons/bi"
import { gradientPlaceholder, toRGB } from "@/globals/utils"
import { Medium } from "@/globals/globals_interface"
import Lightbox from "../Gallery/Lightbox"


interface Props{
    images: Medium[]
}

export default function Gallery({images}:Props){

    const [showLightBox, setShowLightBox] = useState<boolean>(false)
    const [lightBoxIndex, setLightBoxIndex] = useState<number>(0)

    function handleClick(index:number){
        setLightBoxIndex(index)
        setShowLightBox(true)
    }

    return (
        <div className={s.container}>
            {showLightBox ? 
                images.length > 0 ? 
                    <Lightbox 
                        images={images} 
                        lightBoxIndex={lightBoxIndex} 
                        setLightBoxIndex={setLightBoxIndex} 
                        setShowLightBox={setShowLightBox}
                    />
                : null 
            : null}
            {
                <div className={s.grid}>
                    {images?.map((image, index)=>{
                        const rgb:string[] = image.colors.map(color => toRGB(color))
                        return(
                            <div key={image._id} className={s.itemFrame}>
                                <div className={s.itemContainer}
                                style={gradientPlaceholder(rgb)}
                                >
                                    {image.description ? <BiMessageDetail style={{
                                        zIndex: 2,
                                        position: "absolute",
                                        top: "0.25rem",
                                        right: "0.25rem",
                                        color: "green",
                                        background: "white",
                                        borderRadius: "50%",
                                        padding: "0.25rem",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    title={`Bildunterschrift vorhanden: Auf das Bild klicken, um sie zu lesen!`}/> : null}
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_STORAGE}${image.path}`}
                                            alt={image.description}
                                            fill={true}
                                            style={{objectFit: "cover"}}
                                            onClick={()=>handleClick(index)}
                                        />
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}