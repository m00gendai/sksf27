import { GiColtM1911, GiFnFal, GiGlock } from "react-icons/gi"
import Compass from "./Compass/Compass"
import s from "./IconBar.module.css"

interface Props{
    degrees: string
    category: string[]
}

export default function IconBar({degrees, category}:Props){
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
        </div>
    )
}