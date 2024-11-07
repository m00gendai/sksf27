"use client"

import OrganizationChart from "organization-chart-react";
import "organization-chart-react/dist/style.css";
import { OK } from "./Interface_Organisation";
import TestBild from "@/public/testbild.png"
import s from "./OrgChart.module.css"
import { Suspense, useEffect, useRef, useState } from "react";
import { Margin, Resolution, usePDF } from 'react-to-pdf';
import { Tree, TreeNode } from 'react-organizational-chart';

import React from "react";
import { Button } from "@radix-ui/themes";
import OrgPosition from "./OrgPosition";

interface Props{
  org: OK[]
}


export default function OrganizationalChart({org}:Props){

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

const [isClient, setIsClient] = useState(false)

useEffect(() => {
  setIsClient(true); // After mounting on the client, set isClient to true
}, []);

  return(
    isClient ? <>
    <h2>Organigramm</h2>
    {/* On mobile, the org chart is not displayed. But having display: none; on it interferes with the PDF generation. It is thus handled with zero width/height in the .container CSS*/}
      <div className={`${s.container}`} > 
        <Suspense fallback={<p>Laden...</p>}>
        <div ref={targetRef}>
          <Tree label={<OrgPosition data={org[0]} />}>
            {
              org.map((position, psnIndex) =>{
                if(position.parent === org[0].title){
                  {
                    return org.filter(sub => sub.parent === position.title).length === 0 ? <TreeNode key={`psn_${psnIndex}`} label={<OrgPosition data={position} />} />: 
                      <TreeNode key={`psn_${psnIndex}`} label={<OrgPosition data={position} />}>
                        {
                          org.map((sub, subIndex) =>{
                            if(sub.parent === position.title){
                              return <TreeNode key={`sub_${subIndex}`} label={<OrgPosition data={sub} />} />
                            } 
                          })
                        }
                      </TreeNode>
                  }
                }
              })
            }

          </Tree>
          </div>
        </Suspense>
      </div>
      <Button className={`desktop button`} onClick={() => toPDF()}>{`Als PDF speichern`}</Button>
      <Button className={`mobile button`} onClick={() => toPDF()}>{`Organigramm als PDF öffnen`}</Button>
      </> : null
  )
}

