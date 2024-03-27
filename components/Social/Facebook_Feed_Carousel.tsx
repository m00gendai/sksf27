"use client"

import { FacebookFeed } from "./Interface_Facebook_Feed";
import s from "./Facebook_Feed.module.css"
import Image from "next/image"
import { ScrollArea } from "@radix-ui/themes";
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from "react";
import { EmblaOptionsType } from 'embla-carousel'

interface Props{
    content: FacebookFeed
    options?: EmblaOptionsType
}

export default function Test({content, options}:Props){

    const dateOptions:Intl.DateTimeFormatOptions = {
        year: "numeric", 
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit"
    }

    options = {
        loop: true,
        align: "start"
    }

    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const scrollPrev = useCallback(() => {    if (emblaApi) emblaApi.scrollPrev()  }, [emblaApi])
    const scrollNext = useCallback(() => {    if (emblaApi) emblaApi.scrollNext()  }, [emblaApi])

    return(
        <div className={s.carousel} ref={emblaRef}>      
            <div className={s.container}>
            {content.feed.data.map(entry =>{
                return(
                    <div className={`${s.item}`} key={entry.id}>
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
                                    <ScrollArea type="always" scrollbars="vertical" style={{height: "10=%"}}>
                                        {entry.message} 
                                    </ScrollArea>
                                </div>
                                <div className={s.reactions}>
                                    <p>{`Kommentare: ${entry.comments ? entry.comments.data.length : "0"}`}</p>
                                    <p>{`Geteilt: ${entry.shares ? entry.shares.count : "0"}`}</p>
                                </div>
                            </div>
                    </div>
                )
            })}
            </div>
            {/*<button className={s.prev} onClick={scrollPrev}>        Prev      </button>      
            <button className={s.next} onClick={scrollNext}>        Next      </button>*/}
        </div>
    )
}