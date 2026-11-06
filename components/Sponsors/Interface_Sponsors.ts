export type SponsorCategory = 1 | 2 | 3

interface SponsorBase {
    id: string
    name: string
}

export interface LogoSponsor extends SponsorBase {
    category: 1
    logo: string
    logoWidth: number
    logoHeight: number
    website?: string
}

export type TextSponsor = SponsorBase & (
    | { category: 2; stichName?: string }
    | { category: 3; stichName: string }
) & (
    | { sponsorType: "person"; website?: never }
    | { sponsorType: "company"; website: string }
)

export type Sponsor = LogoSponsor | TextSponsor

export interface SponsorCategoryInfo {
    id: SponsorCategory
    title: string
    emptyText: string
}
