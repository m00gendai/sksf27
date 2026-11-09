import Image from "next/image";
import { HeroItem } from "./Interface_Hero";
import s from "./Hero.module.css";

async function getHero(): Promise<HeroItem[]> {
    const response = await fetch(
        "https://cms.sksf27.ch/api/content/items/hero?populate=100",
        {
            headers: { "api-key": `${process.env.CMS}` },
            next: { revalidate: 10 },
        }
    );
    if (!response.ok) throw new Error("Could not load the homepage Hero.");
    return response.json();
}

export default async function Hero() {
    const [hero] = await getHero();
    return (
        <header className={s.container}>
            <div className={s.inner}>
                <div className={s.image}>
                    <Image src={`${process.env.NEXT_PUBLIC_STORAGE}${hero.image.path}`}
                        alt="" fill priority className={s.photograph}
                        sizes="(min-width: 1440px) 960px, (min-width: 900px) 67vw, (min-width: 600px) and (max-height: 500px) 42vw, 100vw" />
                </div>
                <div className={s.text}>
                    {/* Let the CMS title wrap naturally instead of keeping desktop line breaks. */}
                    <div className={s.mainText}
                        dangerouslySetInnerHTML={{ __html: hero.mainText.replace(/<br\s*\/?\s*>/gi, " ") }} />
                    <div className={s.sideText} dangerouslySetInnerHTML={{ __html: hero.sideText }} />
                </div>
            </div>
        </header>
    );
}
