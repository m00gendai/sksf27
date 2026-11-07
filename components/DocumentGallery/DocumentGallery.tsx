import type { Medium } from "@/globals/globals_interface"
import type { IconType } from "react-icons"
import Image from "next/image"
import { LuExternalLink, LuFile, LuFileArchive, LuFileSpreadsheet, LuFileText, LuPresentation } from "react-icons/lu"
import { formatFileSize, getDocumentType, type DocumentType } from "./documentMetadata"
import s from "./documentGallery.module.css"

interface Props{
    documents: Medium[]
    covers?: Record<string, string>
}

const fileIcons: Record<DocumentType["icon"], IconType> = {
    file: LuFile,
    text: LuFileText,
    spreadsheet: LuFileSpreadsheet,
    presentation: LuPresentation,
    archive: LuFileArchive,
}

export default function DocumentGallery({documents, covers}:Props){
    const hasCovers = documents.some(document => Boolean(covers?.[document.title]))
    const coversOnly = hasCovers && documents.every(document => Boolean(covers?.[document.title]))

    return(
        <div className={`${s.container}${hasCovers ? ` ${s.withCovers}` : ""}${coversOnly ? ` ${s.coversOnly}` : ""}`}>
            {documents.map((document, index) =>{
                const cover = covers?.[document.title]

                if (cover) {
                    return (
                        <a
                            key={`${index}_${document.title}`}
                            className={`${s.coverDocument} boxShadow`}
                            href={`${process.env.NEXT_PUBLIC_STORAGE}${document.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${document.title} (öffnet in einem neuen Tab)`}
                        >
                            <div className={s.cover}>
                                <Image
                                    src={cover}
                                    alt=""
                                    fill
                                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className={s.coverImage}
                                />
                            </div>
                        </a>
                    )
                }

                const fileType = getDocumentType(document.mime, document.path)
                const fileSize = formatFileSize(document.size)
                const FileIcon = fileIcons[fileType.icon]

                return(
                        <a key={`${index}_${document.title}`} className={s.document} href={`${process.env.NEXT_PUBLIC_STORAGE}${document.path}`} target="_blank" rel="noopener noreferrer">
                            <FileIcon className={s.fileIcon} aria-hidden="true" focusable="false" />
                            <span className={s.documentContent}>
                                <span className={s.documentTitle}>{document.title}</span>
                                {fileType.label || fileSize ? (
                                    <span className={s.metadata}>
                                        {fileType.label ? <span>{fileType.label}</span> : null}
                                        {fileType.label && fileSize ? <span aria-hidden="true">·</span> : null}
                                        {fileSize ? <span>{fileSize}</span> : null}
                                    </span>
                                ) : null}
                            </span>
                            <LuExternalLink className={s.openIcon} aria-hidden="true" focusable="false" />
                            <span className={s.srOnly}> (öffnet in einem neuen Tab)</span>
                        </a>
                )
            })}
        </div>
    )
}
