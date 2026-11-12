import type { Metadata } from "next";
import { LuExternalLink } from "react-icons/lu";
import PageHeading from "@/components/PageHeading/PageHeading";
import headerImage from "@/public/pageHeaderImages/IMG_9898_2560x1280.jpg";
import actionStyles from "@/globals/actionLink.module.css";
import s from "./page.module.css";

export const metadata: Metadata = {
    title: "Aufenthalt | SKSF27",
    description: "Planen Sie Ihren Aufenthalt am Schaffhauser Kantonalschützenfest 2027: Hotels in der Region und Tipps für Ausflüge und Erlebnisse.",
};

const categories = [
    {
        id: "uebernachten",
        title: "Übernachten",
        description: "Finden Sie eine passende Unterkunft für Ihren Besuch am SKSF27.",
        links: [
            {
                title: "Hotels im Schaffhauserland",
                href: "https://schaffhauserland.ch/erleben/uebernachten/hotels.html",
                description: "Hotels in Schaffhausen und Umgebung.",
            },
        ],
    },
    {
        id: "erleben",
        title: "Erleben",
        description: "Verbinden Sie Ihren Festbesuch mit einem Ausflug und entdecken Sie die Region rund um Schaffhausen.",
        links: [
            {
                title: "Natourpark",
                href: "https://www.natourpark.ch/",
                description: "Wander- und Velotouren im Regionalen Naturpark Schaffhausen.",
            },
            {
                title: "Schaffhauserland entdecken",
                href: "https://schaffhauserland.ch/erleben.html",
                description: "Ausflugsziele, Kultur und weitere Erlebnisse in der Region.",
            },
        ],
    },
];

export default function Page() {
    return (
        <main>
            <section className={s.page}>
                <PageHeading image={headerImage} title="Aufenthalt" />
                <p className={s.intro}>
                    Geniessen Sie Ihren Aufenthalt am Schaffhauser Kantonalschützenfest 2027.
                    Hier finden Sie Unterkünfte und Ideen für erlebnisreiche Stunden in der Region.
                </p>
                <div className={s.categories}>
                    {categories.map(category => (
                        <article className={s.category} key={category.id} aria-labelledby={`${category.id}-heading`}>
                            <h2 id={`${category.id}-heading`}>{category.title}</h2>
                            <p className={s.description}>{category.description}</p>
                            <ul className={s.links}>
                                {category.links.map(link => (
                                    <li key={link.href}>
                                        <a className={`${actionStyles.actionLink} ${s.link}`}
                                            href={link.href} target="_blank" rel="noopener noreferrer"
                                            aria-label={`${link.title} (öffnet in einem neuen Tab)`}>
                                            <span>{link.title}</span>
                                            <LuExternalLink aria-hidden="true" />
                                        </a>
                                        <p className={s.linkDescription}>{link.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
