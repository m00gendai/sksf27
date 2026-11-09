# Document download cards

`components/DocumentGallery/DocumentGallery.tsx` renders document attachments for
all pages using `PageContent`. These documents come from Cockpit section assets
filtered by `type === "document"`. No CMS model or content changes are required.

The renderer keeps the existing document URLs (`NEXT_PUBLIC_STORAGE` plus the
asset `path`) and opens them in a new tab with `noopener noreferrer`. It does not
force a download. The trailing external-link icon reflects this behaviour, and
screen-reader text announces the new tab. Icons are decorative.

## Appearance

Text-only document cards use the existing yellow `--mainColor` background and black
`--titleOnMainColor` text. The title uses Titillium Web 600, loaded alongside the
existing 400 and 700 weights. Smaller metadata appears underneath. Hover adds a
subtle darker yellow and border; keyboard focus retains a theme-aware outline.
All card text has a scoped no-underline rule, including hover, focus and visited
states. The Helfer email link and its shared `actionLink` styles are unchanged.

The grid fits one column on phones, two on typical tablets and three inside the
desktop content width. Cards have a 20rem preferred minimum and a 28rem maximum;
the minimum can shrink to the available width. Titles wrap instead of truncating,
and file icons stay aligned in their own grid columns. Cards in the same row stretch
to a consistent height. No portrait aspect ratio or fixed text height is used.

## Explicit cover images

Documents with an explicit cover keep the original portrait preview, shadow and
neutral background. The image uses `object-fit: contain`; no visible title, file
metadata or yellow-card icons are added. The link has an accessible document name
and a keyboard focus outline. Its URL and new-tab behaviour remain unchanged.

Pass a title-to-image mapping through `PageContent`:

```tsx
<PageContent
    siteContent={siteContent}
    documentCovers={{
        "SKSF27 Kurzschiessplan": "/SKSF27_Kurzschiessplan_Cover.png",
    }}
/>
```

The keys must match the Cockpit document titles exactly. `PageContent` forwards the
mapping as `covers` to `DocumentGallery`, which can also receive that prop directly.
The Schiessplan mapping and its original PNG have been restored from repository
history. Cover-only galleries keep the previous 200px minimum grid tracks and
1:1.414 portrait ratio. Mixed galleries preserve document order and keep yellow
cards compact beside portrait previews. Documents without a matching cover use
the yellow metadata cards. No CMS changes or automatic cover generation are used.

## Metadata

- Name: Cockpit asset `title`.
- URL: the existing storage prefix plus `path`.
- Type: a recognised asset `mime`, with the extension in `path` as fallback. Query
  strings and fragments are ignored; percent-encoded filenames are supported.
- Size: asset `size`, in bytes. No document or HEAD requests are made for metadata.

`documentMetadata.ts` exports `getDocumentType(mime, path)` and
`formatFileSize(bytes)`. Sizes use 1024-based units labelled B, KB, MB, GB and TB,
with whole bytes/kilobytes and up to one decimal for larger units. Examples:
`850` → `850 B`, `245000` → `239 KB`, `2500000` → `2.4 MB`.

Missing, negative or invalid sizes are omitted. A valid zero size displays `0 B`.
Unknown types use a generic file icon; a filename extension is shown when present,
otherwise the type label is omitted. There is no guessed type or size. If neither
type nor size is available, the card shows its title and icons without a metadata row.

To reuse the component for another page, pass the same `Medium[]` asset data to
`DocumentGallery`. Future CMS/static adapters should supply known metadata instead
of downloading each file to measure it. Such downloads would add network traffic
and delay rendering, particularly on mobile connections.
