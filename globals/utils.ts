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
