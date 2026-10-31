import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading/PageHeading";

export const metadata: Metadata = {
    title: "Sponsoren",
};

export default function Page() {
    return (
        <main>
            <section>
                <PageHeading />
                <div className="content">
                    <p>Informationen zu unseren Sponsoren folgen.</p>
                </div>
            </section>
        </main>
    );
}
