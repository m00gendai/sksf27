"use client"

import { useState, useEffect } from "react"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { navbar } from "./navbarStructure";
import s from "./Navbar.module.css"
import SH from "@/public/SH.png"
import { IoCaretDownSharp } from "react-icons/io5"

export default function Navbar(){

    const [overTrigger, setOverTrigger] = useState<boolean>(false) // checks if cursor is over trigger link
    const [visible, setVisible] = useState<boolean>(false) // checks if submenu is visible
    const [submenu, setSubmenu] = useState<string>("")

    function handleSubMenuTrigger(e:React.MouseEvent, menu:string){
        submenu === menu ? setSubmenu("") : setSubmenu(menu)
        if(e.type == "mouseenter"){
            setOverTrigger(true)
        } else if(e.type == "mouseleave"){
            setOverTrigger(false)
        }
    }

    useEffect(()=>{
        if(overTrigger){
            setVisible(true)
        }
        if(!overTrigger){
            setVisible(false)
        }
    },[overTrigger])


    return(
        <nav className ={`${s.nav} desktop`}>
            <Link href="/" className={s.logoContainer}  title={`Link zur Startseite`}>
                <Image
                    src={SH}
                    fill={true}
                    alt={"Schaffhauser Wappen"}
                    style={{objectFit: "contain"}}
                    className={s.logo}
                />
            </Link>
            <div className={s.tagline}>
                {`Schaffhauser Kantonalschützenfest 2027`}
            </div>
            <div className={s.container}>
                {navbar.map((item, index)=>{
                    return(
                        item.sub ?
                        <div className={s.surLinkContainer} onMouseEnter={(e)=>handleSubMenuTrigger(e, item.name)} onMouseLeave={(e)=>handleSubMenuTrigger(e, item.name)} key={`subMain_${index}`}>
                            <div className={s.link} >{`${item.name}`} <IoCaretDownSharp style={{margin: "0 0.5rem"}}/></div>
                            {visible && submenu === item.name ?
                                <div className={s.subLinkContainer}>
                                    <div className={s.buffer}></div>
                                    <div className={s.content}>
                                        <div className={s.items}>
                                            {item.sub?.map((sub, index)=>{
                                                return(
                                                    <Link className={s.sublink} href={sub.url} key={`sub_${index}`}  title={`Link zur Seite: ${sub.name}`}>{`${sub.name}`}</Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                            }
                        </div>
                        :

                            <Link className={s.link} href={item.url} key={`main_${index}`}  title={`Link zur Seite: ${item.name}`}>{`${item.name}`}</Link>

                        )
                })}
            </div>
        </nav>
    )
}