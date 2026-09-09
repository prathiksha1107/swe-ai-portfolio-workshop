import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/profile";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const reduceMotion = useReducedMotion();

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    try {
      const response = await fetch(profile.contactFormEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="shell contact__inner">
        <p className="eyebrow" data-motion-item>Let’s connect</p>
        <h2 id="contact-title" data-motion-item>Have a meaningful problem to solve?</h2>
        <p data-motion-item>I’m interested in thoughtful conversations about applied AI, scalable software, and engineering platforms.</p>
        <form className="contact-form" action={profile.contactFormEndpoint} method="POST" onSubmit={submitForm} data-motion-item>
          <label htmlFor="voyage-name">Name<input id="voyage-name" name="name" type="text" autoComplete="name" required /></label>
          <label htmlFor="voyage-email">Email<input id="voyage-email" name="email" type="email" autoComplete="email" spellCheck={false} required /></label>
          <label htmlFor="voyage-message">Message<textarea id="voyage-message" name="message" required /></label>
          <label className="form-honeypot" aria-hidden="true">Leave this field empty<input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" /></label>
          <input name="_subject" type="hidden" value="Portfolio inquiry" />
          <motion.button className="button button--primary" type="submit" disabled={status === "sending"} whileTap={reduceMotion ? undefined : { scale: 0.97 }}>
            <span className="button__label">{status === "sending" ? "Sending…" : "Send message"}</span><span className="button__icon" aria-hidden="true">↗</span>
          </motion.button>
          <div className="form-status-slot">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" || status === "error" ? (
                <motion.p key={status} className="form-status" role="status" aria-live="polite" data-state={status} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -4 }} transition={{ duration: 0.24 }}>
                  {status === "success" ? "Message sent. Thank you — I’ll be in touch." : "Message could not be sent. Please try again or use the email link below."}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </form>
        <div className="contact__links" data-motion-item><a className="text-link" href={`mailto:${profile.email}`}>Email</a><a className="text-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a className="text-link" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a></div>
        <p className="contact__location" data-motion-item>Based in {profile.location}</p>
      </div>
    </section>
  );
}
