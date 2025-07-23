import { OK } from './Interface_Organisation';
import s from "./Organisation.module.css"
import TestBild from "../../public/testbild.png"
import Image from "next/image"
import { Card, Inset } from '@radix-ui/themes';
import { LuMail, LuUser } from 'react-icons/lu';

interface Props{
    people: OK[]
}

export default function Organisation({people}:Props){

    const categories: string[] = Array.from(new Set(people.map(person=>person.category)))

    const sortedPeople = people.sort((a, b) =>{
        const x = a.title
        const y = b.title

        return x > y ? 1 : x < y ? -1 : 0
    })

    return(
        <>
        <h2>Personen im Detail</h2>
        {categories.map(category =>{
            return(
                <div className={s.container} key={`cat_${category}`}>
                    <h3>{category}</h3>
                    <div className={s.cardContainer}>    
                    {sortedPeople.map(person =>{
                        if(person.category === category){
                            return(
                                <Card id={`${person.title}`} className="boxShadow" key={`card_${person._id}`}>
                                    <Inset side="top" clip="padding-box" className={s.cardTop}><div className={s.title}>{person.title}</div></Inset>
                                    <div className={s.content}>
                                        <div className={s.image}>
                                            <Image src={person.foto ? `${process.env.NEXT_PUBLIC_STORAGE}${person.foto.path}` : TestBild.src} alt="" fill={true} className={s.imageItem}/>
                                        </div>
                                        <div className={s.info}>
                                            <p className={s.name}><LuUser style={{margin: "0 1rem 0 0"}}/>{person.name}</p>
                                            {person.mail ? <p><LuMail style={{margin: "0 1rem 0 0"}}/><a href={`mailto:${person.mail}`}>{person.mail}</a></p> : null}
                                        </div>
                                    </div>
                                </Card>
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