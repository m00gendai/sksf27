import { navbar } from "../Navbar/navbarStructure"
import s from "./QuickLinks.module.css"
import Link from "next/link"

export default function QuickLinks(){
    return(
        <div className={s.container}>
            {navbar.map(item=>{
                if(item.isQuickLink){
                    return(
                        <Link key={`quicklink_${item.name}`} href={item.url} className={s.item}>
                            {item.name}
                        </Link>
                    )
                }
                if(item.sub !== undefined){
                    return item.sub.map(sub=>{
                        if(sub.isQuickLink){
                            return(
                                <Link key={`quicklink_${sub.name}`} href={sub.url} className={s.item}>
                                    <div className={s.icon}>{sub.icon}</div>
                                    <div className={s.name}>{sub.name}</div>
                                </Link>
                            )
                        }
                    })
                }
            })
            }
        </div>
    )
}