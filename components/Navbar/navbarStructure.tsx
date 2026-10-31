import { GiCalendar, GiLaurelCrown, GiSpellBook, GiTargetPoster, GiArchiveRegister } from "react-icons/gi";
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
                name: "Anmeldung",
                url: "/schiessen/anmeldung",
                isQuickLink: true,
                icon: <GiArchiveRegister style={{fontSize: "10rem"}}/>
            },
            {
                name: "Schiessanlagen",
                url: "/schiessen/schiessanlagen",
                isQuickLink: true,
                icon: <GiTargetPoster style={{fontSize: "10rem"}}/>
            },
            { 
                name: "Festzentrum",
                url: "/schiessen/festzentrum"
            },
            {
                name: "Programm",
                url: "/schiessen/programm",
            },
            {
                name: "Schiessplan",
                url: "/schiessen/schiessplan",
                isQuickLink: true,
                icon: <GiSpellBook style={{fontSize: "10rem"}}/>
            },
            { 
                name: "Rangeurübersicht",
                url: "/schiessen/rangeure"
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
        name: "Sponsoren",
        url: "/sponsoren"
    },
    {
        name: "Aufenthalt",
        url: "",
        sub: [
            {
                name: "Übernachten",
                url: "https://schaffhauserland.ch/erleben/uebernachten/hotels.html",
                openInNewTab: true
            },
            {
                name: "Erleben",
                url: "https://www.natourpark.ch/",
                openInNewTab: true
            },
        ]
    },
    {
        name: "Über uns",
        url: "",
        sub: [
            { 
                name: "Organisation", 
                url: "/ueber-uns/organisation"
            },
            { 
                name: "Kontakt", 
                url: "/ueber-uns/kontakt"
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
]
