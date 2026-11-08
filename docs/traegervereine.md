# Trägervereine

The static page is at `/ueber-uns/traegervereine`. Both navigation components use
`components/Navbar/navbarStructure.tsx`: Organisation → Trägervereine → Kontakt.
No Cockpit data or models are used or changed by this page.

## Editing clubs and adding logos

Edit `data/traegervereine.ts`. Its strongly typed array controls the club order,
names, optional `website`, and optional `logo`. Keep IDs unique and stable.

Put a real club logo in `public/logo_vereine/`, then add its public path:

```ts
{
    id: "altdorf-opfertshofen",
    name: "Altdorf-Opfertshofen Schützengesellschaft",
    website: "https://www.sgaltdorfopfertshofen.ch/",
    logo: "/logo_vereine/altdorf-opfertshofen.png",
}
```

The filename above is an example; no club logo is included yet. Removing `logo`
restores the shared neutral image icon. `ClubGallery` uses a fixed 10rem-high logo
area and Next.js Image with `object-fit: contain`, so wide and tall logos keep
their proportions. Only the name links to the website; the logo area is never a link.
The page reuses the existing local `Reiat_2560x1280.jpg` header photograph through
the shared PageHeading component without changing its styling.

The grid has one column below 600px, two from 600px, and three from 1024px.
Names wrap naturally. Links open a new tab with `noopener noreferrer`, have a
visible keyboard focus outline, and change colour on hover in both themes.

## Website verification

Checked on 2026-11-08. The
[Schaffhauser Kantonalschützenverband directory](https://sh-schiessen.ch/vereine-des-shksv/)
documents the eight linked clubs. Each included HTTPS homepage also returned
HTTP 200 during the implementation check. This is a point-in-time check, not
ongoing availability monitoring.

| Club | Official website included |
| --- | --- |
| Altdorf-Opfertshofen Schützengesellschaft | [sgaltdorfopfertshofen.ch](https://www.sgaltdorfopfertshofen.ch/) |
| Bibern-Hofen Schützengesellschaft | No verified website found; plain name |
| Thayngen Feldschützengesellschaft | [fsg-thayngen.ch](https://www.fsg-thayngen.ch/) |
| Dörflingen Schützengesellschaft | [sgdoerflingen.ch](https://www.sgdoerflingen.ch/) |
| Lohn Schützengesellschaft | [sglohn.ch](https://www.sglohn.ch/) |
| Bargen Schützenverein | [svbargen.ch/svb](https://www.svbargen.ch/svb/) |
| Buch Schiessverein | No verified website found; plain name |
| Merishausen Schützenverein | [svmerishausen.clubdesk.ch](https://svmerishausen.clubdesk.ch/) |
| Ramsen Schützenverein | [sv-ramsen.ch](https://www.sv-ramsen.ch/) |
| Pistolenschützen Randen Schaffhausen | [psranden.ch](https://www.psranden.ch/) |
| Sportschützen Munot Schaffhausen | No currently reachable official website verified; plain name |

Bibern-Hofen and Buch have no website in the SHKSV directory. Buch's
[municipal club listing](https://buch-sh.ch/gewerbevereine/) also supplies no club
website. The similarly named `sgbibern.ch` and `svbuchthalen.ch` belong to other
clubs and are deliberately not used.

An older [Ferienpass programme](https://www.nordagenda.ch/documents/file/Programm%20Schaffhauser%20Ferienpass%202018.pdf)
lists `www.sportschuetzen-munot.ch`, but the domain failed DNS resolution during
verification. Do not add it without confirming a current working destination.
For an unlinked club, add `website` only after verifying its official URL.

## Implementation checks

- ESLint on the changed TypeScript files and TypeScript checking passed.
- `npm run build` passed in an isolated source copy, including static generation
  of the new route. The initial sandboxed attempt could not fetch Google Fonts;
  the network-enabled retry succeeded. Existing warnings remain in
  `components/Gallery/Lightbox.tsx` (effect dependency) and the metadataBase setup.
- The production route returned HTTP 200. Headless Chrome checks passed at 375,
  430, 600, 768, 1024 and 1440px, in light and dark themes: expected grid columns,
  no horizontal overflow, equal logo heights and names underneath each logo.
- Rendering checks verified the exact 11-club order, 11 placeholders, eight
  name-only external links, plain names without URLs, and the optional image branch.
- Keyboard navigation showed the visible 3px focus outline. Desktop dropdown and
  mobile submenu checks confirmed the required order and the new route link;
  selecting the mobile link retained the existing menu-closing behaviour.
