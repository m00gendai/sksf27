export type SponsorCategory = 1 | 2 | 3 | 4 | 5

export type StichDiscipline = "300m" | "50m"

interface SponsorBase {
    id: string
    name: string
    website?: string
}

export interface LogoSponsor extends SponsorBase {
    category: 1
    logo: string
    logoWidth: number
    logoHeight: number
}

export type TextSponsor = SponsorBase & {
    // Retained as source information; individual Stich names are not rendered.
    stichName?: string
} & (
    | { category: 2 | 4 | 5 }
    | { category: 3; discipline: StichDiscipline }
)

// Derived from website validation, never maintained manually in sponsor records.
export type SponsorLink =
    | { sponsorType: "withUrl"; website: string }
    | { sponsorType: "withoutUrl"; website?: never }

export type Sponsor = LogoSponsor | TextSponsor

export interface SponsorCategoryInfo {
    id: SponsorCategory
    title: string
    emptyText: string
}
