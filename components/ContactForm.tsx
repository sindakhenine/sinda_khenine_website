"use client";
import {track} from "@vercel/analytics";
import {FormEvent,useEffect,useRef,useState} from "react";

type Field="name"|"email"|"subject"|"message";
type FieldErrors=Partial<Record<Field,string>>;

export function ContactForm(){
  const [state,setState]=useState<"idle"|"submitting"|"success"|"validation"|"server">("idle");
  const [message,setMessage]=useState("");
  const [fieldErrors,setFieldErrors]=useState<FieldErrors>({});
  const started=useRef(0);
  useEffect(()=>{started.current=Date.now()},[]);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setState("submitting");setMessage("");setFieldErrors({});
    const form=event.currentTarget;const data=Object.fromEntries(new FormData(form));
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,startedAt:started.current,sourcePage:"/contact"})});
      const result=await response.json();
      if(response.ok){track("contact_form_submitted");setState("success");setMessage(result.message);form.reset();started.current=Date.now()}
      else{
        const errors=(result.errors??{}) as FieldErrors;
        setFieldErrors(errors);setState(response.status===400?"validation":"server");
        setMessage(response.status===400&&Object.keys(errors).length===0?"The form could not be validated. Please reload the page and try again.":result.message);
      }
    }catch{setState("server");setMessage("Your message could not be sent. Please try again later.")}
  }
  const invalid=(field:Field)=>Boolean(fieldErrors[field]);
  return <form onSubmit={submit} noValidate>
    <label htmlFor="contact-name">Name</label><input id="contact-name" name="name" required minLength={2} maxLength={100} aria-invalid={invalid("name")} aria-describedby={invalid("name")?"contact-name-error":undefined}/>{fieldErrors.name&&<p id="contact-name-error" className="field-error">{fieldErrors.name}</p>}
    <label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" required maxLength={254} aria-invalid={invalid("email")} aria-describedby={invalid("email")?"contact-email-error":undefined}/>{fieldErrors.email&&<p id="contact-email-error" className="field-error">{fieldErrors.email}</p>}
    <label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" required minLength={2} maxLength={160} aria-invalid={invalid("subject")} aria-describedby={invalid("subject")?"contact-subject-error":undefined}/>{fieldErrors.subject&&<p id="contact-subject-error" className="field-error">{fieldErrors.subject}</p>}
    <label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={7} aria-invalid={invalid("message")} aria-describedby={invalid("message")?"contact-message-error":undefined}/>{fieldErrors.message&&<p id="contact-message-error" className="field-error">{fieldErrors.message}</p>}
    <div className="form-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" defaultValue=""/></div>
    <button className="button primary" type="submit" disabled={state==="submitting"}>{state==="submitting"?"Sending...":"Send Message"}</button><p className={`form-status ${state}`} aria-live="polite">{message}</p>
  </form>
}
