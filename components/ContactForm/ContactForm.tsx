"use client"

import Input from "./Input";
import Text from "./Textarea"
import { isFeedback, isFocus, isFormValid, isFormValue } from "./interfaces_ContactForm";
import { FormEvent, useState } from "react";
import s from "./contactForm.module.css"
import { Callout, Link } from "@radix-ui/themes";

export default function ContactForm(){

    const [focus, setFocus] = useState<isFocus>({
        name: false,
        mail: false,
        subject: false,
        message: false,
    });

    
    const [formValue, setFormValue] = useState<isFormValue>({
        name: '',
        mail: '',
        subject: '',
        message: '',
    });

    
    const [formValid, setFormValid] = useState<isFormValid>({
        name: false,
        mail: false,
        subject: false,
        message: false,
    });

    
    const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<isFeedback>({
        color: '',
        content: '',
    });

    const [cooldown, setCooldown] = useState<boolean>(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    
    event.preventDefault();
    if(formValue.subject !== ""){
      return
    }
    if(cooldown){
        setFeedbackVisible(true);
        setFeedback({ color: 'red', content: 'Bitte warten Sie 10 Sekunden zwischen dem Senden.' });
    } else {
    if (feedbackVisible) {
      setFeedbackVisible(false);
    }
    setFeedbackVisible(true);
    setFeedback({ color: 'blue', content: 'Einen Augenment bitte...' });
    fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValue)
      }).then(async (res) => {
          if (res.status === 200) {
              setFeedback({color: "green", content: "Nachricht erfolgreich übermittelt. Sie haben auch eine Kopie erhalten."})
              setCooldown(true)
              setTimeout(function(){
                setCooldown(false)
                setFeedbackVisible(false);
              }, 10000)
          } else {
              const errmsg = await res.json()
              setFeedback({color: "red", content: `
                Es ist etwas schiefgegangen. Bitte überprüfen Sie insbesondere Ihre angegebene E-Mail-Adresse. Ansonsten wenden Sie sich an die im Impressum angegebene Kontaktmöglichkeit.
                Fehler: ${res.status} 
                Meldung ${errmsg.err}
              `})
          }
        })
    }}

    return(
        <form className={s.form} onSubmit={(event) => handleSubmit(event)}>
      <Input
        tag="name"
        type="text"
        content="Name *"
        pattern={undefined}
        formValue={formValue}
        focus={focus}
        formValid={formValid}
        setFormValid={setFormValid}
        setFormValue={setFormValue}
        setFocus={setFocus}
      />
      <Input
        tag="mail"
        type="email"
        content="E-Mail *"
        pattern={undefined}
        formValue={formValue}
        focus={focus}
        formValid={formValid}
        setFormValid={setFormValid}
        setFormValue={setFormValue}
        setFocus={setFocus}
      /><div style={{position: "absolute", left: "-100000px"}}>
      <Input
        tag="subject"
        type="text"
        content="Betreff"
        pattern={undefined}
        formValue={formValue}
        focus={focus}
        formValid={formValid}
        setFormValid={setFormValid}
        setFormValue={setFormValue}
        setFocus={setFocus}
      /></div>
      <Text
        tag="message"
        content="Nachricht *"
        formValue={formValue}
        focus={focus}
        setFormValue={setFormValue}
        setFocus={setFocus}
      />
      <div className={s.buttonContainer}>
          <input type="submit" className={s.button} value="Abschicken" />
      </div>
      {feedbackVisible ? (
          <Callout.Root color={feedback.color === "red" ? "red" : feedback.color === "green" ? "green" : "blue"}>
          <Callout.Text>
            {feedback.content}
          </Callout.Text>
        </Callout.Root>
      ):null}
        
    </form>
    )
}