# Page headers

All subpages use `components/PageHeading/PageHeading.tsx`. The homepage Hero is separate.

## Adjusting a photograph's position

Edit only `config/headerImagePositions.ts`. Its keys are existing page routes.
For example, replace the empty organisation entry with:

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

## Layout and loading

- Desktop minimum height: `clamp(400px, 22vw, 480px)`.
- Tablet, up to 1024px: `clamp(320px, 40vw, 400px)`.
- Mobile, up to 600px: `clamp(240px, 62vw, 320px)`.
- The header can grow for long titles; it has no fixed height or text clipping.
- White titles remain left-aligned and vertically centred, at 60px on desktop.
- Desktop/tablet title width is capped at 60vw to stay within the gradient's darker 80%.
- Mobile titles may use the full content width, with stronger shading across the full image.
- The weakest shading behind text is 46% black, giving approximately 3.47:1 against a pure-white image before the text shadow. The far-right desktop image remains lighter.
- Images use Next.js 15 `priority`, `fill`, and `sizes="100vw"`, with `object-fit: cover` preserving their proportions.

## CMS uploads and future mobile images

No Cockpit models or content are changed. Existing photographs remain in place.
For new uploads, 2560 × 1280px (2:1) is a useful single-image guideline. Good existing
2400 × 1000px images remain suitable when their composition tolerates the crop.
Prefer a high-quality JPEG or WebP source; Next.js continues to optimise delivery.

If separate mobile images become necessary, add an optional mobile asset field in Cockpit,
pass its path alongside the existing image, and render a single `<picture>` using media-specific
`<source>` elements and Next.js `getImageProps()`. A 1200 × 900px (4:3) mobile crop is a useful
starting point. Preserve the current image as fallback. Do not render two priority images and
hide one with CSS: select the appropriate source before download, and ensure any preload uses
matching media conditions. Route-based positioning remains independent of image source selection.

See the [Next.js 15 Image reference](https://nextjs.org/docs/15/app/api-reference/components/image)
for priority loading, responsive sources, and art direction.
