import { NextRequest, NextResponse } from "next/server"
import he from "he"
import { isFormValue } from "@/components/ContactForm/interfaces_ContactForm"

export async function POST(req: NextRequest) {

  let nodemailer:any = require('nodemailer')
  
  const data: isFormValue = await req.json()

  if (!process.env.SMTP) {
    console.error("SMTP env variable is not set")
    return NextResponse.json({ err: "Server-Konfiguration fehlt" }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: "mail.cyon.ch",
    port: 465,
    secure: true,
    auth: { user: "info@sksf27.ch", pass: process.env.SMTP },
  })

  const mailData = {
    from: "info@sksf27.ch",   // must match the authenticated account
    replyTo: data.mail,       // the visitor's address goes here
    to: "info@sksf27.ch",
    cc: data.mail,
    subject: `SKSF27: Nachricht von ${data.name}`,
    text: data.message,
    html: `<div>${he.escape(data.message).replace(/\n/g, "<br>")}</div>`,
  }

  try {
    const info = await transporter.sendMail(mailData)
    console.log("accepted:", info.accepted, "rejected:", info.rejected, info.response)
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("MAIL ERROR:", err)
    return NextResponse.json({ err: err.message }, { status: 500 })
  }
}