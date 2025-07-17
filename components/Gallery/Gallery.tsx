"use client"

import s from "./Gallery.module.css"
import Image from 'next/image'
import { useState } from "react"
import { BiBorderRadius, BiMessageDetail } from "react-icons/bi"
import { gradientPlaceholder, toRGB } from "@/globals/utils"
import { Medium } from "@/globals/globals_interface"
import Lightbox from "./Lightbox"

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
                images.length === 1 ? 
                    <>
                    <div className={s.flex}>
                        <figure className={s.single}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_STORAGE}${images[0].path}`}
                                alt={images[0].description}
                                width={images[0].width}
                                height={images[0].height}
                                style={images[0].width > images[0].height ? 
                                    {height: "100%", width: "100%", background: gradientPlaceholder(images[0].colors.map(color => color)).background}
                                    :
                                    {width: "50%", height: "100%", background: gradientPlaceholder(images[0].colors.map(color => color)).background}}
                                className={s.image}
                                onClick={()=>handleClick(0)}
                            />
                           {/*<figcaption className={s.caption} dangerouslySetInnerHTML={{__html: images[0].description}}></figcaption> */}
                        </figure>
                        
                    </div> 
                    </>
                :
                    <div className={s.grid}>
                        {images.map((image, index)=>{
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
                    </div>}
        </div>
    )
}