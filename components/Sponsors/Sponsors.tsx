import { sponsorCategories } from "@/data/sponsors"
import type { Sponsor } from "./Interface_Sponsors"
import SponsorCard from "./SponsorCard"
import s from "./Sponsors.module.css"

interface Props {
    sponsors: readonly Sponsor[]
}

export default function Sponsors({ sponsors }: Props) {
    return (
        <div className={s.container}>
            <div className={s.categories}>
                {sponsorCategories.map(category => {
                    const entries = sponsors.filter(sponsor => sponsor.category === category.id)
                    const headingId = `sponsor-category-${category.id}`

                    return (
                        <section key={category.id} className={s.category} data-category={category.id} aria-labelledby={headingId}>
                            <h2 id={headingId} className={s.categoryTitle}>{category.title}</h2>
                            {entries.length > 0 ? (
                                <ul className={s.grid}>
                                    {entries.map(sponsor => (
                                        <li key={sponsor.id} className={s.gridItem}>
                                            <SponsorCard sponsor={sponsor} />
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className={s.empty}>{category.emptyText}</p>}
                        </section>
                    )
                })}
            </div>
        </div>
    )
}
