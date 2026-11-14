"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoChevronDown } from "react-icons/io5";
import { navbar } from "./navbarStructure";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import Medal from "@/public/Logo-SKSF27-klein-strich-negativ.png";
import layout from "./NavbarLayout.module.css";
import s from "./Navbar.module.css";

export default function Navbar() {
    const [submenu, setSubmenu] = useState<string | null>(null);
    const triggers = useRef<(HTMLButtonElement | null)[]>([]);
    const pointerType = useRef("");
    return (
        <nav className={`${layout.bar} ${layout.desktop}`} aria-label="Hauptnavigation"
            onKeyDown={event => {
                if (event.key === "Escape") {
                    const index = navbar.findIndex(item => item.name === submenu);
                    setSubmenu(null);
                    triggers.current[index]?.focus();
                }
            }}>
            <div className={layout.inner}>
                <Link href="/" className={layout.brand} aria-label="SKSF27 – Startseite">
                    <Image src={Medal} fill sizes="64px" alt="" />
                </Link>
                <div className={layout.tagline}>Schaffhauser Kantonalschützenfest 2027</div>
                <ul className={s.items}>
                    {navbar.map((item, index) => (
                        <li className={s.item} key={item.name}
                            onPointerEnter={event => {
                                if (event.pointerType === "mouse") setSubmenu(item.sub ? item.name : null);
                            }}
                            onPointerLeave={event => {
                                // Do not dismiss a dropdown while a link inside it has keyboard focus.
                                if (event.pointerType === "mouse" && !event.currentTarget.querySelector("ul")?.contains(document.activeElement)) setSubmenu(null);
                            }}
                            onBlur={event => {
                                if (!event.currentTarget.contains(event.relatedTarget)) setSubmenu(null);
                            }}>
                            {item.sub ? <>
                                <button type="button" className={s.link}
                                    ref={element => { triggers.current[index] = element; }}
                                    aria-expanded={submenu === item.name}
                                    aria-controls={`desktop-submenu-${index}`}
                                    onPointerDown={event => { pointerType.current = event.pointerType; }}
                                    onClick={event => {
                                        // Clicking a trigger already opened by hover should keep it open.
                                        const toggle = event.detail === 0 || pointerType.current !== "mouse";
                                        setSubmenu(toggle && submenu === item.name ? null : item.name);
                                    }}
                                    onKeyDown={event => {
                                        if (event.key === "ArrowDown") {
                                            event.preventDefault();
                                            setSubmenu(item.name);
                                            requestAnimationFrame(() => {
                                                document.getElementById(`desktop-submenu-${index}`)?.querySelector("a")?.focus();
                                            });
                                        }
                                    }}>
                                    {item.name}<IoChevronDown aria-hidden="true" />
                                </button>
                                <ul className={s.dropdown} id={`desktop-submenu-${index}`} hidden={submenu !== item.name}>
                                    {item.sub.map(sub => (
                                        <li key={sub.name}>
                                            <Link href={sub.url} className={s.sublink}
                                                target={sub.openInNewTab ? "_blank" : undefined}
                                                rel={sub.openInNewTab ? "noopener noreferrer" : undefined}
                                                onClick={() => setSubmenu(null)}>
                                                {sub.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </> : <Link href={item.url} className={s.link}
                                target={item.openInNewTab ? "_blank" : undefined}
                                rel={item.openInNewTab ? "noopener noreferrer" : undefined}>
                                {item.name}
                            </Link>}
                        </li>
                    ))}
                </ul>
                <div className={layout.theme}><ThemeToggler /></div>
            </div>
        </nav>
    );
}
