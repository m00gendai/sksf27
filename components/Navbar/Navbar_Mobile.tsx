"use client"

import Link from "next/link"
import Image from "next/image"
import s from "./Navbar_Mobile.module.css"
import {useState} from "react"
import { navbar } from "./navbarStructure";
import SH from "@/public/SH.png"
import React from "react"
import { LiaHamburgerSolid } from "react-icons/lia"
import { GiKnifeFork } from "react-icons/gi"
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5"

export default function Navbar_Mobile(){

    const [visible, setVisible] = useState<boolean>(false)
    const [submenu, setSubmenu] = useState<string>("")

    function handleSubMenuTrigger(e:React.MouseEvent, menu:string){
        submenu === menu ? setSubmenu("") : setSubmenu(menu)
    }

    function handleLinkClick(){
        setTimeout(function(){
            setVisible(!visible)
        }, 250)
    }
    return(
        <nav className ={`${s.nav} mobile`}>
            <Link href="/" className={s.logoContainer}>
                <Image
                    src={SH}
                    fill={true}
                    alt={"Schaffhauser Wappen"}
                    style={{objectFit: "contain"}}
                    className={s.logo}
                />
            </Link>
            <div className={s.tagline}>
                <p className={s.taglineText}>{`Schaffhauser Kantonalschützenfest 2027`}</p>
            </div>
            <div className={s.menu} onClick={()=>{setVisible(!visible)}} title="Menü">
            {visible ?
                <div><GiKnifeFork /></div>
            :
            <div><LiaHamburgerSolid /></div>
            }
            </div>
        {visible ?
            <div className={s.container}>
                {navbar.map((item, index)=>{
                    return (
                        item.sub ? 
                        <React.Fragment key={`subMain_${index}`}>
                            <div className={s.link} onClick={(e)=>{handleSubMenuTrigger(e, item.name)}}>{`${item.name}`}{submenu === item.name ? <IoCaretUpSharp style={{margin: "0 0.5rem"}}/> : <IoCaretDownSharp style={{margin: "0 0.5rem"}}/>}</div>
                            {submenu === item.name ? 
                                <div className={s.subLinkContainer}>
                                    {item.sub?.map((sub, index)=>{
                                        return <Link className={s.sublink} href={sub.url} key={`sub_${index}`} onClick={()=>handleLinkClick()}>{`${sub.name}`}</Link>
                                    })}
                                </div>
                            
                            :
                                null
                            }
                        </React.Fragment>
                        :
                        < Link className={s.link} href={item.url} key={`main_${index}`} onClick={()=>handleLinkClick()}>{`${item.name}`}</Link>
                    )
                })}
            </div>
        : 
            null
        }
        </nav>
    )
}