"use client"

import { usePathname } from "next/navigation"
import { navbar } from "../Navbar/navbarStructure"
import Image from "next/image"
import s from "./PageHeading.module.css"

interface Props{
    image?: string
}

export default function PageHeading({image}:Props){

    const path:string = usePathname()
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
<>
<div className={s.headerImage}><Image src={image === undefined ? "/placeholder.png" : image === null ? "/placeholder.png" : `${process.env.NEXT_PUBLIC_STORAGE}${image}`} alt={""} fill={true} style={{objectFit: "cover"}} /></div>

<h1 className={s.heading}>{title}</h1> 
</>
       
    )
}