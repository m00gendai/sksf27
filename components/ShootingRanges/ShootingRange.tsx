"use client"

import { ShootingRange as RangeType } from "../Map/Interface_Map"
import s from "./ShootingRange.module.css"
import Image from "next/image"
import Testbild from "@/public/testbild.png"
import MapSingle from "../Map/MapSingle";
import { Card, Inset, Tabs } from "@radix-ui/themes"
import IconBar from "../IconBar/IconBar"
import Compass from "../IconBar/Compass/Compass"
import { ImCompass } from "react-icons/im"
import { getCompassDegrees } from "@/globals/utils"
import { GiArcheryTarget, GiBullets, GiDirectionSign, GiDirectionSigns, GiMeditation } from "react-icons/gi"
import * as Collapsible from '@radix-ui/react-collapsible';
import { LuChevronDown, LuChevronDownCircle, LuChevronUp, LuChevronUpCircle } from "react-icons/lu"
import { useEffect, useState } from "react"
import GalleryRange from "../GalleryRange/GalleryRange"

interface Props{
    range: RangeType
}

export default function ShootingRange({range}:Props){

    const [isOpen, setOpen] = useState<boolean>(false)

   function handleOpen(){
        setOpen(!isOpen)
            document.getElementById(`${range.name}`)?.scrollIntoView({behavior: "smooth", block: "start"})
        

   }

    return(
        <Card className={[`${s.card}, boxShadow`].join(" ")} id={range.name}>
            <Inset side="top" clip="padding-box" className={s.cardTop}>
            <div className={s.title}>{range.name}</div>
            </Inset>
            <IconBar degrees={range.direction} category={range.category} positions={range.positions}/>
            
            <div className={s.header}>
            {range.images && range.images.length !== 0 ? <Image src={`${process.env.NEXT_PUBLIC_STORAGE}${range.images[0].path}`} alt={""} fill={true} style={{objectFit: "cover"}} className="boxShadow"/> : <Image src={Testbild} alt={"Testbild"} fill={true} style={{objectFit: "cover"}} className="boxShadow"/>}
            </div>
            <Collapsible.Root onOpenChange={handleOpen} className="mobile">
               <Collapsible.Content >
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
                                            <td className={s.key}><GiDirectionSigns style={{margin: "0 0.25rem 0 0"}} />Ort</td>
                                            <td>{range.location}</td>
                                        </tr>
                                        <tr className={s.tableRow}>
                                            <td className={s.key}>
                                            <GiBullets style={{margin: "0 0.25rem 0 0"}} />Kategorie
                                            </td>
                                            <td className={s.value}>{range.category.map(cat => <p key={cat}>{cat}</p>)}</td>
                                        </tr>
                                        <tr className={s.tableRow}>
                                            <td className={s.key}><GiArcheryTarget style={{margin: "0 0.25rem 0 0"}} />Scheiben</td>
                                            <td className={s.value}>{range.targets?.map(target=>{
                                                return <p key={target.type}>{`${target.amount} ${target.type}`}</p>
                                            })}</td>
                                        </tr>
                                        <tr className={s.tableRow}>
                                            <td className={s.key}><ImCompass style={{transform: `rotate(${getCompassDegrees(range.direction)-45}deg)`, color: "red", margin: "0 0.25rem 0 0"}}/>Schussrichtung</td>
                                            <td className={s.value}>{range.direction}</td>
                                        </tr>
                                        {range.positions ?
                                        <tr className={s.tableRow}>
                                            <td className={s.key}><GiMeditation style={{margin: "0 0.25rem 0 0"}} />Stellungen</td>
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
                </Collapsible.Content>
                <Collapsible.Trigger className={`${s.trigger} boxShadow`}>{isOpen ? <LuChevronUp style={{width: "100%", height: "100%", borderRadius: "100%"}}/> : <LuChevronDown style={{width: "100%", height: "100%", borderRadius: "100%"}}/>}</Collapsible.Trigger>
            </Collapsible.Root>
            <Tabs.Root defaultValue="data" className="desktop">
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
                                            <td className={s.key}><GiDirectionSigns style={{margin: "0 0.25rem 0 0"}} />Ort</td>
                                            <td>{range.location}</td>
                                        </tr>
                                        <tr className={s.tableRow}>
                                            <td className={s.key}>
                                            <GiBullets style={{margin: "0 0.25rem 0 0"}} />Kategorie
                                            </td>
                                            <td className={s.value}>{range.category.map(cat => <p key={cat}>{cat}</p>)}</td>
                                        </tr>
                                        <tr className={s.tableRow}>
                                            <td className={s.key}><GiArcheryTarget style={{margin: "0 0.25rem 0 0"}} />Scheiben</td>
                                            <td className={s.value}>{range.targets?.map(target=>{
                                                return <p key={target.type}>{`${target.amount} ${target.type}`}</p>
                                            })}</td>
                                        </tr>
                                        <tr className={s.tableRow}>
                                            <td className={s.key}><ImCompass style={{transform: `rotate(${getCompassDegrees(range.direction)-45}deg)`, color: "red", margin: "0 0.25rem 0 0"}}/>Schussrichtung</td>
                                            <td className={s.value}>{range.direction}</td>
                                        </tr>
                                        {range.positions ?
                                        <tr className={s.tableRow}>
                                            <td className={s.key}><GiMeditation style={{margin: "0 0.25rem 0 0"}} />Stellungen</td>
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
                            <GalleryRange images={range.images} />
                        </Tabs.Content>
                    </Tabs.Root>
        </Card>
    )
}