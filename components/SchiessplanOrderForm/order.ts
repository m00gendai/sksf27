export const orderLimits = {
    firstName: 150,
    name: 150,
    email: 254,
    street: 200,
    postalCode: 20,
    city: 120,
    remarks: 2000,
    quantity: 3,
} as const;

export interface SchiessplanOrder {
    firstName: string;
    name: string;
    email: string;
    street: string;
    postalCode: string;
    city: string;
    quantity: number;
    remarks: string;
}

export const orderFieldNames = ["firstName", "name", "email", "street", "postalCode", "city", "quantity", "remarks"] as const;
export type OrderField = typeof orderFieldNames[number];
export type OrderErrors = Partial<Record<OrderField, string>>;

export function validateOrder(value: unknown): { order: SchiessplanOrder | null; errors: OrderErrors } {
    const errors: OrderErrors = {};
    if (!value || typeof value !== "object" || Array.isArray(value)) return { order: null, errors };
    const data = value as Record<string, unknown>;
    if (data.website !== undefined && data.website !== "") return { order: null, errors };

    const required = {
        firstName: "Bitte geben Sie Ihren Vornamen ein.",
        name: "Bitte geben Sie Ihren Namen ein.",
        email: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
        street: "Bitte geben Sie Strasse und Hausnummer ein.",
        postalCode: "Bitte geben Sie Ihre Postleitzahl ein.",
        city: "Bitte geben Sie Ihren Ort ein.",
    };
    for (const field of Object.keys(required) as (keyof typeof required)[]) {
        const text = data[field];
        if (typeof text !== "string" || !text.trim()) errors[field] = required[field];
        else if (text.length > orderLimits[field]) errors[field] = `Bitte verwenden Sie höchstens ${orderLimits[field]} Zeichen.`;
        else if ([...text].some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) {
            errors[field] = "Bitte geben Sie diese Angabe in einer einzigen Zeile ein.";
        }
    }
    const email = typeof data.email === "string" ? data.email.trim() : "";
    if (!errors.email && !/^[^\s@<>,;:"\\]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }
    if (typeof data.quantity !== "number" || !Number.isInteger(data.quantity)
        || data.quantity < 1 || data.quantity > orderLimits.quantity) {
        errors.quantity = `Bitte geben Sie eine ganze Zahl zwischen 1 und ${orderLimits.quantity} ein.`;
    }
    if (data.remarks !== undefined && (typeof data.remarks !== "string"
        || data.remarks.length > orderLimits.remarks || data.remarks.includes("\0"))) {
        errors.remarks = `Bitte verwenden Sie höchstens ${orderLimits.remarks} Zeichen und keine ungültigen Sonderzeichen.`;
    }
    if (Object.keys(errors).length) return { order: null, errors };

    return { order: {
        firstName: (data.firstName as string).trim(),
        name: (data.name as string).trim(),
        email,
        street: (data.street as string).trim(),
        postalCode: (data.postalCode as string).trim(),
        city: (data.city as string).trim(),
        quantity: data.quantity as number,
        remarks: typeof data.remarks === "string" ? data.remarks.trim() : "",
    }, errors };
}

export function parseOrder(value: unknown): SchiessplanOrder | null {
    return validateOrder(value).order;
}
