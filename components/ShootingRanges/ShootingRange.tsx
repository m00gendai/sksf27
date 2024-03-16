"use client"

import { ShootingRange } from "../Map/Interface_Map"
import { Card } from 'primereact/card';
import s from "./ShootingRange.module.css"
import Image from "next/image"
import Testbild from "@/public/testbild.png"
import { TabMenu } from 'primereact/tabmenu';
import { useState } from "react";
import MapSingle from "../Map/MapSingle";

interface Props{
    range: ShootingRange
}

export default function ShootingRange({range}:Props){

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const items = [
        { label: 'Daten', icon: 'pi pi-home' },
        { label: 'Karte', icon: 'pi pi-chart-line' },
        { label: 'Bilder', icon: 'pi pi-list' }
    ];


    return(
        <Card title={range.name}>
            <div className={s.header}>
            {range.images ? <Image src={`${process.env.NEXT_PUBLIC_STORAGE}${range.images[0].path}`} alt={""} fill={true} style={{objectFit: "cover"}} /> : <Image src={Testbild} alt={"Testbild"} fill={true} style={{objectFit: "cover"}} />}
            </div>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            {activeIndex ===  0 ?
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
                        <td className={s.value}>{range.category.map(cat => <p>{cat}</p>)}</td>
                    </tr>
                    <tr className={s.tableRow}>
                        <td className={s.key}>Scheiben</td>
                        <td className={s.value}>{range.targets?.map(target=>{
                            return <p>{`${target.amount} ${target.type}`}</p>
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
            :
        
                    activeIndex === 1 ?
                <MapSingle range={range} />
            : null}
        </Card>
    )
    }