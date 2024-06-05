import ContactForm from "@/components/ContactForm/ContactForm";
import PageHeading from "@/components/PageHeading/PageHeading";
import { PageContent } from "@/globals/globals_interface";
import { pageMetadata } from "@/globals/utils";
import { Content } from "@radix-ui/react-collapsible";
import Link from "next/link";

async function getContent(){
    const getContent:Response = await fetch(
        'https://cms.sksf27.ch/api/content/items/content?filter=%7Bpage%3A%22Kontakt%22%7D&populate=100',
        {
            headers: {
                'api-key': `${process.env.CMS}`,
            },
            next: {
                revalidate: 10,
            }
        }
    )

    const content:PageContent[] = await getContent.json()
    return content[0]
}

export async function generateMetadata(){
    return pageMetadata("Kontakt")
  }

export default async function Page(){

    const pageContent:PageContent = await getContent()
    return(
        <main>
            <section>
                <PageHeading image={"kontakt"}/>
                {pageContent.content.map(element=>{
                    if(element.title === "Intro"){
                        return(
                            <div className="content" key={"intro"} dangerouslySetInnerHTML={{__html: element.text}}></div>
                        )
                    }
                })}
                <ContactForm />
                {pageContent.content.map((element, index)=>{
                    if(element.title !== "Intro"){
                        return(
                            <div className="content" key={element.title}>
                                <h2>{element.title}</h2>
                                <div className="content_text" dangerouslySetInnerHTML={{__html: element.text}}></div>
                            </div>
                        )
                    }
                })}
            </section>
        </main>
    )
}