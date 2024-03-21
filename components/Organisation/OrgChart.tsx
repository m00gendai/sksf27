"use client"

import OrganizationChart from "organization-chart-react";
import "organization-chart-react/dist/style.css";
import { OK } from "./Interface_Organisation";
import TestBild from "@/public/testbild.png"
import s from "./OrgChart.module.css"

interface Props{
  org: OK[]
}


export default function OrganizationalChart({org}:Props){

  interface orgData{
    title: string
    titleClass: string
    contentClass: string
    add?: string
    member: {name: string, add?: string, image_url: string}[]
    children?: {title: string, titleClass: string, contentClass: string, member: {name: string, add?: string, image_url: string}[]}
  }

  const onClickNode = (data:orgData) => {
   document.getElementById(`${data.title}`)?.scrollIntoView({behavior: "smooth", block: "center"})
}


/* Commence unholy generation of tree data */

  const orgData = {
    title: org[0].title,
    member: [
      {
        name: org[0].name,
        image_url: `${org[0].foto ? `${process.env.NEXT_PUBLIC_STORAGE}${org[0].foto.path}` : TestBild.src}`,
      },
    ],
    children: org.map((person, index)=>{
      if(person.parent === org[0].title){
        return {
          title: person.title,
          member: [
            {
              name: person.name,
              image_url: `${person.foto ? `${process.env.NEXT_PUBLIC_STORAGE}${person.foto.path}` : TestBild.src}`,
            }
          ],
           children: org.map((sub, index)=>{ /* to avoid rendering a "0" if there are no children, the children array has first to be generated, then checked for length, and then if its not 0, generate it for real... its horrendous */
            if(sub.parent === person.title){
              return{
                title: sub.title,
                member: [
                  {
                    name: sub.name,
                    image_url: `${sub.foto ? `${process.env.NEXT_PUBLIC_STORAGE}${sub.foto.path}` : TestBild.src}`,
                  }
                ]
              }
            } else return undefined
          }).filter(obj => obj !== undefined).length !== 0 ? org.map((sub, index)=>{ /* here's the stupid zero-length-check */
            if(sub.parent === person.title){
              return{
                title: sub.title,
                member: [
                  {
                    name: sub.name,
                    image_url: `${sub.foto ? `${process.env.NEXT_PUBLIC_STORAGE}${sub.foto.path}` : TestBild.src}`,
                  }
                ]
              }
            } else return undefined
          }).filter(obj => obj !== undefined) : null
        }
      }
    }).filter(obj => obj !== undefined)
  };

  return(
    <>
    <h2>Organigramm</h2>
      <div className={s.container}>
        <OrganizationChart data={orgData} onClickNode={onClickNode}/>   
      </div>
      </>
  )
}