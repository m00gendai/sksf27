import { ShootingRange } from "./Interface_Map"
import MapPane from "./MapPane"
import s from "./MapContainer.module.css"

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

export default async function MapContainer(){

    const ranges:ShootingRange[] = await getRanges()

    return(
        <div className={s.container}>
            <MapPane ranges={ranges} />
        </div>     
  )
}