import SH from "@/public/SH.png"
import Image from "next/image"
import s from "@/app/Home.module.css"

export default function Home() {
  return (
    <main>
      <div className={s.image}>
      <Image 
        src={SH}
        fill={true}
        alt={"Wappen Schaffhausen"}
        style={{objectFit: "contain"}}
      />
      </div>
      
     <h1 className={s.title} >Schaffhauser Kantonalschützenfest 2027</h1>
     <h2 className={s.date}>August 2027</h2>
    </main>
  );
}
