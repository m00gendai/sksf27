import Image from "next/image"
import type { LogoSponsor, Sponsor } from "./Interface_Sponsors"
import { getSponsorLink } from "./sponsorLinks"
import s from "./Sponsors.module.css"

interface Props {
    sponsor: Sponsor
}

const logoSizes: Record<LogoSponsor["category"], string> = {
    1: "(max-width: 719px) 85vw, (max-width: 1099px) 40vw, 480px",
}

export default function SponsorCard({ sponsor }: Props) {
    const link = getSponsorLink(sponsor.website)

    if (sponsor.category !== 1) {
        return (
            <div className={`${s.card} ${s.stichCard}`}>
                <p className={s.sponsorName}>
                    {link.sponsorType === "withUrl" ? (
                        <a
                            className={s.sponsorLink}
                            href={link.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${sponsor.name} – Website öffnen (neuer Tab)`}
                        >
                            {sponsor.name}
                        </a>
                    ) : sponsor.name}
                </p>
            </div>
        )
    }

    const logo = (
        <div className={s.logoArea}>
            <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={sponsor.logoWidth}
                height={sponsor.logoHeight}
                sizes={logoSizes[sponsor.category]}
                className={s.logo}
            />
        </div>
    )

    if (link.sponsorType === "withUrl") {
        return (
            <a
                className={`${s.card} ${s.cardLink}`}
                href={link.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${sponsor.name} – Website öffnen (neuer Tab)`}
            >
                {logo}
            </a>
        )
    }

    return <div className={s.card}>{logo}</div>
}
