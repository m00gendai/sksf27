export interface HeaderImagePosition {
    desktop?: string
    mobile?: string
}

// Keys are current page routes, not image filenames or CMS titles.
// Empty entries use 50% 50%. Mobile inherits desktop unless overridden.
// Example: { desktop: "50% 35%", mobile: "55% 40%" }
export const headerImagePositions: Record<string, HeaderImagePosition | undefined> = {
    "/datenschutz": {},
    "/impressum": {},
    "/medien/bilder": {},
    "/medien/presse": {},
    "/schiessen/anmeldung": {},
    "/schiessen/auszeichnungen": {},
    "/schiessen/festzentrum": {},
    "/schiessen/programm": {},
    "/schiessen/rangeure": {},
    "/schiessen/resultate": {},
    "/schiessen/schiessanlagen": {},
    "/schiessen/schiessplan": {},
    "/sponsoren": {},
    "/ueber-uns/kontakt": {},
    "/ueber-uns/organisation": {},
}
