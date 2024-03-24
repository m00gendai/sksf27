import { GiCalendar, GiLaurelCrown, GiSpellBook, GiTargetPoster } from "react-icons/gi";
import { NavbarItem } from "./Interface_Navbar";
import { LuTarget } from "react-icons/lu";

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
                icon: <GiSpellBook style={{fontSize: "10rem"}}/>
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
                icon: <GiTargetPoster style={{fontSize: "10rem"}}/>
            },
            {
                name: "Resultate",
                url: "/schiessen/resultate",
                isQuickLink: true,
                icon: <GiLaurelCrown style={{fontSize: "10rem"}}/>
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
                icon: <GiCalendar style={{fontSize: "10rem"}}/>
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