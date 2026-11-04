# Sponsors page

The sponsor list is at `/sponsoring/unsere-sponsoren`. Its shared page header receives the local static
photograph `public/P2050071_2560x1280.jpg` and the title `Unsere Sponsoren`.
No sponsor or header content is fetched from Cockpit by this page.

`/sponsoring/sponsor-werden` uses the same header photograph and shared layout styles,
with static invitation text and the email link `mailto:pb@sksf27.ch`.
The shared navigation configuration lists these two pages under `Sponsoring` in that
order for desktop and mobile. The previous `/sponsoren` route permanently redirects
(HTTP 308) to `/sponsoring/unsere-sponsoren` via `next.config.mjs`.

## Maintaining sponsors

Edit `data/sponsors.ts`. Add only confirmed sponsors to the `sponsors` array.
Each entry follows `Sponsor` in `components/Sponsors/Interface_Sponsors.ts`:

| Field | Purpose |
| --- | --- |
| `id` | Unique stable identifier; keep it when editing the sponsor |
| `name` | Official sponsor name; also the logo alternative text in category 1 |
| `category` | `1` Hauptsponsoren, `2` Sponsoren, `3` Stichsponsoren |
| `logo` | Category 1 only: local path such as `/sponsors/company-logo.webp` |
| `logoWidth`, `logoHeight` | Category 1 only: original image dimensions in pixels |
| `stichName` | Name of the sponsored Stich, displayed as a heading; optional in category 2, required in category 3 |
| `sponsorType` | Categories 2 and 3: `person` or `company` |
| `website` | Complete HTTPS website URL; required for companies in categories 2 and 3, omitted for people, optional in category 1 |

Put an approved logo in `public/sponsors/`, then enter its path without the `public`
prefix. Transparent PNG, SVG, or WebP logos work; keep the original brand colours.
The frontend preserves the logo proportions and does not enlarge small originals.
Website links open a new tab and use `noopener noreferrer`; without a URL the card
is not interactive. Do not enter invented sponsor names or website URLs.

Order within a category follows array order. Reorder entries to change it, delete an
entry to remove a sponsor. When changing its category, supply the fields required
by the new category.
Category headings and empty-state text are also maintained in this data file.

### Text sponsors (categories 2 and 3)

Categories 2 and 3 display the Stich name above the sponsor name, without a logo.
Category 2 may omit `stichName` when no Stich is specified; only the sponsor name
then appears. A person is plain text; a company name is a website link opening in a
new tab. Example entries below are illustrative only and are not included in the
published sponsor data. Use `category: 2` for a sponsor in the second category:

```ts
{
    id: "example-person",
    name: "Erika Muster",
    category: 3,
    stichName: "Beispielstich A",
    sponsorType: "person",
},
{
    id: "example-company",
    name: "Musterfirma AG",
    category: 3,
    stichName: "Beispielstich B",
    sponsorType: "company",
    website: "https://example.com",
},
```

The page always renders the entries in `sponsors`, both locally and in production.
Categories without entries display their configured empty-state message.

## Layout

Desktop grids have 2 / 3 / 3 columns, tablet grids 2 / 2 / 2, and mobile grids 1 / 1 / 1.
The main tier has larger logo areas and more padding. Cards use transparent surfaces
and the existing site font. Category 1 uses `object-fit: contain`; logos are
not recoloured or cropped. Categories 2 and 3 give text more room, wrap long names, and
underlines company links. All links have a visible keyboard focus outline.

## Future Cockpit model

A future `sponsors` collection could contain `name` (text), `category` (required select
with values 1, 2, 3), `logo` (asset for category 1), `stichName` (optional for category 2,
required for category 3), `sponsorType` (required for categories 2 and 3),
`website` (required for companies in categories 2 and 3,
optional for logo sponsors), and `displayOrder` (optional number). Use Cockpit's `_id`
as the frontend `id`, and read logo asset dimensions into `logoWidth` / `logoHeight`.

Fetch published records in the server page or a server-only loader. Validate required
fields, category values and HTTP(S) website URLs, sort by `displayOrder` with a stable
fallback, and map them to the existing `Sponsor[]` contract. Pass that array to
`Sponsors`; the presentation components do not need redesigning. If logo assets move
to CMS storage, resolve their paths there and use the existing remote image allowlist.
No CMS models or production data have been modified in this implementation.
