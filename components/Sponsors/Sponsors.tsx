import { sponsorCategories, stichDisciplines } from "@/data/sponsors"
import type { Sponsor } from "./Interface_Sponsors"
import SponsorCard from "./SponsorCard"
import s from "./Sponsors.module.css"

interface Props {
    sponsors: readonly Sponsor[]
}

function SponsorList({ sponsors }: Props) {
    return (
        <ul className={s.grid}>
            {sponsors.map(sponsor => (
                <li key={sponsor.id} className={s.gridItem}>
                    <SponsorCard sponsor={sponsor} />
                </li>
            ))}
        </ul>
    )
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
                            {category.id === 3 ? (
                                <div className={s.disciplineGroups}>
                                    {stichDisciplines.map(discipline => {
                                        const disciplineEntries = entries.filter(sponsor =>
                                            sponsor.category === 3 && sponsor.discipline === discipline.id
                                        )
                                        const disciplineHeadingId = `${headingId}-${discipline.id}`

                                        return (
                                            <div key={discipline.id} role="group" aria-labelledby={disciplineHeadingId}>
                                                <h3 id={disciplineHeadingId} className={s.stichTitle}>{discipline.title}</h3>
                                                {disciplineEntries.length > 0
                                                    ? <SponsorList sponsors={disciplineEntries} />
                                                    : <p className={s.empty}>Für diese Disziplin sind noch keine Stichsponsoren aufgeführt.</p>}
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : entries.length > 0
                                ? <SponsorList sponsors={entries} />
                                : <p className={s.empty}>{category.emptyText}</p>}
                        </section>
                    )
                })}
            </div>
        </div>
    )
}
