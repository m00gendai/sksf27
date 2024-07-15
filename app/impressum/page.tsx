import { PageContent } from "@/globals/globals_interface"
import s from "../../components/PageHeading/PageHeading.module.css"
import React from "react"
import PageHeading from "@/components/PageHeading/PageHeading"

async function getContent(){
    const getContent:Response = await fetch(
        'https://cms.sksf27.ch/api/content/items/content?filter=%7Bpage%3A%22Impressum%22%7D&populate=100',
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


export default async function Page(){

    const pageContent:PageContent = await getContent()

    return(
        <main>
            <section>
                <PageHeading image={"impressum"} />
                {pageContent.content.map(element =>{
                    return(
                        <div key={element.title} className="content">
                        <h2>{element.title}</h2>
                        <div className="content_text" dangerouslySetInnerHTML={{__html: element.text}}></div>
                        </div>
                    )
                })}
            </section>
        </main>
    )
}