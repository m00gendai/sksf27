import { ShootingRange as RangeType} from "../Map/Interface_Map"
import ShootingRange from "./ShootingRange"
import s from "./ShootingRanges.module.css"

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

    const ranges:RangeType[] = await getRanges.json()
    return ranges
}

export default async function ShootingRanges(){

    const ranges:RangeType[] = await getRanges()

    return(
        <div className={s.container}>
            {ranges.map(range=>{
                return <ShootingRange range={range} />
            })}
        </div>
    )
}