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
                url: "/schiessen/sschiessplan",
                isQuickLink: true,
                icon: "book-svgrepo-com.png"
            },
            {
                name: "Anmeldung",
                url: "/schiessen/anmeldung"
            },
            {
                name: "Rangeurübersicht",
                url: "/fest/rangeuruebersicht"
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
                url: "/schiessen/anmeldung"
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
                url: "/informationen/terminplan",
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
                name: "Pressemitteilungen",
                url: "/medien/pressemitteilungen"
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