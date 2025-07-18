import { Metadata, SiteMetaData } from "./globals_interface"
import he from 'he';

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
            icon: '/Logo SKSF27 klein cmyk positiv.jpg',
            shortcut: '/Logo SKSF27 klein cmyk positiv.jpg',
            apple: '/Logo SKSF27 klein cmyk positiv.jpg',
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: '/Logo SKSF27 klein cmyk positiv.jpg',
            },
        },
    }
}

export async function siteMetaData(data:SiteMetaData){

    const text_HTMLremoved = data.metaSiteDescription ? data.metaSiteDescription.replace(/<[^>]*>/g, '') : ""
    const text_decoded = he.decode(text_HTMLremoved);
    const text_trimmed = text_decoded.replace(/\s+/g, ' ').trim();

    return {
        title: data.metaPageName ? data.metaPageName : "",
        description: text_trimmed,
        openGraph: {
            title: data.metaPageName ? data.metaPageName : "",
            description: text_trimmed,
            images: [
                {
                    url: data.metaImage ? `${process.env.NEXT_PUBLIC_STORAGE}${data.metaImage.path}` : "/placeholder.png",
                }
            ],
            locale: 'de_CH',
            type: 'website',
        },
        icons: {
            icon: '/Logo SKSF27 klein cmyk positiv.jpg',
            shortcut: '/Logo SKSF27 klein cmyk positiv.jpg',
            apple: '/Logo SKSF27 klein cmyk positiv.jpg',
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: '/Logo SKSF27 klein cmyk positiv.jpg',
            },
        },
    }
}

export function toRGB(hex: string) {
    const r:number = parseInt(hex.slice(1, 3), 16);
    const g:number = parseInt(hex.slice(3, 5), 16);
    const b:number = parseInt(hex.slice(5, 7), 16);
    const rgb:string = `${r},${g},${b}`;
    return rgb;
  }

export function gradientPlaceholder(rgb:string[]){
    const style:React.CSSProperties = {
        background: `
            linear-gradient(72deg, rgba(${rgb[0]},0.8), rgba(${rgb[0]}, 0) 70.71%), 
            linear-gradient(144deg, rgba(${rgb[1]},0.8), rgba(${rgb[1]}, 0) 70.71%),
            linear-gradient(216deg, rgba(${rgb[2]},0.8), rgba(${rgb[2]}, 0) 70.71%),
            linear-gradient(288deg, rgba(${rgb[3]},0.8), rgba(${rgb[3]}, 0) 70.71%),
            linear-gradient(360deg, rgba(${rgb[4]},0.8), rgba(${rgb[4]}, 0) 70.71%)
            `,
    }
    return style
}