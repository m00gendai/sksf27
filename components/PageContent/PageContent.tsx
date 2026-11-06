import { SiteContent } from "@/globals/globals_interface"
import Gallery from "../Gallery/Gallery"
import DocumentGallery from "../DocumentGallery/DocumentGallery"

interface Props{
    siteContent:SiteContent[]
    documentCovers?: Record<string, string>
}

export default function PageHeading({siteContent, documentCovers}:Props){
    console.log(siteContent[0])
    return(
        <>
        {
            siteContent[0].content.map((section, index) =>{
                const sectionDocuments = section.sectionAssets?.filter(asset => asset.type === "document")
                const sectionImages = section.sectionAssets?.filter(asset => asset.mime.startsWith("image"))
                return(
                    <div key={`${index}_${section.sectionTitle ? section.sectionTitle : "genericTitle"}`} className="content">
                        {section.sectionTitle ? <h3>{section.sectionTitle}</h3> : null}
                        <div className="content_text" dangerouslySetInnerHTML={{__html: section.sectionText}}></div>
                        {sectionImages?.length > 0 ? <Gallery images={sectionImages} /> : null}  
                        {sectionDocuments?.length > 0 ? <DocumentGallery documents={sectionDocuments} covers={documentCovers} /> : null}
                    </div>
                
                )
            })
        }
        </>
    )                
}
