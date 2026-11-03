"use client";

import { useEffect, useRef, useState } from "react";
import { trackLead } from "@/lib/track";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const TYPES = ["salon", "team-building", "sortie", "autre"];

export default function ContactForm({ t, defaultType = "salon", motif = "", compact = false }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const successRef = useRef(null);
  const f = t.form;

  // Ramène la confirmation à l'écran (le formulaire, plus haut, a disparu)
  useEffect(() => {
    if (status === "sent") successRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [status]);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setError(f.required);
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${API_URL}/contact/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, motif: motif || data.type }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackLead(data.type);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(f.error);
    }
  }

  if (status === "sent") {
    return (
      <div ref={successRef} role="status" className="rounded-sm border-l-4 border-orange bg-white p-8 text-ink">
        <p className="display text-2xl">{f.successTitle}</p>
        <p className="mt-3 text-stone">{f.successText}</p>
        <button type="button" className="link-underline mt-6 font-semibold" onClick={() => setStatus("idle")}>
          {f.another}
        </button>
      </div>
    );
  }

  const label = "mb-1.5 block text-sm font-semibold";
  const opt = <span className="font-normal text-stone"> ({f.optional})</span>;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {/* Champ piège anti-spam, invisible pour les humains */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="cf-type" className={label}>
          {f.type}
        </label>
        <select id="cf-type" name="type" defaultValue={defaultType} className="field">
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {f.types[type]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-firstName" className={label}>
          {f.firstName} {opt}
        </label>
        <input id="cf-firstName" name="firstName" autoComplete="given-name" className="field" />
      </div>
      <div>
        <label htmlFor="cf-name" className={label}>
          {f.name} *
        </label>
        <input id="cf-name" name="name" required autoComplete="family-name" className="field" />
      </div>
      {!compact && (
        <div className="sm:col-span-2">
          <label htmlFor="cf-company" className={label}>
            {f.company} {opt}
          </label>
          <input id="cf-company" name="company" autoComplete="organization" className="field" />
        </div>
      )}
      <div>
        <label htmlFor="cf-email" className={label}>
          {f.email} *
        </label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className="field" />
      </div>
      <div>
        <label htmlFor="cf-phone" className={label}>
          {f.phone} *
        </label>
        <input id="cf-phone" name="phonenumber" type="tel" required autoComplete="tel" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={label}>
          {f.message} *
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={compact ? 4 : 6}
          placeholder={f.messagePlaceholder}
          className="field resize-y"
        />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone">{f.consent}</p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary shrink-0 disabled:opacity-60">
          {status === "sending" ? f.sending : f.submit}
        </button>
      </div>
      {error && (
        <p role="alert" className="rounded-sm bg-[#fbe9e0] px-4 py-3 text-sm font-medium text-[#8a3409] sm:col-span-2">
          {error}
        </p>
      )}
    </form>
  );
}
