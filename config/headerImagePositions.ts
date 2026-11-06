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
    "/medien/bilder": {
        desktop: "50% 40%",
        mobile: "50% 50%",
    },
    "/medien/presse": {},
    "/schiessen/anmeldung": {
        desktop: "50% 60%",
        mobile: "50% 50%",
    },
    "/schiessen/auszeichnungen": {},
    "/schiessen/festzentrum": {
        desktop: "50% 65%",
        mobile: "50% 50%",
    },
    "/schiessen/programm": {},
    "/schiessen/rangeure": {},
    "/schiessen/resultate": {},
    "/schiessen/schiessanlagen": {},
    "/schiessen/schiessplan": {},
    "/sponsoring/unsere-sponsoren": {},
    "/sponsoring/sponsor-werden": {},
    "/ueber-uns/kontakt": {},
    "/ueber-uns/organisation": {
        desktop: "50% 35%",
        mobile: "50% 50%",
    },
}
