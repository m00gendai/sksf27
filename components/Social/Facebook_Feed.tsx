import s from "./Facebook_Feed.module.css"
import Image from "next/image"
import { FacebookFeed } from "./Interface_Facebook_Feed";
import Placeholder from "@/public/placeholder.png"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Test from "./Test";

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
        <div className={s.container}>
            {/*{content.feed.data.map(entry =>{
                return(
                    <div className={s.entry}>
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
                                {entry.message} 
                            </div>
                            <div className={s.reactions}>
                                <p>{`Kommentare: ${entry.comments ? entry.comments.data.length : "0"}`}</p>
                                <p>{`Geteilt: ${entry.shares ? entry.shares.count : "0"}`}</p>
                            </div>
                        </div>
                    </div>
                )
            })} */}
            <Test content={content}/>
        </div>
        
    )
}