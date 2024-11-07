"use client" 

import { OK } from "./Interface_Organisation";
import s from "./OrgPosition.module.css"
import Image from "next/image"
import Testbild from "@/public/testbild.png"

export default function OrgPosition({ data }: { data: OK }){

    function detail(){ 
        if (typeof window !== "undefined" && document) {
            document.getElementById(`${data.title}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
    return(
        <div className={s.container} onClick={()=>detail()} >
            <h3 className={s.title}>{data.title}</h3>
            <div className={s.nameContainer}>
                <div className={s.name}>
                    {data.name}
                </div>
                <div className={s.imageContainer}>
                    {data.foto ? <Image src={`${process.env.NEXT_PUBLIC_STORAGE}${data.foto.path}`} alt={""} fill={true} style={{objectFit: "cover"}} className="boxShadow"/> : <Image src={Testbild} alt={"Testbild"} fill={true} style={{objectFit: "cover"}} className="boxShadow"/>}
                </div>
            </div>
        </div>
    )
}