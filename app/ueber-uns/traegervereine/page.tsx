import type { Metadata } from "next"
import ClubGallery from "@/components/ClubGallery/ClubGallery"
import PageHeading from "@/components/PageHeading/PageHeading"
import { traegervereine } from "@/data/traegervereine"
import headerImage from "@/public/pageHeaderImages/Reiat_2560x1280.jpg"
import s from "./page.module.css"

export const metadata: Metadata = {
    title: "Trägervereine | SKSF27",
    description: "Die elf Trägervereine des Schaffhauser Kantonalschützenfests 2027.",
}

export default function Page() {
    return (
        <main>
            <section className={s.page}>
                <PageHeading image={headerImage} title="Trägervereine" />
                <p className={s.intro}>
                    Das Schaffhauser Kantonalschützenfest 2027 wird von zwölf Schützenvereinen getragen.
                    Gemeinsam setzen sie sich mit grossem Engagement für die Organisation und Durchführung unseres Schützenfests ein.
                </p>
                <ClubGallery clubs={traegervereine} />
            </section>
        </main>
    )
}
