# Page headers

All subpages use `components/PageHeading/PageHeading.tsx`. The homepage Hero is separate.

## Adjusting a photograph's position

Edit only `config/headerImagePositions.ts`. Its keys are existing page routes.
For example, adjust the organisation entry:

```ts
"/ueber-uns/organisation": {
    desktop: "50% 35%",
    mobile: "55% 40%",
},
```

These are example positions, not prescribed crops. Preview the photograph before choosing them.
Both coordinates use CSS `object-position`: horizontal first, then vertical.
Desktop settings also apply on tablets; mobile overrides apply at 600px and below.
An omitted desktop value defaults to `50% 50%`. An omitted mobile value inherits desktop.
Empty entries preserve the original centred crop. New routes can be added here without editing their pages.
Positioning only moves an image along an axis where `cover` creates excess image
area. A horizontal position change may have no visible effect when the image
already matches the container width. Mobile overrides are intentional crop changes;
preview both sides of 600px when changing them.

## Layout and loading

- One continuous minimum height: `clamp(11.25rem, calc(6.25rem + 18vw), 25rem)`.
- Vertical padding: `clamp(2rem, 4vw, 4rem)` on the header, included in its minimum height.
- The header can grow for long titles; it has no fixed height or text clipping.
- White titles remain left-aligned and vertically centred, with line height 1.15.
- Font size: `clamp(1.75rem, calc(1.25rem + 2vw), 3.75rem)`; real font weights 400 and 700 are loaded in `app/layout.tsx` and headers use 700.
- Balanced text wrapping and `overflow-wrap: anywhere` keep long titles inside their available width.
- Title width is `min(100%, max(50vw, 37.5rem))`: the full available width on phones, gradually constrained on larger screens.
- The left-to-right gradient uses 58% black at the left, 46% at `max(75%, 38.5rem)`, and 8% at `max(100%, 50rem)`.
- Stops can extend beyond narrow images, keeping mobile shading strong without changing the overlay at a media-query breakpoint. Wide images brighten toward the right.
- Title width and gradient stops are coordinated with the existing centred 1200px content layout and 1rem gutters. Review them together if that layout changes.
- A simplified calculation for 46% black over pure white gives approximately 3.47:1 against white text before the shadow. This is a design check, not a substitute for checking rendered photographs and title coverage.
- Images use Next.js 15 `priority`, `fill`, and `sizes="100vw"`, with `object-fit: cover` preserving their proportions.

Approximate values with a 16px root font size:

| Viewport width | Minimum height | Title size |
| --- | --- | --- |
| 375px | 180px | 28px |
| 430px | 180px | 29px |
| 768px | 238px | 35px |
| 1024px | 284px | 40px |
| 1440px | 359px | 49px |
| 1920px | 400px | 58px |
| 2560px | 400px | 60px |

Height, typography, title width and gradient scale continuously. The only remaining
header breakpoint selects the configured mobile photograph position at 600px.
Horizontal padding continues to come from the surrounding page section.

## Page titles and CMS data

Pages fetch their Cockpit content as before and pass `pageHeader.path` to the header.
The header combines that path with `NEXT_PUBLIC_STORAGE`; missing paths use the
local placeholder. There is no CMS request inside `PageHeading`.

The title defaults to a navigation item matched against the complete pathname,
with trailing slashes removed. It is a single string, not an array of partial URL
matches. Pages outside navigation can pass `title` explicitly; Impressum and
Datenschutz use their existing `siteName` values for this purpose.

## CMS uploads and future mobile images

No Cockpit models or content are changed. Existing photographs remain in place.
For new uploads, 2560 × 1280px (2:1) is a useful single-image guideline. Good existing
2400 × 1000px images remain suitable when their composition tolerates the crop.
Prefer a high-quality JPEG or WebP source; Next.js continues to optimise delivery.

If separate mobile images become necessary, add an optional mobile asset field in Cockpit,
pass its path alongside the existing image, and render a single `<picture>` using media-specific
`<source>` elements and Next.js `getImageProps()`. Choose a mobile crop for the actual
composition: 1200 × 900px (4:3) is an option, but may require more vertical cropping
than a 2:1 source in the current shallow phone headers. Preserve the current image
as fallback. Do not render two priority images and
hide one with CSS: select the appropriate source before download, and ensure any preload uses
matching media conditions. Route-based positioning remains independent of image source selection.

See the [Next.js 15 Image reference](https://nextjs.org/docs/15/app/api-reference/components/image)
for priority loading, responsive sources, and art direction.
