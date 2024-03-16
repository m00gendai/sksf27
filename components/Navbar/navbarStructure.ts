import { NavbarItem } from "./Interface_Navbar";

export const navbar:NavbarItem[] = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Schiessen",
        url: "",
        sub: [
            {
                name: "Schiessplan",
                url: "/schiessen/schiessplan",
                isQuickLink: true,
                icon: "book-svgrepo-com.png"
            },
            {
                name: "Anmeldung",
                url: "/schiessen/anmeldung"
            },
            {
                name: "Rangeurübersicht",
                url: "/schiessen/rangeure"
            },
            {
                name: "Schiessanlagen",
                url: "/schiessen/schiessanlagen",
                isQuickLink: true,
            },
            {
                name: "Resultate",
                url: "/schiessen/resultate",
                isQuickLink: true,
            },
            {
                name: "Auszeichnungen & Gaben",
                url: "/schiessen/auszeichnungen"
            },
        ]
    },
    {
        name: "Informationen",
        url: "",
        sub: [
            {
                name: "Festzentrum",
                url: "/informationen/festzentrum"
            },
            {
                name: "Terminplan",
                url: "/informationen/termine",
                isQuickLink: true,
            },
            {
                name: "Organisation",
                url: "/informationen/organisation"
            },
        ]
    },
    {
        name: "Medien",
        url: "",
        sub: [
            {
                name: "Presse",
                url: "/medien/presse"
            },
            {
                name: "Bilder",
                url: "/medien/bilder"
            },
        ]
    },
    {
        name: "Kontakt",
        url: "/kontakt"
    },
]