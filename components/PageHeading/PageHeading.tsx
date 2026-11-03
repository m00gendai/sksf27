"use client"

import { usePathname } from "next/navigation"
import { navbar } from "../Navbar/navbarStructure"
import Image from "next/image"
import s from "./PageHeading.module.css"
import type { CSSProperties } from "react"
import { headerImagePositions } from "@/config/headerImagePositions"

interface Props{
    image?: string
}

type HeaderStyle = CSSProperties & {
    "--header-position"?: string
    "--header-position-mobile"?: string
}

export default function PageHeading({image}:Props){

    const path:string = usePathname()
    const position = headerImagePositions[path.replace(/\/+$/, "") || "/"]
    const headerStyle: HeaderStyle = {
        "--header-position": position?.desktop,
        "--header-position-mobile": position?.mobile,
    }
    const crumbs:string[] = path.split("/")
    const title:(string | (string | undefined)[] | undefined)[] = navbar.map(item =>{
        if(item.url.split("/")[item.url.split("/").length-1] === crumbs[crumbs.length-1]){
            return item.name
        }
        if(item.sub){
            return item.sub.map(sub =>{
                if(sub.url.split("/")[sub.url.split("/").length-1] === crumbs[crumbs.length-1]){
                    return sub.name
                }
            })
        }
    })

    
   
    

    return(
<header className={s.header} style={headerStyle}>
<div className={s.headerImage}>
    <Image
        src={image === undefined ? "/placeholder.png" : image === null ? "/placeholder.png" : `${process.env.NEXT_PUBLIC_STORAGE}${image}`}
        alt=""
        fill
        sizes="100vw"
        priority
        className={s.image}
    />
</div>

<h1 className={s.heading}>{title}</h1> 
</header>
       
    )
}
