import Gallery from "@/components/Gallery/Gallery";
import PageHeading from "@/components/PageHeading/PageHeading";
import { SiteContent } from "@/globals/globals_interface";
import { siteMetaData } from "@/globals/utils";

const siteName = "Festzentrum"

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
console.log(siteContent[0].content[0].sectionAssets)
    return(
        <main>
            <section>
                <PageHeading image={siteContent[0].pageHeader.path} />
                {
                    siteContent[0].content.map((section, index) =>{
                        return(
                            <div key={`${index}_${section.sectionTitle}`} className="content">
                                {section.sectionTitle !== null ? <h3>{section.sectionTitle}</h3> : ""}
                                <div className="content_text" dangerouslySetInnerHTML={{__html: section.sectionText}}></div>
                                {section.sectionAssets !== null ? <Gallery images={section.sectionAssets} /> : ""}
                            </div>
                        )
                    })
                }
            </section>
        </main>
    )
}