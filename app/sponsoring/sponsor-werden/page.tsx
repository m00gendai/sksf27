import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading/PageHeading";
import DocumentGallery from "@/components/DocumentGallery/DocumentGallery";
import headerImage from "@/public/pageHeaderImages/IMG_9898_2560x1280.jpg";
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
                    <p>Werden Sie Teil des Schaffhauser Kantonalschützenfests 2027! Mit Ihrem Sponsoring treffen Sie mitten ins Schwarze.</p>
                    <DocumentGallery
                        baseUrl=""
                        documents={[{
                            title: "Sponsoring- und Gabenkonzept",
                            path: "/sponsors/20241121_SKSF27_Sponsoring-Gabenkonzept.pdf",
                            mime: "application/pdf",
                            size: 202818,
                        }]}
                    />
                    <p>Wir freuen uns auf Ihre Kontaktaufnahme unter folgender E-Mail-Adresse: <a className={s.emailLink} href="mailto:pb@sksf27.ch">pb@sksf27.ch</a></p>
                </div>
            </section>
        </main>
    );
}
