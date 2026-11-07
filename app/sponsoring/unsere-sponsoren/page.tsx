import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading/PageHeading";
import Sponsors from "@/components/Sponsors/Sponsors";
import { sponsors } from "@/data/sponsors";
import headerImage from "@/public/pageHeaderImages/DSC03643_2560x1280.jpg";
import s from "../page.module.css";

export const metadata: Metadata = {
    title: "Unsere Sponsoren | SKSF27",
    description: "Ein herzliches Dankeschön an die Sponsoren und Partner des Schaffhauser Kantonalschützenfests 2027.",
};

export default function Page() {
    return (
        <main>
            <section className={s.page}>
                <PageHeading image={headerImage} title="Unsere Sponsoren" />
                <div className={s.intro}>
                    <p>Ein herzliches Dankeschön an unsere Sponsoren und Partner. Mit ihrer Unterstützung
                        tragen sie wesentlich zum Gelingen des Schaffhauser Kantonalschützenfests 2027 bei.</p>
                </div>
                <Sponsors sponsors={sponsors} />
            </section>
        </main>
    );
}
