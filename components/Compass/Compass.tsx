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
            <div className={s.icon} style={{transform: `rotate(${deg}deg)`}}>
                <div className={s.helper}>
                    <ImCompass className={s.needle}/>
                </div>
            </div>
        </div>
    )
}