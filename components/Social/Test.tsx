"use client"

import "react-multi-carousel/lib/styles.css";
import { FacebookFeed } from "./Interface_Facebook_Feed";
import s from "./Facebook_Feed.module.css"
import Image from "next/image"
import { ScrollArea } from "@radix-ui/themes";
import Carousel from 'better-react-carousel'
import { Suspense } from "react";

interface Props{
    content: FacebookFeed
}

export default function Test({content}:Props){

const dateOptions:Intl.DateTimeFormatOptions = {
    year: "numeric", 
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
}

return(
    <Suspense fallback={<div className={s.container}></div>}>
<Carousel cols={3} rows={1} gap={10} loop containerClassName={s.container}>
    {content.feed.data.map(entry =>{
                return(
                    <Carousel.Item key={entry.id}>
                        <div className={`${s.entry} boxShadow`}>
                            <div className={s.image}>
                                <Image
                                    src={entry.full_picture}
                                    alt={"Bild zum Eintrag"}
                                    fill={true}
                                    style={{objectFit:"cover"}}
                                />
                            </div>
                            <div className={s.info}>
                                <div className={s.time}>
                                    {new Date(entry.created_time).toLocaleTimeString("de-CH", dateOptions)}
                                </div>
                                <div className={s.message}>
                                <ScrollArea type="always" scrollbars="vertical" style={{height: "75%"}}>
                                    {entry.message} 
                                </ScrollArea>
                                </div>
                                <div className={s.reactions}>
                                    <p>{`Kommentare: ${entry.comments ? entry.comments.data.length : "0"}`}</p>
                                    <p>{`Geteilt: ${entry.shares ? entry.shares.count : "0"}`}</p>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                )
            })}
</Carousel>
</Suspense>
)
}