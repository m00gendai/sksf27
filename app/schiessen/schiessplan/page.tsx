import PageContent from "@/components/PageContent/PageContent";
import PageHeading from "@/components/PageHeading/PageHeading";
import { SiteContent } from "@/globals/globals_interface";
import { siteMetaData } from "@/globals/utils";
import SchiessplanOrderForm from "@/components/SchiessplanOrderForm/SchiessplanOrderForm";
import s from "./page.module.css";

const siteName = "Schiessplan"

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

    const siteContent:SiteContent[] = await getSiteContent(siteName)

    return(
        <main>
            <section>
                <PageHeading image={siteContent[0].pageHeader.path} />
                <div className={s.layout}>
                    <div className={s.downloads} role="region" aria-labelledby="schiessplan-downloads">
                        <h2 id="schiessplan-downloads">Digital herunterladen</h2>
                        <div className={s.downloadSections}>
                            <PageContent siteContent={siteContent} documentCovers={{
                                "SKSF27 Kurzschiessplan": "/SKSF27_Kurzschiessplan_Cover.png",
                                "SKSF27 Schiessplan": "/SKSF27_Schiessplan_Cover.png"
                            }} />
                        </div>
                    </div>
                    <SchiessplanOrderForm />
                </div>
            </section>
        </main>
    )
}
