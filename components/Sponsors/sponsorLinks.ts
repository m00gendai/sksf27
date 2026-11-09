import type { SponsorLink } from "./Interface_Sponsors"

export function getSponsorLink(website?: string | null): SponsorLink {
    const href = website?.trim()
    if (!href) return { sponsorType: "withoutUrl" }

    try {
        const url = new URL(href)
        if (url.protocol !== "https:" && url.protocol !== "http:") {
            return { sponsorType: "withoutUrl" }
        }

        // Reserved example domains are documentation placeholders, not sponsor sites.
        const hostname = url.hostname.toLowerCase().replace(/\.$/, "")
        const placeholders = ["example.com", "example.org", "example.net", "localhost"]
        if (placeholders.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))
            || /\.(example|invalid|test)$/.test(hostname)) {
            return { sponsorType: "withoutUrl" }
        }

        return { sponsorType: "withUrl", website: href }
    } catch {
        return { sponsorType: "withoutUrl" }
    }
}
