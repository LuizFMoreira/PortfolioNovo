import { useId, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";

// Chaves públicas do EmailJS (podem ficar no front-end por desenho do serviço).
const EMAILJS = {
  service: "service_wo4vk2b",
  template: "template_22mzy1l",
  publicKey: "wx5kVH1zKLNd5FhEP",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-erro`} role="alert" className="mt-1.5 text-sm text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full border-0 border-b bg-transparent py-2 text-base placeholder:text-mute/60 focus:border-accent focus:outline-none focus:ring-0 transition-colors";

export default function Contact() {
  const { t } = useLanguage();
  const form = useRef(null);
  const uid = useId();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const next = {};
    if (!data.user_name.trim()) next.user_name = t.contact.errors.name;
    if (!EMAIL_RE.test(data.user_email.trim())) next.user_email = t.contact.errors.email;
    if (!data.message.trim()) next.message = t.contact.errors.message;
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    const data = {
      user_name: fd.get("user_name") ?? "",
      user_email: fd.get("user_email") ?? "",
      message: fd.get("message") ?? "",
    };
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form.current, EMAILJS.publicKey);
      setStatus("success");
      form.current.reset();
    } catch {
      setStatus("error");
    }
  };

  const border = (key) => (errors[key] ? "border-[#b3261e]" : "border-ink/40");
  const ids = { name: `${uid}-name`, email: `${uid}-email`, message: `${uid}-message` };

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="container-page py-20 md:py-28">
      <div className="grid gap-12 border-t border-ink pt-6 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <h2 id="contato-titulo" className="font-display text-5xl leading-none tracking-tight sm:text-6xl">
            {t.contact.title}
            <span className="text-accent">.</span>
          </h2>
          <p className="mt-6 max-w-[40ch] leading-relaxed text-mute">{t.contact.description}</p>

          <p className="eyebrow mb-3 mt-10">{t.contact.elsewhere}</p>
          <ul className="space-y-1.5">
            {t.contact.channels.map((c) => (
              <li key={c.label}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-medium">
                  {c.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <form ref={form} onSubmit={onSubmit} noValidate className="space-y-8">
            <Field id={ids.name} label={t.contact.name} error={errors.user_name}>
              <input
                id={ids.name}
                name="user_name"
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.user_name}
                aria-describedby={errors.user_name ? `${ids.name}-erro` : undefined}
                className={`${inputClass} ${border("user_name")}`}
              />
            </Field>
            <Field id={ids.email} label={t.contact.email} error={errors.user_email}>
              <input
                id={ids.email}
                name="user_email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.user_email}
                aria-describedby={errors.user_email ? `${ids.email}-erro` : undefined}
                className={`${inputClass} ${border("user_email")}`}
              />
            </Field>
            <Field id={ids.message} label={t.contact.message} error={errors.message}>
              <textarea
                id={ids.message}
                name="message"
                rows={4}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${ids.message}-erro` : undefined}
                className={`${inputClass} resize-none ${border("message")}`}
              />
            </Field>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-ink px-7 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-50"
              >
                {status === "sending" ? t.contact.sending : `${t.contact.send} →`}
              </button>

              <p role="status" aria-live="polite" className={`text-sm ${status === "error" ? "text-[#b3261e]" : "text-accent"}`}>
                {status === "success" && t.contact.success}
                {status === "error" && t.contact.error}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
