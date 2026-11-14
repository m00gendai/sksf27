"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from "react"
import { RxMoon, RxShadow, RxSun } from "react-icons/rx";
import s from "./ThemeToggler.module.css"

export default function ThemeToggler(){

    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <button type="button" className={s.button} aria-label="Farbschema wechseln" disabled><RxShadow aria-hidden="true"/></button>
    }

    function toggleTheme(){
        theme === "dark" || resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")
    }

    return(
        <button type="button" className={s.button} onClick={toggleTheme} aria-label={theme === "dark" || resolvedTheme === "dark" ? "Helles Farbschema aktivieren" : "Dunkles Farbschema aktivieren"}>{theme === "dark" || resolvedTheme === "dark" ? <RxMoon aria-hidden="true"/> : <RxSun aria-hidden="true"/>}</button>
    )
}
