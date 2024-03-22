"use client"

import { usePathname } from "next/navigation"
import { navbar } from "../Navbar/navbarStructure"
import s from "./PageHeading.module.css"

export default function PageHeading(){

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

        <h1 className={s.heading}>{title}</h1> 
    )
}