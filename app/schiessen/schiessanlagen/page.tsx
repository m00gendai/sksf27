import PageHeading from "@/components/PageHeading/PageHeading";
import ShootingRanges from "@/components/ShootingRanges/ShootingRanges";
import { pageMetadata } from "@/globals/utils";

export async function generateMetadata(){
    return pageMetadata("Schiessanlagen")
  }

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