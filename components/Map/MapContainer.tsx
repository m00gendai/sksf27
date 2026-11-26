import { FestivalCentre, ShootingRange } from "./Interface_Map"
import MapPane from "./MapPane"
import s from "./MapContainer.module.css"

const festivalCentre: FestivalCentre = {
    coordinates: [47.7177, 8.6603],
    name: "Festzentrum",
    location: "Schaffhausen (Herblingen)",
    description: "Hier trifft sich die Schützenfamilie – zum Verweilen, Geniessen und Feiern.",
    href: "/schiessen/festzentrum",
    color: "#D32F2F",
    logo: "/Logo_GVS_freigestellt_512x238.png",
}

async function getRanges(){
    const getRanges:Response = await fetch(
        'https://cms.sksf27.ch/api/content/items/shootingRanges?populate=100',
        {
            headers: {
                'api-key': `${process.env.CMS}`,
            },
            next: {
                revalidate: 10,
            }
        }
    )

    const ranges:ShootingRange[] = await getRanges.json()
    return ranges
}

interface Props {
    fillAvailableSpace?: boolean
}

export default async function MapContainer({ fillAvailableSpace = false }: Props){

    const ranges:ShootingRange[] = await getRanges()

    return(
        <div className={`${s.container} ${fillAvailableSpace ? s.fillAvailableSpace : ""}`}>
            <MapPane ranges={ranges} festivalCentre={festivalCentre}/>
        </div>
  )
}
