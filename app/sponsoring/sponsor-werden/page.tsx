import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading/PageHeading";
import headerImage from "@/public/P2050071_2560x1280.jpg";
import s from "../page.module.css";

export const metadata: Metadata = {
    title: "Sponsor werden | SKSF27",
    description: "Möchten Sie das Schaffhauser Kantonalschützenfest 2027 unterstützen? Ihr Sponsoring wird ein sicherer Treffer!",
};

export default function Page() {
    return (
        <main>
            <section className={s.page}>
                <PageHeading image={headerImage} title="Sponsor werden" />
                <div className={s.invitation}>
                    <p>Möchten Sie das Schaffhauser Kantonalschützenfest 2027 unterstützen?</p>
                    <p>Ihr Sponsoring wird ein sicherer Treffer!</p>
                    <a className={s.emailLink} href="mailto:pb@sksf27.ch">pb@sksf27.ch</a>
                </div>
            </section>
        </main>
    );
}
