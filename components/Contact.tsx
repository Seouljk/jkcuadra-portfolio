"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { site } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type FieldName = "name" | "email" | "subject" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type SendState = "idle" | "sending" | "sent";

const EMPTY: Values = { name: "", email: "", subject: "", message: "" };
const FIELDS: FieldName[] = ["name", "email", "subject", "message"];
const SEND_LABEL: Record<SendState, string> = { idle: "Send Message", sending: "Sending…", sent: "Sent ✓" };

function validate(values: Values): Errors {
  const errors: Errors = {};
  for (const field of FIELDS) {
    if (!values[field].trim()) errors[field] = "Required";
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [send, setSend] = useState<SendState>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [toast, setToast] = useState(0);

  // The confirmation lingers longer than the design's 2.6s demo loop, so a real sender can read it.
  useEffect(() => {
    if (send !== "sent") return;
    const timer = window.setTimeout(() => setSend("idle"), 8000);
    return () => window.clearTimeout(timer);
  }, [send]);

  // Each copy restarts the toast's 1.9s timer.
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(0), 1900);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const copyEmail = () => {
    navigator.clipboard?.writeText(site.email).catch(() => {});
    setToast((count) => count + 1);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as FieldName;
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (send === "sending") return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setFormError(null);
    setSend("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? "Could not send the message. Please email me directly.");
      }
      setValues(EMPTY);
      setSend("sent");
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Could not send the message.");
      setSend("idle");
    }
  };

  return (
    <>
      <section id="contact" className="jk-section">
        <div className="jk-wrap">
          <SectionHeader index="05" label="Contact" />
          <div className="jk-contact__grid">
            <div className="jk-contact__left">
              <h3 className="jk-stmt">
                Let&apos;s build something that <span className="jk-signal">stays live.</span>
              </h3>
              <button type="button" className="jk-email" onClick={copyEmail} aria-describedby="copy-email-hint">
                {site.email}
              </button>
              <span id="copy-email-hint" className="jk-hint">
                Click to copy
              </span>
              <div className="jk-rule" />
              <div className="jk-details">
                <div className="jk-detail">
                  <span className="jk-detail__k">TEL</span>
                  <a href={site.phone.href} className="jk-detail__v">
                    {site.phone.label}
                  </a>
                </div>
                <div className="jk-detail">
                  <span className="jk-detail__k">LOC</span>
                  <span className="jk-detail__v jk-detail__v--muted">{site.location} (GMT+8)</span>
                </div>
                <div className="jk-detail">
                  <span className="jk-detail__k">NET</span>
                  <span className="jk-detail__links">
                    <a href={site.github.href} target="_blank" rel="noreferrer" className="jk-detail__v">
                      {site.github.label}
                    </a>
                    <a href={site.linkedin.href} target="_blank" rel="noreferrer" className="jk-detail__v">
                      {site.linkedin.label}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <form className="jk-form" onSubmit={onSubmit} noValidate aria-label="Send a message">
              <div className="jk-form__head">
                <span className="jk-label">Send a message</span>
                <span className="jk-form__count">FORM · 04 FIELDS</span>
              </div>
              <div className="jk-form__row">
                <Field
                  name="name"
                  label="Name"
                  placeholder="John Doe"
                  autoComplete="name"
                  value={values.name}
                  error={errors.name}
                  onChange={onChange}
                />
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={values.email}
                  error={errors.email}
                  onChange={onChange}
                />
              </div>
              <Field
                name="subject"
                label="Subject"
                placeholder="Project enquiry"
                value={values.subject}
                error={errors.subject}
                onChange={onChange}
              />
              <Field
                name="message"
                label="Message"
                placeholder="What are we building?"
                multiline
                value={values.message}
                error={errors.message}
                onChange={onChange}
              />
              <div aria-hidden="true" className="jk-hp">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>
              <div className="jk-form__actions">
                <button type="submit" className="jk-btn jk-btn--primary" disabled={send === "sending"}>
                  {SEND_LABEL[send]}
                  <span aria-hidden="true" className="jk-arrow jk-arrow--x">
                    →
                  </span>
                </button>
                <span role="status" aria-live="polite">
                  {send === "sending" && <span className="jk-form__status">Transmitting…</span>}
                  {send === "sent" && (
                    <span className="jk-form__status jk-form__status--ok">
                      <span className="jk-dot" />
                      Message received — reply within 24h
                    </span>
                  )}
                </span>
              </div>
              {formError && (
                <span role="alert" className="jk-form__fail">
                  {formError}
                </span>
              )}
              <span className="jk-form__note">All fields required</span>
            </form>
          </div>
        </div>
      </section>

      {toast > 0 && (
        <div className="jk-toast-wrap">
          <div role="status" className="jk-toast">
            <span className="jk-dot" />
            Copied — {site.email}
          </div>
        </div>
      )}
    </>
  );
}

type FieldProps = {
  name: FieldName;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
};

function Field({ name, label, placeholder, value, error, onChange, type = "text", autoComplete, multiline }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    placeholder,
    value,
    onChange,
    required: true,
    className: "jk-field__input",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className="jk-field">
      <label htmlFor={id} className="jk-field__label">
        {label}
      </label>
      <div className="jk-field__box">
        {multiline ? <textarea rows={4} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
        <span aria-hidden="true" className="jk-field__line" />
      </div>
      {error && (
        <span id={errorId} className="jk-field__error">
          {error}
        </span>
      )}
    </div>
  );
}
