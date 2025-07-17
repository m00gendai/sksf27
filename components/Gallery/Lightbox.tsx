import s from "./Lightbox.module.css"
import { useEffect, useState } from 'react';
import Image from "next/image"
import { BiChevronDown, BiChevronLeft, BiChevronRight, BiChevronUp, BiLinkExternal, BiX } from "react-icons/bi";
import { Medium } from "@/globals/globals_interface";

interface Props{
    images: Medium[]
    lightBoxIndex: number
    setLightBoxIndex: React.Dispatch<React.SetStateAction<number>>
    setShowLightBox: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Lightbox({images, lightBoxIndex, setLightBoxIndex, setShowLightBox}:Props){

    const [currentImg, setCurrentImg] = useState<Medium>(images[lightBoxIndex])
    const [showCaption, setShowCaption] = useState<boolean>(false)

    function handleClose(){
        setShowLightBox(false)
    }

    function handleFull(){
        window.open(`${process.env.NEXT_PUBLIC_STORAGE}${currentImg.path}`)
    }
    
    function handleLever(){
        setShowCaption(!showCaption)
    }

    function handleNavigation(int:number){
            setCurrentImg(images[lightBoxIndex])
    }

    useEffect(()=>{
        handleNavigation(lightBoxIndex)
    },[lightBoxIndex])

    return(
        <div className={s.veil}>
            <div className={s.modal}>
                <button className={s.closeWrapper} title="Schliessen" onClick={()=>handleClose()}><BiX style={{color: "rgba(255,255,255,0.5)", fontSize: "5rem", stroke: "black", strokeWidth: ".5px"}}/></button>
                <button className={s.fullWrapper} title="Vollbild" onClick={()=>handleFull()}><BiLinkExternal style={{color: "rgba(255,255,255,0.5)", fontSize: "5rem", stroke: "black", strokeWidth: ".5px"}}/></button>
                <div className={s.imageWrapper}>
                    {
                        images.length > 1 ? 
                            <div 
                                className={s.prev} 
                                onClick={()=>setLightBoxIndex(lightBoxIndex === 0 ? images.length-1 : lightBoxIndex-1)}
                            >
                                <BiChevronLeft style={{stroke: "black", strokeWidth: ".5px"}}/>
                            </div> 
                        : 
                            null
                    }
                    {
                        images.length > 1 ? 
                            <div 
                                className={s.next} 
                                onClick={()=>setLightBoxIndex(lightBoxIndex === images.length-1 ? 0 : lightBoxIndex+1)}
                            >
                                <BiChevronRight style={{stroke: "black", strokeWidth: ".5px"}}/>
                            </div> 
                        :   
                        null
                    }
                <Image
                        src={`${process.env.NEXT_PUBLIC_STORAGE}${currentImg.path}`}
                        alt={currentImg.title}
                        fill={true}
                        style={{objectFit: "contain", border: "none", boxShadow: "none"}}
                    />
                    {
                        currentImg.description ?
                            <div 
                                className={s.caption} 
                                style={showCaption ? {height: "auto"} : { height: "0"}}
                            >
                                <div 
                                    className={s.lever} 
                                    onClick={()=>handleLever()}>{showCaption ? <BiChevronDown />:<BiChevronUp />}{`Bildunterschrift`}{showCaption ? <BiChevronDown />:<BiChevronUp />}</div>
                        {showCaption ? <div className={s.text} dangerouslySetInnerHTML={{__html: currentImg.description}}></div> : null}
                    </div>
                    : null}
                </div>
            </div>
        </div>
    )
}