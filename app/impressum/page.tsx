import { PageContent } from "@/globals/globals_interface"
import s from "../../components/PageHeading/PageHeading.module.css"
import React from "react"

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
                <h1 className={s.heading}>{pageContent.page}</h1>
                {pageContent.content.map(element =>{
                    return(
                        <React.Fragment key={element.title}>
                        <h2>{element.title}</h2>
                        <div className="content" dangerouslySetInnerHTML={{__html: element.text}}></div>
                        </React.Fragment>
                    )
                })}
            </section>
        </main>
    )
}