import Image from "next/image";
import type { CSSProperties } from "react";
import { headerImagePositions } from "@/config/headerImagePositions";
import { HeroItem } from "./Interface_Hero";
import heroImage from "@/public/hero_transparent_v2.png";
import s from "./Hero.module.css";

type HeroStyle = CSSProperties & {
    "--header-position"?: string;
    "--header-position-mobile"?: string;
    "--hero-image-ratio"?: number;
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
        "--hero-image-ratio": heroImage.width / heroImage.height,
    };
    return (
        <header className={s.container} style={heroStyle}>
            <div className={s.inner}>
                <div className={s.image}>
                    <div className={s.imageSurface}>
                        <Image src={heroImage}
                            alt="" fill priority className={s.photograph}
                            sizes="(min-width: 1600px) 1280px, (min-width: 1280px) calc(50vw + 480px), 100vw" />
                    </div>
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
