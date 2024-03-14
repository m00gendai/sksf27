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
            },
            {
                name: "Resultate",
                url: "/schiessen/resultate",
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