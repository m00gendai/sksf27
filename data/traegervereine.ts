export interface SupportingClub {
    id: string
    name: string
    // Public assets use a leading slash, e.g. /logo_vereine/club.png.
    logo?: string
    website?: string
}

// Array order is the display order. Only verified official websites are included.
// Verification sources and unresolved websites: docs/traegervereine.md.
export const traegervereine: SupportingClub[] = [
    {
        id: "altdorf-opfertshofen",
        name: "Altdorf-Opfertshofen Schützengesellschaft",
        website: "https://www.sgaltdorfopfertshofen.ch/",
        logo: "/logo_vereine/Wappen_Altdorf_Opfertshofen_freigestellt.png",
    },
    {
        id: "bibern-hofen",
        name: "Bibern-Hofen Schützengesellschaft",
        website: "https://sgbibern.ch/",
        logo: "/logo_vereine/Wappen_Bibern_Hofen_freigestellt.png",
    },
    {
        id: "thayngen",
        name: "Thayngen Feldschützengesellschaft",
        website: "https://www.fsg-thayngen.ch/",
        logo: "/logo_vereine/Wappen_Thayngen_freigestellt.png",
    },
    {
        id: "doerflingen",
        name: "Dörflingen Schützengesellschaft",
        website: "https://www.sgdoerflingen.ch/",
        logo: "/logo_vereine/Wappen_Doerflingen_freigestellt.png",
    },
    {
        id: "lohn",
        name: "Lohn Schützengesellschaft",
        website: "https://www.sglohn.ch/",
        logo: "/logo_vereine/Wappen_Lohn_freigestellt.png",
    },
    {
        id: "bargen",
        name: "Bargen Schützenverein",
        website: "https://www.svbargen.ch/svb/",
        logo: "/logo_vereine/Wappen_Bargen_freigestellt.png",
    },
    {
        id: "buch",
        name: "Buch Schiessverein",
        logo: "/logo_vereine/Wappen_Buch_freigestellt.png",
    },
    {
        id: "merishausen",
        name: "Merishausen Schützenverein",
        website: "https://svmerishausen.clubdesk.ch/",
        logo: "/logo_vereine/Wappen_Merishausen_freigestellt.png",
    },
    {
        id: "ramsen",
        name: "Ramsen Schützenverein",
        website: "https://www.sv-ramsen.ch/",
        logo: "/logo_vereine/Wappen_Ramsen_freigestellt.png",
    },
    {
        id: "pistolenschuetzen-randen",
        name: "Pistolenschützen Randen Schaffhausen",
        website: "https://www.psranden.ch/",
        logo: "/logo_vereine/Wappen_Stadt_SH_freigestellt.png",
    },
    {
        id: "sportschuetzen-munot",
        name: "Sportschützen Munot Schaffhausen",
        logo: "/logo_vereine/Wappen_Stadt_SH_freigestellt.png",
    },
]
