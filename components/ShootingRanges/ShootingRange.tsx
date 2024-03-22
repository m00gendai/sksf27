"use client"

import { ShootingRange as RangeType } from "../Map/Interface_Map"
import s from "./ShootingRange.module.css"
import Image from "next/image"
import Testbild from "@/public/testbild.png"
import MapSingle from "../Map/MapSingle";
import { Card, Tabs } from "@radix-ui/themes"
import Compass from "../Compass/Compass"
import { GiFnFal, GiGlock, GiLeeEnfield } from "react-icons/gi"

interface Props{
    range: RangeType
}

export default function ShootingRange({range}:Props){

    return(
        <Card>
            <div className={s.title}>{range.name}</div>
            <div className={s.iconRow}>
                <Compass degrees={range.direction} />
                <div className={s.iconRowItem} title={`Gewehr`}>
                    <div className={s.icon}>
                        <GiFnFal />
                    </div>
                </div>
                <div className={s.iconRowItem} title={`Pistole`}>
                    <div className={s.icon}>
                        <GiGlock />
                    </div>
                </div>
            </div>
            <div className={s.header}>
            {range.images ? <Image src={`${process.env.NEXT_PUBLIC_STORAGE}${range.images[0].path}`} alt={""} fill={true} style={{objectFit: "cover"}} /> : <Image src={Testbild} alt={"Testbild"} fill={true} style={{objectFit: "cover"}} />}
            </div>
            <Tabs.Root defaultValue="data">
                <Tabs.List>
                    <Tabs.Trigger value="data">Daten</Tabs.Trigger>
                    <Tabs.Trigger value="map">Karte</Tabs.Trigger>
                    <Tabs.Trigger value="img">Bilder</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="data">
                    <div className={s.data}>
                        <table className={s.table}>
                            <tbody className={s.tableBody}>
                                <tr className={s.tableRow}>
                                    <td className={s.key}>Ort</td>
                                    <td>{range.location}</td>
                                </tr>
                                <tr className={s.tableRow}>
                                    <td className={s.key}>
                                        Kategorie
                                    </td>
                                    <td className={s.value}>{range.category.map(cat => <p key={cat}>{cat}</p>)}</td>
                                </tr>
                                <tr className={s.tableRow}>
                                    <td className={s.key}>Scheiben</td>
                                    <td className={s.value}>{range.targets?.map(target=>{
                                        return <p key={target.type}>{`${target.amount} ${target.type}`}</p>
                                    })}</td>
                                </tr>
                                <tr className={s.tableRow}>
                                    <td className={s.key}>Schussrichtung</td>
                                    <td className={s.value}>{range.direction}</td>
                                </tr>
                                {range.positions ?
                                <tr className={s.tableRow}>
                                    <td className={s.key}>Stellungen</td>
                                    <td className={s.value}>{range.positions?.length === 1 ? range.positions[0] : range.positions.join(", ")}</td>
                                </tr>
                                :
                                null}
                            </tbody>
                        </table>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="map">
                    <MapSingle range={range} />
                </Tabs.Content>
                <Tabs.Content value="img">
                </Tabs.Content>
            </Tabs.Root>
        </Card>
    )
}