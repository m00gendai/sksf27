import Link from "next/link";
import { navbar } from "../Navbar/navbarStructure";
import s from "./QuickLinks.module.css";

export default function QuickLinks() {
    const links = navbar.flatMap(item => [item, ...(item.sub ?? [])])
        .filter(item => item.isQuickLink);
    return (
        <nav className={s.container} aria-label="Schnellzugriff">
            {links.map(item => (
                <Link key={item.url} href={item.url} className={s.item}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}>
                    <span className={s.icon} aria-hidden="true">{item.icon}</span>
                    <span className={s.name}>{item.name}</span>
                </Link>
            ))}
        </nav>
    );
}