import { HeroItem } from "./Interface_Hero"
import s from "./Hero.module.css"
import Image from "next/image"

async function getHero(){
    const getHero:Response = await fetch(
        'https://cms.sksf27.ch/api/content/items/hero?populate=100',
        {
            headers: {
                'api-key': `${process.env.CMS}`,
            },
            next: {
                revalidate: 10,
            }
        }
    )

    const hero:HeroItem[] = await getHero.json()
    return hero
}

export default async function Hero(){
    
    const hero:HeroItem[] = await getHero()

    return (
        <div className={s.container}>
            <div className={s.image}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE}${hero[0].image.path}`}
                    alt={"Goat Who Stares At Men"}
                    fill={true}
                    style={{objectFit: "contain"}}
                />
            </div>
            <div className={s.text}>
                <div className={s.mainText} dangerouslySetInnerHTML={{__html: hero[0].mainText}}></div>
                <div className={s.sideText} dangerouslySetInnerHTML={{__html: hero[0].sideText}}></div>
            </div>
        </div>
    )
}