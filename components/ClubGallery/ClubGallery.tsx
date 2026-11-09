import Image from "next/image"
import { LuImage } from "react-icons/lu"
import type { SupportingClub } from "@/data/traegervereine"
import s from "./ClubGallery.module.css"

interface Props {
    clubs: SupportingClub[]
}

export default function ClubGallery({ clubs }: Props) {
    return (
        <ul className={s.gallery} aria-label="Trägervereine">
            {clubs.map(club => (
                <li className={s.card} key={club.id}>
                    <div className={`${s.logoArea} ${club.logo ? s.withLogo : s.withPlaceholder}`}>
                        {club.logo ? (
                            <Image
                                src={club.logo}
                                alt={`Logo ${club.name}`}
                                fill
                                sizes="(max-width: 599px) 320px, (max-width: 1023px) 40vw, 320px"
                                className={s.logo}
                            />
                        ) : (
                            <LuImage className={s.placeholder} aria-hidden="true" focusable="false" />
                        )}
                    </div>
                    <p className={s.name}>
                        {club.website ? (
                            <a
                                className={s.link}
                                href={club.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${club.name} – Website öffnen (neuer Tab)`}
                            >
                                {club.name}
                            </a>
                        ) : club.name}
                    </p>
                </li>
            ))}
        </ul>
    )
}
