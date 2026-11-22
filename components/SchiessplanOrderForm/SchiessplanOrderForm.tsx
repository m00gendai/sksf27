"use client";

import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button, Callout } from "@radix-ui/themes";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoHourglassOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { orderLimits, parseOrder } from "./order";
import formStyles from "../ContactForm/contactForm.module.css";
import s from "./SchiessplanOrderForm.module.css";

const fields = [
    { name: "name", label: "Name", autoComplete: "name" },
    { name: "email", label: "E-Mail", autoComplete: "email" },
    { name: "street", label: "Strasse und Hausnummer", autoComplete: "address-line1" },
    { name: "postalCode", label: "Postleitzahl", autoComplete: "postal-code" },
    { name: "city", label: "Ort", autoComplete: "address-level2" },
    { name: "quantity", label: "Anzahl Exemplare (1–100)", autoComplete: "off" },
] as const;

export default function SchiessplanOrderForm() {
    const id = useId();
    const submitting = useRef(false);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (submitting.current || status === "success") return;
        const form = new FormData(event.currentTarget);
        const values = Object.fromEntries(form.entries());
        const order = parseOrder({ ...values, quantity: Number(form.get("quantity")) });
        if (!order) {
            setStatus("error");
            setMessage("Bitte überprüfen Sie Ihre Angaben und füllen Sie alle Pflichtfelder aus.");
            return;
        }

        submitting.current = true;
        setStatus("sending");
        setMessage("Ihre Bestellung wird übermittelt …");
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 35_000);
        try {
            const response = await fetch("/api/schiessplan-bestellung", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...order, website: values.website }),
                signal: controller.signal,
            });
            const result = await response.json();
            if (!response.ok || result.success !== true) {
                setStatus("error");
                setMessage(typeof result.error === "string" ? result.error
                    : "Ihre Bestellung konnte nicht übermittelt werden. Bitte wenden Sie sich an rl@sksf27.ch.");
                return;
            }
            setStatus("success");
            setMessage("Ihre Schiessplan-Bestellung wurde erfolgreich übermittelt. Vielen Dank!");
        } catch {
            setStatus("error");
            setMessage("Der Versand konnte nicht bestätigt werden. Bitte prüfen Sie Ihre Verbindung oder kontaktieren Sie rl@sksf27.ch.");
        } finally {
            window.clearTimeout(timeout);
            submitting.current = false;
        }
    }

    return (
        <div className={s.container}>
            <h2 id={`${id}-heading`}>Schiessplan bestellen</h2>
            <p>Bestellen Sie das gedruckte Schiessplan-Heft über dieses Formular.</p>
            <p id={`${id}-hint`}>Alle mit * markierten Felder sind Pflichtfelder.</p>
            <form className={`${formStyles.form} ${s.form}`} onSubmit={handleSubmit}
                aria-labelledby={`${id}-heading`} aria-describedby={`${id}-hint`}
                aria-busy={status === "sending"}
                onChange={() => { if (status === "success") setStatus("idle"); }}>
                <fieldset className={s.fields} disabled={status === "sending"}>
                    <legend className={s.visuallyHidden}>Angaben zur Bestellung</legend>
                    {fields.map(field => (
                        <div key={field.name} className={`${formStyles.containerInput} ${s.field}`}>
                            <label htmlFor={`${id}-${field.name}`}>{field.label} *</label>
                            <input id={`${id}-${field.name}`} name={field.name} required
                                type={field.name === "email" ? "email" : field.name === "quantity" ? "number" : "text"}
                                autoComplete={field.autoComplete}
                                maxLength={field.name === "quantity" ? undefined : orderLimits[field.name]}
                                min={field.name === "quantity" ? 1 : undefined}
                                max={field.name === "quantity" ? orderLimits.quantity : undefined}
                                step={field.name === "quantity" ? 1 : undefined}
                                defaultValue={field.name === "quantity" ? 1 : undefined} />
                        </div>
                    ))}
                    <div className={`${formStyles.containerTextarea} ${s.field} ${s.remarks}`}>
                        <label htmlFor={`${id}-remarks`}>Bemerkungen (optional)</label>
                        <textarea id={`${id}-remarks`} name="remarks" maxLength={orderLimits.remarks} rows={4} />
                    </div>
                    <div className={s.visuallyHidden} aria-hidden="true">
                        <label htmlFor={`${id}-website`}>Website</label>
                        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>
                </fieldset>
                <Button type="submit" size="3" className={`${formStyles.button} ${s.submit}`}
                    disabled={status === "sending" || status === "success"}>
                    <IoPaperPlaneOutline aria-hidden="true" />
                    {status === "sending" ? "Wird gesendet …" : "Bestellung senden"}
                </Button>
                <div aria-live="polite" aria-atomic="true">
                    {status !== "idle" && <Callout.Root className={s.feedback}
                        color={status === "error" ? "red" : status === "success" ? "green" : "blue"}>
                        <Callout.Icon>
                            {status === "error" ? <IoCloseCircleOutline aria-hidden="true" />
                                : status === "success" ? <IoCheckmarkCircleOutline aria-hidden="true" />
                                    : <IoHourglassOutline aria-hidden="true" />}
                        </Callout.Icon>
                        <Callout.Text>{message}</Callout.Text>
                    </Callout.Root>}
                </div>
            </form>
            <p>Bei Fragen erreichen Sie uns unter <a href="mailto:info@sksf27.ch">info@sksf27.ch</a>.</p>
        </div>
    );
}
