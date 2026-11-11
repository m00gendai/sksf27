import Image from "next/image";
import type { CSSProperties } from "react";
import { headerImagePositions } from "@/config/headerImagePositions";
import { HeroItem } from "./Interface_Hero";
import s from "./Hero.module.css";

type HeroStyle = CSSProperties & {
    "--header-position"?: string;
    "--header-position-mobile"?: string;
};

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
    const position = headerImagePositions["/"];
    const heroStyle: HeroStyle = {
        "--header-position": position?.desktop,
        "--header-position-mobile": position?.mobile,
    };
    return (
        <header className={s.container} style={heroStyle}>
            <div className={s.inner}>
                <div className={s.image}>
                    <Image src={`${process.env.NEXT_PUBLIC_STORAGE}${hero.image.path}`}
                        alt="" fill priority className={s.photograph}
                        sizes="100vw" />
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
