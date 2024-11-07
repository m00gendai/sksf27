import { OK } from "@/components/Organisation/Interface_Organisation";
import OrgChart from "@/components/Organisation/OrgChart";
import Organisation from "@/components/Organisation/Organisation";
import PageHeading from "@/components/PageHeading/PageHeading";

async function getOrg(){
    const getOrg:Response = await fetch(
        'https://cms.sksf27.ch/api/content/items/orgChart?populate=100',
        {
            headers: {
                'api-key': `${process.env.CMS}`,
            },
            next: {
                revalidate: 10,
            }
        }
    )

    const org:OK[] = await getOrg.json()
    return org
}

export default async function Page(){

    const org:OK[] = await getOrg()

    return(
        <main>
            <section>
                <PageHeading image={"organisation"} />
                    {typeof window !== "undefined" && document ? <OrgChart org={org}/> : null}
                <Organisation people={org} />
            </section>
        </main>
    )
}