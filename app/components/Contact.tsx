"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/lib/business";
type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
export default function Contact() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const submission = useRef<{ key: string; payload: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!ready || !siteKey || !widget.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey: siteKey,
      action: "contact",
      theme: "light",
      size: "flexible",
      callback: (value: string) => {
        setToken(value);
      },
      "expired-callback": () => setToken(""),
      "error-callback": () => {
        setToken("");
        setStatus(
          "The security check could not load. Please retry or call us.",
        );
      },
    });
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [ready]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
      consent: data.get("consent") === "on",
      website: String(data.get("website") || ""),
    };
    const nextErrors: Record<string, string> = {};
    if (payload.name.length < 2 || payload.name.length > 80)
      nextErrors.name = "Enter your name (2–80 characters).";
    if (
      !/^(?:\+91[\s-]?|91[\s-]?|0)?[6-9]\d{9}$/.test(
        payload.phone.replace(/[\s()-]/g, ""),
      )
    )
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (payload.message.length < 10 || payload.message.length > 2000)
      nextErrors.message =
        "Tell us about your requirement (10–2,000 characters).";
    if (!payload.consent)
      nextErrors.consent = "Please agree to be contacted about this inquiry.";
    setErrors(nextErrors);
    setSuccess(false);
    setStatus("");
    if (Object.keys(nextErrors).length) {
      (
        form.elements.namedItem(Object.keys(nextErrors)[0]) as HTMLElement
      )?.focus();
      return;
    }
    if (siteKey && !token) {
      setStatus("Please complete the security check before submitting.");
      return;
    }
    const serialized = JSON.stringify(payload);
    if (submission.current?.payload !== serialized)
      submission.current = { key: crypto.randomUUID(), payload: serialized };
    setBusy(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": submission.current!.key,
        },
        body: JSON.stringify({ ...payload, turnstileToken: token }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok)
        throw new Error(
          result?.error ||
            "Your inquiry could not be sent. Please try again or call us.",
        );
      setSuccess(true);
      setStatus(
        `Thank you! Your inquiry has been saved. We’ll contact you during business hours. Reference: ${result.reference}.`,
      );
      form.reset();
      submission.current = null;
    } catch (error) {
      setStatus(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "The connection timed out. Your details are still here; please try again.",
      );
    } finally {
      setBusy(false);
      setToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }
  return (
    <section id="contact" className="contact section-band">
      <div className="container">
        <span className="eyebrow">Get Started</span>
        <h2>
          Get in touch with us.
          <br />
          We’re here to assist you.
        </h2>
        <form
          ref={formRef}
          className="contact-form"
          onSubmit={submit}
          method="post"
          action="/api/contact"
          noValidate
          aria-busy={busy}
        >
          <div className="form-row">
            <div className="field">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="field-error">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                maxLength={20}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <span id="phone-error" className="field-error">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={2}
              required
              minLength={10}
              maxLength={2000}
              placeholder="Tell us about your property, location and solar requirements."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span id="message-error" className="field-error">
                {errors.message}
              </span>
            )}
          </div>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label className="consent">
            <input
              name="consent"
              type="checkbox"
              required
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              I agree to be contacted by Veena Enterprises about this inquiry.
              Read our <Link href="/privacy/">Privacy Policy</Link>.
              {errors.consent && (
                <span
                  id="consent-error"
                  className="field-error"
                  style={{ display: "block" }}
                >
                  {errors.consent}
                </span>
              )}
            </span>
          </label>
          {siteKey && (
            <>
              <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                strategy="lazyOnload"
                onReady={() => setReady(true)}
                onError={() =>
                  setStatus(
                    "The security check could not load. Please refresh or call us.",
                  )
                }
              />
              <div ref={widget} className="challenge" />
            </>
          )}
          <button className="button" type="submit" disabled={busy}>
            {busy ? "Sending…" : "Leave us a Message"}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <p
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className={`form-status ${success ? "form-success" : "form-error"}`}
          >
            {status}
          </p>
          <p className="form-help">
            We respond {business.hours}. Prefer to talk?{" "}
            <a href={`tel:${business.phone}`}>Call {business.displayPhone}</a>.
          </p>
          <noscript>
            <p>
              Please enable JavaScript to use this form, or call us or email{" "}
              <a href={`mailto:${business.email}`}>{business.email}</a>.
            </p>
          </noscript>
        </form>
      </div>
    </section>
  );
}
