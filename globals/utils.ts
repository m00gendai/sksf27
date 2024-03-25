import { Metadata } from "./globals_interface"

export function getCompassDegrees(direction:string){
    switch(direction){
        case "Norden":
            return 0
        case "Nord-Nordost":
            return 22.5
        case "Nordost":
            return 45
        case "Ost-Nordost":
            return 67.5
        case "Osten":
            return 90
        case "Ost-Südost":
            return 112.5
        case "Südosten":
            return 135
        case "Süd-Südost":
            return 157.5
        case "Süden":
            return 180
        case "Süd-Südwest":
            return 202.5
        case "Südwest":
            return 225
        case "West-Südwest":
            return 247.5
        case "Westen":
            return 270
        case "West-Nordwest":
            return 292.5
        case "Nordwest":
            return 315
        case "Nord-Nordwest":
            return 337.5
        default:
            return 0
    }
}

export async function pageMetadata(pageName:string){
    const getMetadata: Response = await fetch(
        `https://cms.sksf27.ch/api/content/item/taglines?filter=%7Bpage%3A%22${pageName}%22%7D&populate=1`,
        {
            headers: {
                'api-key': `${process.env.CMS}`,
            },
        }
    )
    const metadata:Metadata = await getMetadata.json()

    return {
        title: metadata.title,
        description: metadata.description,
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            images: [
                {
                    url: metadata.image ? `${process.env.NEXT_PUBLIC_STORAGE}${metadata.image.path}` : "/placeholder.png",
                }
            ],
            locale: 'de_CH',
            type: 'website',
        },
        icons: {
            icon: '/SH.png',
            shortcut: 'SH.png',
            apple: '/SH.png',
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: '/SH.png',
            },
        },
    }
}
