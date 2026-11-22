export const orderLimits = {
    name: 150,
    email: 254,
    street: 200,
    postalCode: 20,
    city: 120,
    remarks: 2000,
    quantity: 100,
} as const;

export interface SchiessplanOrder {
    name: string;
    email: string;
    street: string;
    postalCode: string;
    city: string;
    quantity: number;
    remarks: string;
}

export function parseOrder(value: unknown): SchiessplanOrder | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const data = value as Record<string, unknown>;
    if (data.website !== undefined && data.website !== "") return null;

    const fields = ["name", "email", "street", "postalCode", "city"] as const;
    for (const field of fields) {
        const text = data[field];
        if (typeof text !== "string" || !text.trim() || text.length > orderLimits[field]) return null;
        if ([...text].some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) return null;
    }
    const email = (data.email as string).trim();
    if (!/^[^\s@<>,;:"\\]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return null;
    if (typeof data.quantity !== "number" || !Number.isInteger(data.quantity)
        || data.quantity < 1 || data.quantity > orderLimits.quantity) return null;
    if (data.remarks !== undefined && (typeof data.remarks !== "string"
        || data.remarks.length > orderLimits.remarks || data.remarks.includes("\0"))) return null;

    return {
        name: (data.name as string).trim(),
        email,
        street: (data.street as string).trim(),
        postalCode: (data.postalCode as string).trim(),
        city: (data.city as string).trim(),
        quantity: data.quantity,
        remarks: typeof data.remarks === "string" ? data.remarks.trim() : "",
    };
}
