"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoChevronDown, IoClose, IoMenu } from "react-icons/io5";
import { navbar } from "./navbarStructure";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import Medal from "@/public/Logo-SKSF27-klein-strich-negativ.png";
import layout from "./NavbarLayout.module.css";
import s from "./Navbar_Mobile.module.css";

export default function Navbar_Mobile() {
    const [visible, setVisible] = useState(false);
    const [submenu, setSubmenu] = useState<string | null>(null);
    const toggle = useRef<HTMLButtonElement>(null);
    function closeMenu() {
        setVisible(false);
        setSubmenu(null);
    }
    return (
        <nav className={`${layout.bar} ${layout.mobile}`} aria-label="Hauptnavigation"
            onKeyDown={event => {
                if (event.key === "Escape") {
                    closeMenu();
                    toggle.current?.focus();
                }
            }}>
            <div className={layout.inner}>
                <Link href="/" className={layout.brand} aria-label="SKSF27 – Startseite" onClick={closeMenu}>
                    <Image src={Medal} fill sizes="64px" alt="" />
                </Link>
                <div className={layout.tagline}>Schaffhauser Kantonalschützenfest 2027</div>
                <div className={layout.theme}><ThemeToggler /></div>
                <button ref={toggle} type="button" className={s.toggle}
                    aria-label={visible ? "Menü schliessen" : "Menü öffnen"}
                    aria-expanded={visible} aria-controls="mobile-navigation"
                    onClick={() => { setVisible(!visible); setSubmenu(null); }}>
                    {visible ? <IoClose aria-hidden="true" /> : <IoMenu aria-hidden="true" />}
                </button>
            </div>
            <ul className={s.panel} id="mobile-navigation" hidden={!visible}>
                {navbar.map((item, index) => (
                    <li key={item.name}>
                        {item.sub ? <>
                            <button type="button" className={s.link}
                                aria-expanded={submenu === item.name}
                                aria-controls={`mobile-submenu-${index}`}
                                onClick={() => setSubmenu(submenu === item.name ? null : item.name)}>
                                {item.name}<IoChevronDown aria-hidden="true" />
                            </button>
                            <ul className={s.submenu} id={`mobile-submenu-${index}`} hidden={submenu !== item.name}>
                                {item.sub.map(sub => (
                                    <li key={sub.name}>
                                        <Link className={s.sublink} href={sub.url} onClick={closeMenu}
                                            target={sub.openInNewTab ? "_blank" : undefined}
                                            rel={sub.openInNewTab ? "noopener noreferrer" : undefined}>
                                            {sub.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </> : <Link className={s.link} href={item.url} onClick={closeMenu}
                            target={item.openInNewTab ? "_blank" : undefined}
                            rel={item.openInNewTab ? "noopener noreferrer" : undefined}>
                            {item.name}
                        </Link>}
                    </li>
                ))}
            </ul>
        </nav>
    );
}