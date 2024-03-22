import ContactForm from "@/components/ContactForm/ContactForm";
import PageHeading from "@/components/PageHeading/PageHeading";
import Link from "next/link";

export default async function Page(){
    return(
        <main>
            <section>
                <PageHeading />
                <p>Sie können für spezifische Anliegen die Email-Adressen der <Link href="/informationen/organisation">Ressortverantwortlichen</Link> nutzen, ansonsten
                steht Ihnen unser Kontaktformular zur Verfügung.</p>
                <ContactForm />
                <h2>Postanschrift während des Festes</h2>
                <p style={{whiteSpace: "pre", textAlign: "left"}} dangerouslySetInnerHTML={{__html: `Kantonalschützenfest Schaffhausen<br>8200 Schaffhausen`}}/ >
            </section>
        </main>
    )
}