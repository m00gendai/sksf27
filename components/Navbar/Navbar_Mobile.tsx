"use client"

import Link from "next/link"
import Image from "next/image"
import s from "./Navbar_Mobile.module.css"
import {useEffect, useState} from "react"
import { navbar } from "./navbarStructure";
import Medal from "@/public/Logo-SKSF27-klein-strich-negativ.png"
import React from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { RxMoon, RxSun } from "react-icons/rx"
import { IoChevronDown, IoChevronUp, IoClose, IoMenu, IoRemove } from "react-icons/io5"

export default function Navbar_Mobile(){

    const [visible, setVisible] = useState<boolean>(false)
    const [submenu, setSubmenu] = useState<string>("")

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    const pathname = usePathname()

    function handleSubMenuTrigger(e:React.MouseEvent, menu:string){
        submenu === menu ? setSubmenu("") : setSubmenu(menu)
    }

    function handleLinkClick(){
        setTimeout(function(){
            setVisible(!visible)
        }, 250)
    }
 useEffect(() => {
    setMounted(true)
  }, [])
      if (!mounted) {
    return null
  }

  function toggleTheme(){
    theme === "dark" ? setTheme("light") : setTheme("dark")
  }


    return(
        <nav className ={`${s.nav} mobile`}>
            <Link href="/" className={pathname === "/" ? s.logoContainer : s.logoContainer2}  title={`Link zur Startseite`}>
               {pathname !== "/" ? <div className={s.logoInner}><Image
                    src={Medal}
                    fill={true}
                    alt={"Kranzabzeichen"}
                    style={{objectFit: "contain"}}
                    className={s.logo}
                /></div> : null}
            </Link>
            <div className={s.tagline}>
                <p className={s.taglineText}>{`Schaffhauser Kantonalschützenfest 2027`}</p>
            </div>
            <button title="Schaltet Hell-/Dunkelmodus um" className={s.toggleMode} onClick={toggleTheme}>
                {theme === "light" ? <RxMoon /> : <RxSun />}
            </button>
            <div className={s.menu} onClick={()=>{setVisible(!visible)}} title="Menü">
            {visible ?
                <div className={s.menuIcon}><IoClose /></div>
            :
            <div className={s.menuIcon}> <IoMenu /></div>
            }
            </div>
        {visible ?
            <div className={s.container}>
                {navbar.map((item, index)=>{
                    return (
                        item.sub ? 
                        <React.Fragment key={`subMain_${index}`}>
                            <div className={s.link} onClick={(e)=>{handleSubMenuTrigger(e, item.name)}}>{`${item.name}`}{submenu === item.name ? <IoChevronUp style={{margin: "0 0.5rem"}}/> : <IoChevronDown style={{margin: "0 0.5rem"}}/>}</div>
                            {submenu === item.name ? 
                                <div className={s.subLinkContainer}>
                                    {item.sub?.map((sub, index)=>{
                                        return <div key={`sub_${index}`} className={s.sublink}><IoRemove style={{fontWeight: "bolder", margin: "0 0 0 1rem"}}/><Link className={s.sublinkItem} href={sub.url} onClick={()=>handleLinkClick()}>{`${sub.name}`}</Link></div>
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