import { GiArcheryTarget, GiFnFal, GiLuger } from "react-icons/gi"
import s from "./Divider.module.css"

export default function Divider(){

    const random:number = Math.floor(Math.random() * 10) + 1;

    return(
        <div className={s.container}>
            <div className={s.gun} style={random%2 === 0 ? {transform: "rotate(042deg)"}:{}}>
                {random%2 === 0 ? <GiFnFal style={{width: "100%", height: "100%"}}/> : <GiLuger style={{width: "50%", height: "50%"}}/>}
            </div>
            <div className={s.dash}>
                <div className={s.inner}>
                </div>
            </div>
            <div className={s.target}>
                <GiArcheryTarget style={{width: "100%", height: "100%"}}/>
            </div>
        </div>
    )
}