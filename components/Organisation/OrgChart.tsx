"use client"

import OrganizationChart from "organization-chart-react";
import "organization-chart-react/dist/style.css";
import { OK } from "./Interface_Organisation";
import TestBild from "@/public/testbild.png"
import s from "./OrgChart.module.css"
import { Suspense, useRef } from "react";
import { Margin, Resolution, usePDF } from 'react-to-pdf';
import { Button } from 'primereact/button';
import React from "react";

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

  const options = {
    // default is `save`
    method: 'open',
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
       // margin is in MM, default is Margin.NONE = 0
       margin: Margin.SMALL,
       // default is 'A4'
       format: 'letter',
       // default is 'portrait'
       orientation: 'landscape',
    },
    canvas: {
       // default is 'image/jpeg' for better size performance
       mimeType: 'image/png',
       qualityRatio: 1
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break, 
    // so use with caution.
    overrides: {
       // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
       pdf: {
          compress: true
       },
       // see https://html2canvas.hertzen.com/configuration for more options
       canvas: {
          useCORS: true
       }
    },
 };

 const { toPDF, targetRef } = usePDF(
  {filename: 'SKSF27 Organigramm.pdf', 
  page: {
  // margin is in MM, default is Margin.NONE = 0
  margin: Margin.LARGE,
  // default is 'A4'
  format: 'A4',
  // default is 'portrait'
  orientation: 'landscape',
}});

  return(
    <>
    <h2>Organigramm</h2>
    {/* On mobile, the org chart is not displayed. But having display: none; on it interferes with the PDF generation. It is thus handled with zero width/height in the .container CSS*/}
      <div className={`${s.container}`} > 
        <Suspense fallback={<p>Laden...</p>}>
        <div ref={targetRef}><OrganizationChart  data={orgData} onClickNode={onClickNode}/> </div>
        </Suspense>
      </div>
      <Button className={"desktop"} label={"als PDF speichern"} onClick={() => toPDF()} />
      <Button className={"mobile"} label={"Organigramm öffnen"} onClick={() => toPDF()} />
      </>
  )
}

