import { SiteContent } from "@/globals/globals_interface"
import Gallery from "../Gallery/Gallery"

interface Props{
    siteContent:SiteContent[]
}

export default function PageHeading({siteContent}:Props){
    return(
        <>
        {
            siteContent[0].content.map((section, index) =>{
                return(
                    <div key={`${index}_${section.sectionTitle ? section.sectionTitle : "genericTitle"}`} className="content">
                        {section.sectionTitle ? <h3>{section.sectionTitle}</h3> : null}
                        <div className="content_text" dangerouslySetInnerHTML={{__html: section.sectionText}}></div>
                        {section.sectionAssets ? <Gallery images={section.sectionAssets} /> : null}
                    </div>
                )
            })
        }
        </>
    )                
}