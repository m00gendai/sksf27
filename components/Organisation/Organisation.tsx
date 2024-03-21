import { OK } from './Interface_Organisation';
import s from "./Organisation.module.css"
import TestBild from "../../public/testbild.png"
import Image from "next/image"

interface Props{
    people: OK[]
}

export default function Organisation({people}:Props){

    const categories: string[] = Array.from(new Set(people.map(person=>person.category)))

    return(
        <>
        <h2>Personen im Detail</h2>
        {categories.map(category =>{
            return(
                <div className={s.container} key={`cat_${category}`}>
                    <h3>{category}</h3>
                    <div className={s.cardContainer}>    
                    {people.map(person =>{
                        if(person.category === category){
                            return(
                                <div id={`${person.title}`} className={s.card} key={`card_${person._id}`}>
                                    <div className={s.image}>
                                            <Image src={person.foto ? `${process.env.NEXT_PUBLIC_STORAGE}${person.foto.path}` : TestBild.src} alt="" fill={true} style={{objectFit: "contain"}}/>
                                        </div>
                                    <div className={s.info}>
                                        <p className={s.title}>{person.title}</p>
                                        <p className={s.name}>{person.name}</p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                    </div>           
                </div>
            )
          })}
          </>
    )
}