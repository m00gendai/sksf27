import { ImCompass } from "react-icons/im";
import s from "./Compass.module.css"
import { getCompassDegrees } from "@/globals/utils";

interface Props{
    degrees: string
}

export default function Compass({degrees}:Props){

    const deg:number = getCompassDegrees(degrees)

    return(
        <div className={s.container} title={`Schussrichtung: ${degrees}`}>
            <div className={s.n}>N</div>
            <div className={s.o}>O</div>
            <div className={s.s}>S</div>
            <div className={s.w}>W</div>
            <div className={s.icon} style={{transform: ` translate(-50%, -50%) rotate(${deg}deg)`}}>
                <div className={s.helper}>
                    <ImCompass className={s.needle}/>
                </div>
            </div>
        </div>
    )
}