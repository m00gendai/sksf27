import { OK } from "@/components/Organisation/Interface_Organisation";
import OrgChart from "@/components/Organisation/OrgChart";
import Organisation from "@/components/Organisation/Organisation";
import PageContent from "@/components/PageContent/PageContent";
import PageHeading from "@/components/PageHeading/PageHeading";
import { SiteContent } from "@/globals/globals_interface";
import { siteMetaData } from "@/globals/utils";

const siteName = "Organisation"

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

async function getSiteContent(siteName:string){
    const getSiteContent:Response = await fetch(
        `https://cms.sksf27.ch/api/content/items/pages?filter=%7BpageName%3A+%22${siteName}%22%7D`,
        {
            headers: {
                'api-key': `${process.env.CMS}`,
            },
            next: {
                revalidate: 10,
            }
        }
    )

    const siteContent:SiteContent[] = await getSiteContent.json()
    return siteContent
}

export async function generateMetadata(){
    const data = await getSiteContent(siteName)
    return siteMetaData(data[0].metadata)
}

export default async function Page(){

    const org:OK[] = await getOrg()
    const siteContent:SiteContent[] = await getSiteContent(siteName)

    return(
        <main>
            <section>
                <PageHeading image={siteContent[0].pageHeader.path} />
                 <PageContent siteContent={siteContent} />
                {/* <OrgChart org={org}/> */}
                <Organisation people={org} />
            </section>
        </main>
    )
}