"use client"

import { usePathname } from "next/navigation"
import { navbar } from "../Navbar/navbarStructure"
import Image, { type StaticImageData } from "next/image"
import s from "./PageHeading.module.css"
import type { CSSProperties } from "react"
import { headerImagePositions } from "@/config/headerImagePositions"

interface Props{
    // Strings are Cockpit paths; static imports are local images (for example from public).
    image?: string | StaticImageData
    title?: string
}

type HeaderStyle = CSSProperties & {
    "--header-position"?: string
    "--header-position-mobile"?: string
}

export default function PageHeading({image, title: customTitle}:Props){
    const path = usePathname().replace(/\/+$/, "") || "/"
    const position = headerImagePositions[path]
    const headerStyle: HeaderStyle = {
        "--header-position": position?.desktop,
        "--header-position-mobile": position?.mobile,
    }
    const title = customTitle ?? navbar
        .flatMap(item => [item, ...(item.sub ?? [])])
        .find(item => item.url === path)?.name
    const imageSrc = image == null
        ? "/placeholder.png"
        : typeof image === "string"
            ? `${process.env.NEXT_PUBLIC_STORAGE}${image}`
            : image

    return (
        <header className={s.header} style={headerStyle}>
            <div className={s.headerImage}>
                <Image
                    src={imageSrc}
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

