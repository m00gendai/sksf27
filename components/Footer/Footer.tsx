import s from "./Footer.module.css"

export default async function Footer(){

    const date:Date = new Date()
    const currentYear:number = date.getFullYear()
    const creationYear:number = 2024

    return(
        <footer className={s.footer}>
            <div className={s.copyright}>{`© ${creationYear}${currentYear === creationYear ? "" : `-${currentYear}`} Schaffhauser Kantonalschützenfest 2027`}</div>
            <div className={s.shamelessPlug} dangerouslySetInnerHTML={{__html: `Webdesign von <a href="https://mrweber.ch" target="_blank" title="Webseite von mrweber.ch Webdesign besuchen"><u>mrweber.ch</u></a>`}}></div>
        </footer>
    )
    }