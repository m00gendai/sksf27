import PageHeading from "@/components/PageHeading/PageHeading";
import ShootingRanges from "@/components/ShootingRanges/ShootingRanges";

export default async function Page(){
    return(
        <main>
            <section>
                <PageHeading />
                <ShootingRanges />
            </section>
        </main>
    )
}