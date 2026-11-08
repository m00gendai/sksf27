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
        logo: "/logo_vereine/Altdorf_Opfertshofen.jpg",
    },
    {
        id: "bibern-hofen",
        name: "Bibern-Hofen Schützengesellschaft",
        website: "https://sgbibern.ch/",
        logo: "/logo_vereine/Bibern_Hofen.jpg",
    },
    {
        id: "thayngen",
        name: "Thayngen Feldschützengesellschaft",
        website: "https://www.fsg-thayngen.ch/",
        logo: "/logo_vereine/Thayngen.jpg",
    },
    {
        id: "doerflingen",
        name: "Dörflingen Schützengesellschaft",
        website: "https://www.sgdoerflingen.ch/",
        logo: "/logo_vereine/Doerflingen.jpg",
    },
    {
        id: "lohn",
        name: "Lohn Schützengesellschaft",
        website: "https://www.sglohn.ch/",
        logo: "/logo_vereine/Lohn.jpg",
    },
    {
        id: "bargen",
        name: "Bargen Schützenverein",
        website: "https://www.svbargen.ch/svb/",
        logo: "/logo_vereine/Bargen.jpg",
    },
    {
        id: "buch",
        name: "Buch Schiessverein",
        logo: "/logo_vereine/Buch.jpg",
    },
    {
        id: "merishausen",
        name: "Merishausen Schützenverein",
        website: "https://svmerishausen.clubdesk.ch/",
        logo: "/logo_vereine/Merishausen.jpg",
    },
    {
        id: "ramsen",
        name: "Ramsen Schützenverein",
        website: "https://www.sv-ramsen.ch/",
        logo: "/logo_vereine/Ramsen.jpg",
    },
    {
        id: "pistolenschuetzen-randen",
        name: "Pistolenschützen Randen Schaffhausen",
        website: "https://www.psranden.ch/",
        logo: "/logo_vereine/Randen.jpg",
    },
    {
        id: "sportschuetzen-munot",
        name: "Sportschützen Munot Schaffhausen",
    },
]
