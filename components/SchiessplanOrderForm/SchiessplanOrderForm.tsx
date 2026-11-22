"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button, Callout } from "@radix-ui/themes";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoHourglassOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { orderFieldNames, orderLimits, validateOrder } from "./order";
import type { OrderErrors, OrderField } from "./order";
import s from "./SchiessplanOrderForm.module.css";

const fields = [
    { name: "firstName", label: "Vorname", autoComplete: "given-name" },
    { name: "name", label: "Name", autoComplete: "family-name" },
    { name: "email", label: "E-Mail", autoComplete: "email" },
    { name: "street", label: "Strasse und Hausnummer", autoComplete: "address-line1" },
    { name: "postalCode", label: "Postleitzahl", autoComplete: "postal-code" },
    { name: "city", label: "Ort", autoComplete: "address-level2" },
    { name: "quantity", label: "Anzahl Exemplare (1–100)", autoComplete: "off" },
] as const;

function readForm(form: HTMLFormElement): Record<string, unknown> & { quantity: number } {
    const values = Object.fromEntries(new FormData(form).entries());
    return { ...values, quantity: Number(values.quantity) };
}

export default function SchiessplanOrderForm() {
    const id = useId();
    const formRef = useRef<HTMLFormElement>(null);
    const confirmationRef = useRef<HTMLDivElement>(null);
    const submitting = useRef(false);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState<OrderErrors>({});
    const [cooldownUntil, setCooldownUntil] = useState(0);
    const [cooldownSeconds, setCooldownSeconds] = useState(0);

    useEffect(() => {
        if (!cooldownUntil) return;
        const update = () => setCooldownSeconds(Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000)));
        update();
        const timer = window.setInterval(() => {
            update();
            if (Date.now() >= cooldownUntil) window.clearInterval(timer);
        }, 1000);
        return () => window.clearInterval(timer);
    }, [cooldownUntil]);

    useEffect(() => {
        if (status === "success") confirmationRef.current?.focus();
    }, [status]);

    function focusFirstError(errors: OrderErrors) {
        const field = orderFieldNames.find(name => errors[name]);
        if (!field) return;
        window.requestAnimationFrame(() => {
            const input = formRef.current?.elements.namedItem(field);
            if (input instanceof HTMLElement) input.focus();
        });
    }

    function updateFieldError(field: OrderField) {
        if (submitting.current || !formRef.current) return;
        const errors = validateOrder(readForm(formRef.current)).errors;
        setFieldErrors(previous => {
            const next = { ...previous };
            if (errors[field]) next[field] = errors[field];
            else delete next[field];
            return next;
        });
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (submitting.current || status === "success" || Date.now() < cooldownUntil) return;
        const form = event.currentTarget;
        const values = readForm(form);
        const { order, errors } = validateOrder(values);
        setFieldErrors(errors);
        if (!order) {
            setStatus("error");
            setMessage("Bitte überprüfen Sie die markierten Felder.");
            focusFirstError(errors);
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
                const serverErrors: OrderErrors = {};
                for (const field of orderFieldNames) {
                    if (typeof result.fieldErrors?.[field] === "string") serverErrors[field] = result.fieldErrors[field];
                }
                setFieldErrors(serverErrors);
                setStatus("error");
                setMessage(typeof result.error === "string" ? result.error
                    : "Ihre Bestellung konnte nicht übermittelt werden. Bitte wenden Sie sich an rl@sksf27.ch.");
                if (response.status === 429) {
                    const seconds = Number(response.headers.get("Retry-After")) || 60;
                    setCooldownSeconds(seconds);
                    setCooldownUntil(Date.now() + seconds * 1000);
                }
                focusFirstError(serverErrors);
                return;
            }
            form.reset();
            setFieldErrors({});
            setCooldownSeconds(60);
            setCooldownUntil(Date.now() + 60_000);
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

    function startNewOrder() {
        if (Date.now() < cooldownUntil) return;
        setStatus("idle");
        setMessage("");
        setFieldErrors({});
        window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('[name="firstName"]')?.focus());
    }

    return (
        <div className={s.container}>
            <h2 id={`${id}-heading`}>Schiessplan bestellen</h2>
            <p>Bestellen Sie das gedruckte Schiessplan-Heft über dieses Formular.</p>
            {status === "success" ? (
                <div className={s.confirmation} ref={confirmationRef} tabIndex={-1}
                    role="region" aria-label="Bestellung übermittelt">
                    <Callout.Root color="green" className={s.feedback}>
                        <Callout.Icon><IoCheckmarkCircleOutline aria-hidden="true" /></Callout.Icon>
                        <Callout.Text>{message}</Callout.Text>
                    </Callout.Root>
                    {cooldownSeconds > 0 && <p>Eine weitere Bestellung ist in {cooldownSeconds} Sekunden möglich.</p>}
                    <Button type="button" size="3" className={s.submit} onClick={startNewOrder} disabled={cooldownSeconds > 0}>
                        Weitere Bestellung
                    </Button>
                </div>
            ) : (
                <>
                    <p id={`${id}-hint`}>Alle mit * markierten Felder sind Pflichtfelder.</p>
                    <form ref={formRef} className={s.form} onSubmit={handleSubmit} noValidate
                        aria-labelledby={`${id}-heading`} aria-describedby={`${id}-hint`} aria-busy={status === "sending"}>
                        <fieldset className={s.fields} disabled={status === "sending"}>
                            <legend className={s.visuallyHidden}>Angaben zur Bestellung</legend>
                            {fields.map(field => (
                                <div key={field.name} className={`${s.field}${field.name === "street" || field.name === "email" ? ` ${s.fullWidth}` : ""}`}>
                                    <label htmlFor={`${id}-${field.name}`}>{field.label} *</label>
                                    <input id={`${id}-${field.name}`} name={field.name} required
                                        type={field.name === "email" ? "email" : field.name === "quantity" ? "number" : "text"}
                                        autoComplete={field.autoComplete}
                                        maxLength={field.name === "quantity" ? undefined : orderLimits[field.name]}
                                        min={field.name === "quantity" ? 1 : undefined}
                                        max={field.name === "quantity" ? orderLimits.quantity : undefined}
                                        step={field.name === "quantity" ? 1 : undefined}
                                        defaultValue={field.name === "quantity" ? 1 : undefined}
                                        aria-invalid={fieldErrors[field.name] ? true : undefined}
                                        aria-describedby={fieldErrors[field.name] ? `${id}-${field.name}-error` : undefined}
                                        onBlur={() => updateFieldError(field.name)}
                                        onChange={() => { if (fieldErrors[field.name]) updateFieldError(field.name); }} />
                                    {fieldErrors[field.name] && <span id={`${id}-${field.name}-error`} className={s.fieldError}>{fieldErrors[field.name]}</span>}
                                </div>
                            ))}
                            <div className={`${s.field} ${s.fullWidth}`}>
                                <label htmlFor={`${id}-remarks`}>Bemerkungen (optional)</label>
                                <textarea id={`${id}-remarks`} name="remarks" maxLength={orderLimits.remarks} rows={4}
                                    aria-invalid={fieldErrors.remarks ? true : undefined}
                                    aria-describedby={fieldErrors.remarks ? `${id}-remarks-error` : undefined}
                                    onBlur={() => updateFieldError("remarks")}
                                    onChange={() => { if (fieldErrors.remarks) updateFieldError("remarks"); }} />
                                {fieldErrors.remarks && <span id={`${id}-remarks-error`} className={s.fieldError}>{fieldErrors.remarks}</span>}
                            </div>
                            <div className={s.visuallyHidden} aria-hidden="true">
                                <label htmlFor={`${id}-website`}>Website</label>
                                <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
                            </div>
                        </fieldset>
                        <Button type="submit" size="3" className={s.submit} disabled={status === "sending" || cooldownSeconds > 0}>
                            <IoPaperPlaneOutline aria-hidden="true" />
                            {status === "sending" ? "Wird gesendet …" : "Bestellung senden"}
                        </Button>
                        {cooldownSeconds > 0 && <p>Bitte warten Sie noch {cooldownSeconds} Sekunden bis zur nächsten Bestellung.</p>}
                        <div aria-live="polite" aria-atomic="true">
                            {status !== "idle" && <Callout.Root className={s.feedback} color={status === "error" ? "red" : "blue"}>
                                <Callout.Icon>{status === "error" ? <IoCloseCircleOutline aria-hidden="true" /> : <IoHourglassOutline aria-hidden="true" />}</Callout.Icon>
                                <Callout.Text>{message}</Callout.Text>
                            </Callout.Root>}
                        </div>
                    </form>
                </>
            )}
            <p>Bei Fragen erreichen Sie uns unter <a href="mailto:info@sksf27.ch">info@sksf27.ch</a>.</p>
        </div>
    );
}
