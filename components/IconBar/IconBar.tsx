import { GiColtM1911, GiFnFal, GiGlock } from "react-icons/gi"
import Compass from "./Compass/Compass"
import s from "./IconBar.module.css"
import Pistole from "@/public/Pistole.png"
import Stehend from "@/public/Stehend.png"
import Kniend from "@/public/Kniend.png"
import Liegend from "@/public/Liegend.png"
import Image from "next/image"

interface Props{
    degrees: string
    category: string[]
    positions: string[]
}

export default function IconBar({degrees, category, positions}:Props){
    return(
    <div className={s.container}>
            <Compass degrees={degrees} />
            {category.includes("Gewehr 300m") ? 
            <div className={s.iconRowItem} title={`Gewehr`}>
                <div className={s.iconContainer}>
                    <GiFnFal className={s.icon}/><div className={s.distance}>{`300`}</div>
                </div>
            </div>
            : null}
            {category.includes("Pistole 50m") ? 
            <div className={s.iconRowItem} title={`Pistole`}>
                <div className={s.iconContainer}>
                    <GiGlock className={s.icon} /><div className={s.distance}>{`50`}</div>
                </div>
            </div>
            : null}
            {category.includes("Pistole 25m") ?
            <div className={s.iconRowItem} title={`Pistole`}>
                <div className={s.iconContainer}>
                    <GiColtM1911 className={s.icon} /><div className={s.distance}>{`25`}</div>
                </div>
            </div>
            :
            null}
            {positions && positions.includes("Stehend") ?
            <div className={s.iconRowItem} title={`Gewehr stehend`}>
                <div className={s.iconContainer}>
                    <Image src={Stehend} alt={"Gewehr stehend"} fill={true} />
                </div>
            </div>
            :
            null}
            {positions && positions.includes("Kniend") ?
            <div className={s.iconRowItem} title={`Gewehr kniend`}>
                <div className={s.iconContainer}>
                    <Image src={Kniend} alt={"Gewehr kniend"} fill={true} />
                </div>
            </div>
            :
            null}
            {positions && positions.includes("Liegend") ?
            <div className={s.iconRowItem} title={`Gewehr liegend`}>
                <div className={s.iconContainer}>
                    <Image src={Liegend} alt={"Gewehr liegend"} fill={true} />
                </div>
            </div>
            :
            null}
            {category.includes("Pistole 50m") || category.includes("Pistole 25m") ?
            <div className={s.iconRowItem} title={`Pistole stehend frei`}>
                <div className={s.iconContainer}>
                    <Image src={Pistole} alt={"Pistole stehend frei"} fill={true} />
                </div>
            </div>
            :
            null}
        </div>
    )
}