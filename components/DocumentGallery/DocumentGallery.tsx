import { Medium } from "@/globals/globals_interface"
import s from "./documentGallery.module.css"
import Image from "next/image"

interface Props{
    documents: Medium[]
    covers?: Record<string, string>
}

export default function DocumentGallery({documents, covers}:Props){
    return(
        <div className={s.container}>
            {documents.map((document, index) =>{
                const cover = covers?.[document.title]
                return(
                        <a key={`${index}_${document.title}`} className={`${s.document} boxShadow`} href={`${process.env.NEXT_PUBLIC_STORAGE}${document.path}`} target="_blank" rel="noopener noreferrer" aria-label={document.title}>
                            {cover ? <div className={s.cover}><Image src={cover} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" className={s.coverImage} /></div> : <div className={s.documentTitle}>
                                {document.title}
                            </div>}
                        </a>
                )
            })}
        </div>
    )
}
