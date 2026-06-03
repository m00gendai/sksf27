import { Medium } from "@/globals/globals_interface"
import s from "./documentGallery.module.css"

interface Props{
    documents: Medium[]
}

export default function DocumentGallery({documents}:Props){
    return(
        <div className={s.container}>
            {documents.map((document, index) =>{
                return(
                        <a key={`${index}_${document.title}`} className={`${s.document} boxShadow`} href={`${process.env.NEXT_PUBLIC_STORAGE}${document.path}`} target="_blank" rel="noopener noreferrer">
                            <div className={s.documentTitle}>
                                {document.title}
                            </div>
                        </a>
                )
            })}
        </div>
    )
}