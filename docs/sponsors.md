# Sponsors page

The sponsor list is at `/sponsoring/unsere-sponsoren`. It uses the shared
`PageHeading` with the title `Unsere Sponsoren` and a local static photograph.
Sponsor data is maintained in `data/sponsors.ts`; this page has no Cockpit sponsor
integration. Existing routes, navigation and the sponsor invitation page are unchanged.

## Categories

The five main sections always appear in this order:

| Category | Heading | Presentation |
| --- | --- | --- |
| 1 | Hauptsponsoren | Existing logos, with a website link when available |
| 2 | Co-Sponsoren | Sponsor names only |
| 3 | Stichsponsoren | Sponsor names under Gewehr 300m, then Gewehr 50m |
| 4 | Natural-, Dienstleistungs- und Bargabenspender | Sponsor names only |
| 5 | Scheibensponsor | Sponsor names only; heading stays singular |

All 63 existing records are retained: 2 Hauptsponsoren, 50 Co-Sponsoren and
11 Stichsponsoren. Existing category 2 records keep their numeric category; its
heading is now `Co-Sponsoren`. Categories 4 and 5 have no assigned records and show
their empty-state messages. No sponsors have been invented or moved into them.

## Maintaining sponsors

Each entry follows `Sponsor` in `components/Sponsors/Interface_Sponsors.ts`:

| Field | Purpose |
| --- | --- |
| `id` | Unique stable identifier; keep it when editing a sponsor |
| `name` | Official display name; also logo alternative text in category 1 |
| `category` | One of the five numeric categories above |
| `website` | Optional absolute HTTP(S) website URL for any sponsor |
| `logo` | Category 1 only: approved local logo path without the `public` prefix |
| `logoWidth`, `logoHeight` | Category 1 only: original pixel dimensions |
| `discipline` | Required for category 3: `300m` or `50m`, both Gewehr |
| `stichName` | Optional source information for text sponsors; never displayed |

Order within each category or discipline follows array order. Add only confirmed
sponsors. Put approved logos in `public/sponsors/`, keeping their original brand
colours and dimensions. Do not guess a sponsor category, discipline or website.

### Stich disciplines

Assignments are explicit in the data rather than inferred during rendering:

- Gewehr 300m has nine records. Seven existing Stich names explicitly mentioned
  300m; Philippe Brühlmann and dlz Elektro GmbH were confirmed as 300m by the organiser.
- Gewehr 50m has Sportschützen Munot (existing `Reiatstich G50m`) and Georg Fischer AG
  (confirmed as 50m by the organiser).

There are no unresolved discipline assignments. Existing `stichName` values remain
unchanged for reference, but individual Stich labels are not rendered. TypeScript
requires a supported discipline for every new category 3 entry.

## Website links and sponsorType

Companies and people use identical markup. `website` is the only source of truth
for whether a sponsor name is a link. The former manually stored `person`/`company`
display flags have been removed from the static data.

`getSponsorLink()` in `components/Sponsors/sponsorLinks.ts` derives a discriminated
result: `sponsorType: "withUrl"` with a validated URL, or `sponsorType: "withoutUrl"`.
Do not add or maintain `sponsorType` in data entries. Empty, malformed, relative,
non-HTTP(S) and reserved placeholder URLs render plain text. Valid URLs retain
their existing value apart from trimming surrounding whitespace.

Name links preserve the existing underline, hover styling, accessible name,
`target="_blank"`, `rel="noopener noreferrer"` and visible keyboard focus outline.
No external-link icon is added. Hauptsponsoren retain their existing logo markup
and sizing; optional website links use the same URL validation.

## Presentation

Categories 2–5 share `SponsorCard` and the same list/grid markup. Category 3 uses
that list inside its two named discipline groups. Only discipline subtitles reuse
the previous `.stichTitle` heading style; individual cards no longer have a heading.

Existing responsive behaviour is preserved: one column below 720px, two from 720px,
and three from 1100px for text categories. Hauptsponsoren keep two desktop columns.
Categories 4 and 5 reuse the existing text-category padding and desktop column
rules. Fonts, weights, line heights, logo dimensions, card dimensions, link styling
and existing spacing values are unchanged. A new group wrapper adds a 1.5rem gap
between the two discipline lists; no global styles or page headers are changed.

## Future Cockpit integration

No production CMS data or models are changed. A future loader can map records to
`Sponsor[]` using `name`, numeric `category`, optional `website`, optional source
`stichName`, category 3 `discipline`, category 1 logo and dimensions, and an optional
display order. Keep the CMS `_id` as the stable frontend `id`.

If an external source still stores legacy `sponsorType: "person" | "company"`, its
adapter should ignore that display flag and use the website field. The derived
`getSponsorLink()` result needs no CMS migration. Validate category and discipline
assignments before rendering; do not infer disciplines from ambiguous Stich names
or silently discard records that lack an assignment.
