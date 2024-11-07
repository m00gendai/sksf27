import { LuCopyright, LuExternalLink, LuMail, LuPalette } from "react-icons/lu"
import s from "./Footer.module.css"
import Link from "next/link"

export default async function Footer(){

    const date:Date = new Date()
    const currentYear:number = date.getFullYear()
    const creationYear:number = 2024

    return(
        <footer className={s.footer}>
            <div className={s.copyright}><LuCopyright style={{margin:"0 0.25rem 0 0"}}/> {`${creationYear}${currentYear === creationYear ? "" : `-${currentYear}`} Schaffhauser Kantonalschützenfest 2027`}</div>
            <div className={s.mail}><LuMail style={{margin: "0 0.25rem 0 0"}}/><a href="mailto:info@sksf27.ch">info@sksf27.ch</a></div>
            <div className={s.links}>
                <Link href="/impressum"><LuExternalLink style={{margin: "0 0.25rem 0 0"}}/> Impressum</Link>
                <Link href="/datenschutz"><LuExternalLink style={{margin: "0 0.25rem 0 0"}}/>Datenschutz</Link>
            </div>
            <div className={s.shamelessPlug}><a href="https://mrweber.ch" target="_blank"><LuPalette style={{margin: "0 0.25rem 0 0"}} />Webdesign von <u>mrweber.ch</u></a></div>
        </footer>
    )
    }