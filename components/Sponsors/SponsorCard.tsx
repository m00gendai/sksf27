import Image from "next/image"
import type { LogoSponsor, Sponsor } from "./Interface_Sponsors"
import s from "./Sponsors.module.css"

interface Props {
    sponsor: Sponsor
}

const logoSizes: Record<LogoSponsor["category"], string> = {
    1: "(max-width: 600px) 80vw, (max-width: 1200px) 40vw, 480px",
}

export default function SponsorCard({ sponsor }: Props) {
    if (sponsor.category !== 1) {
        return (
            <div className={`${s.card} ${s.stichCard}`}>
                {sponsor.stichName ? <h3 className={s.stichTitle}>{sponsor.stichName}</h3> : null}
                <p className={s.sponsorName}>
                    {sponsor.sponsorType === "company" ? (
                        <a
                            className={s.sponsorLink}
                            href={sponsor.website}
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

    if (sponsor.website) {
        return (
            <a
                className={`${s.card} ${s.cardLink}`}
                href={sponsor.website}
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
