import s from "./Facebook_Feed.module.css"
import Image from "next/image"
import { FacebookFeed } from "./Interface_Facebook_Feed";
import Placeholder from "@/public/placeholder.png"
import Facebook_Feed_Carousel from "./Facebook_Feed_Carousel";
import { Suspense } from "react";

async function getContent(){
    const getContent:Response = await fetch(
        `https://graph.facebook.com/v19.0/me?fields=id%2Cname%2Cfeed.limit(6)%7Bfull_picture%2Cmessage%2Cpermalink_url%2Cshares%2Ccomments%7Bid%7D%2Ccreated_time%7D&access_token=${process.env.META}`,
        {
            method: "GET",
            next: {
                revalidate: 10,
            }
        }
    )

    const content:FacebookFeed = await getContent.json()
    return content
}

export default async function Facebook_Feed(){

    const content:FacebookFeed = await getContent()

    const dateOptions:Intl.DateTimeFormatOptions = {
        year: "numeric", 
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit"
    }

    return(
        <div className={s.wrapper}>
            <Suspense fallback={<div className={s.container}></div>}>
                <Facebook_Feed_Carousel content={content}/>
            </Suspense>
        </div>
        
    )
}