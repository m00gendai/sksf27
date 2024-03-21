import { OK } from './Interface_Organisation';
import s from "./Organisation.module.css"
import TestBild from "../../public/testbild.png"
import Image from "next/image"

interface Props{
    people: OK[]
}

export default function Organisation({people}:Props){

    return(
        <>
        <h2>Personen im Detail</h2>
        <div className={s.container}>
            <h3 >Präsidium</h3>
            <div className={s.cardContainer}>    
            {people.map(person =>{
                if(person.category === "Präsidium"){
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

            <h3 >Schiesskomitee</h3>
            <div className={s.cardContainer}>    
            {people.map(person =>{
                if(person.category === "Schiesskomitee"){
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

            <h3 >Finanzen</h3>
            <div className={s.cardContainer}>    
            {people.map(person =>{
                if(person.category === "Finanzen"){
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

            <h3 >Logistik</h3>
            <div className={s.cardContainer}>    
            {people.map(person =>{
                if(person.category === "Logistik"){
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

            <h3 >Marketing & Medien</h3>
            <div className={s.cardContainer}>    
            {people.map(person =>{
                if(person.category === "Marketing & Medien"){
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
          </>
    )
}