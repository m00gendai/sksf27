export interface HeaderImagePosition {
    desktop?: string
    mobile?: string
}

// Keys are current page routes, not image filenames or CMS titles.
// Empty entries use 50% 50%. Mobile inherits desktop unless overridden.
// Example: { desktop: "50% 35%", mobile: "55% 40%" }
export const headerImagePositions: Record<string, HeaderImagePosition | undefined> = {
    "/datenschutz": {
        desktop: "50% 35%",
        mobile: "50% 50%",
    },
    "/impressum": {},
    "/medien/bilder": {
        desktop: "50% 40%",
        mobile: "50% 50%",
    },
    "/medien/presse": {
        desktop: "50% 50%",
        mobile: "50% 50%",
    },
    "/schiessen/anmeldung": {
        desktop: "50% 60%",
        mobile: "50% 50%",
    },
    "/schiessen/auszeichnungen": {
        desktop: "50% 45%",
        mobile: "50% 50%",
    },
    "/schiessen/festzentrum": {
        desktop: "50% 65%",
        mobile: "50% 50%",
    },
    "/schiessen/programm": {
        desktop: "50% 40%",
        mobile: "50% 50%",
    },
    "/schiessen/rangeure": {},
    "/schiessen/resultate": {
        desktop: "50% 30%",
        mobile: "50% 50%",
    },
    "/schiessen/schiessanlagen": {
        desktop: "50% 45%",
        mobile: "50% 50%",
    },
    "/schiessen/schiessplan": {
        desktop: "50% 60%",
        mobile: "50% 50%",
    },
    "/sponsoring/unsere-sponsoren": {
        desktop: "50% 60%",
        mobile: "50% 50%",
    },
    "/sponsoring/sponsor-werden": {},
    "/ueber-uns/kontakt": {},
    "/ueber-uns/organisation": {
        desktop: "50% 35%",
        mobile: "50% 50%",
    },
    "/ueber-uns/traegervereine": {
        desktop: "50% 38%",
        mobile: "50% 50%",
    },
}
