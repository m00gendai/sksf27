export interface DocumentType {
    label?: string
    icon: "file" | "text" | "spreadsheet" | "presentation" | "archive"
}

const mimeExtensions: Record<string, string> = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    "application/vnd.oasis.opendocument.text": "odt",
    "application/vnd.oasis.opendocument.spreadsheet": "ods",
    "application/vnd.oasis.opendocument.presentation": "odp",
    "application/zip": "zip",
    "application/x-zip-compressed": "zip",
    "application/x-7z-compressed": "7z",
    "application/vnd.rar": "rar",
    "application/x-rar-compressed": "rar",
    "application/gzip": "gz",
    "application/rtf": "rtf",
    "text/rtf": "rtf",
    "text/plain": "txt",
    "text/csv": "csv",
    "application/json": "json",
    "application/xml": "xml",
    "text/xml": "xml",
}

export function getDocumentType(mime?: string | null, path?: string | null): DocumentType {
    const mimeType = mime?.split(";")[0].trim().toLowerCase()
    let fileName = (path ?? "").split(/[?#]/)[0].split("/").pop() ?? ""

    try {
        fileName = decodeURIComponent(fileName)
    } catch {
        // A malformed escape sequence should not prevent the document from opening.
    }

    const extension = (mimeType?.includes("/") ? mimeExtensions[mimeType] : undefined)
        ?? fileName.match(/\.([a-z0-9]{1,10})$/i)?.[1].toLowerCase()

    if (!extension) return { icon: "file" }

    const label = extension.toUpperCase()
    if (["pdf", "doc", "docx", "odt", "rtf", "txt"].includes(extension)) return { label, icon: "text" }
    if (["xls", "xlsx", "ods", "csv"].includes(extension)) return { label, icon: "spreadsheet" }
    if (["ppt", "pptx", "odp"].includes(extension)) return { label, icon: "presentation" }
    if (["zip", "7z", "rar", "gz", "tar", "tgz"].includes(extension)) return { label, icon: "archive" }
    return { label, icon: "file" }
}

export function formatFileSize(bytes?: number | null): string | undefined {
    if (typeof bytes !== "number" || !Number.isSafeInteger(bytes) || bytes < 0) return undefined

    const units = ["B", "KB", "MB", "GB", "TB"]
    let value = bytes
    let unit = 0
    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024
        unit++
    }

    const formatted = new Intl.NumberFormat("de-CH", {
        maximumFractionDigits: unit >= 2 ? 1 : 0,
    }).format(value)

    return `${formatted} ${units[unit]}`
}
