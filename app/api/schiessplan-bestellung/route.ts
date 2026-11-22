import { NextRequest, NextResponse } from "next/server";
import { validateOrder } from "@/components/SchiessplanOrderForm/order";

export const runtime = "nodejs";
export const maxDuration = 30;

const recentOrders = new Map<string, number>();
const cooldownMs = 60_000;
const maxBodyBytes = 16_000;

function failure(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
        return failure("Bitte senden Sie die Bestellung über das Formular.", 415);
    }
    if (Number(request.headers.get("content-length")) > maxBodyBytes) {
        return failure("Die Anfrage ist zu gross.", 413);
    }

    let data: unknown;
    try {
        const body = await request.text();
        if (Buffer.byteLength(body, "utf8") > maxBodyBytes) return failure("Die Anfrage ist zu gross.", 413);
        data = JSON.parse(body);
    } catch {
        return failure("Die Anfrage konnte nicht gelesen werden.", 400);
    }
    const { order, errors } = validateOrder(data);
    if (!order) return NextResponse.json({
        error: "Bitte überprüfen Sie Ihre Angaben und füllen Sie alle Pflichtfelder korrekt aus.",
        fieldErrors: errors,
    }, { status: 400 });

    const password = process.env.SMTP;
    if (!password) return failure("Der Versand ist derzeit nicht verfügbar. Bitte schreiben Sie an rl@sksf27.ch.", 503);

    // Best-effort duplicate protection within this server instance, including in-flight sends.
    const now = Date.now();
    for (const [email, expires] of recentOrders) {
        if (expires <= now) recentOrders.delete(email);
    }
    const key = order.email.toLowerCase();
    if (recentOrders.has(key)) {
        return NextResponse.json({ error: "Bitte warten Sie eine Minute, bevor Sie eine weitere Bestellung senden." },
            { status: 429, headers: { "Retry-After": "60" } });
    }
    recentOrders.set(key, now + cooldownMs);

    try {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
            host: "mail.cyon.ch",
            port: 465,
            secure: true,
            auth: { user: "info@sksf27.ch", pass: password },
            connectionTimeout: 8000,
            greetingTimeout: 8000,
            socketTimeout: 10000,
        });
        const result = await transporter.sendMail({
            from: "info@sksf27.ch",
            to: "raffael.risch@shinternet.ch",
            replyTo: order.email,
            subject: `SKSF27: Schiessplan-Bestellung von ${order.firstName} ${order.name}`,
            text: [
                "Schiessplan-Bestellung",
                "",
                `Anzahl Exemplare: ${order.quantity}`,
                "",
                "Lieferadresse:",
                `${order.firstName} ${order.name}`,
                order.street,
                `${order.postalCode} ${order.city}`,
                "",
                `E-Mail: ${order.email}`,
                "",
                "Bemerkungen:",
                order.remarks || "Keine",
            ].join("\n"),
        });
        if (!Array.isArray(result.accepted) || result.accepted.length === 0) throw new Error("Recipient not accepted");
        return NextResponse.json({ success: true });
    } catch {
        recentOrders.delete(key);
        console.error("Schiessplan-Bestellung: E-Mail-Versand fehlgeschlagen.");
        return failure("Ihre Bestellung konnte nicht übermittelt werden. Bitte versuchen Sie es später erneut oder schreiben Sie an rl@sksf27.ch.", 502);
    }
}
