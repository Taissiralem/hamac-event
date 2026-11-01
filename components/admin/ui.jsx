"use client";

import { createContext, useCallback, useContext, useId, useRef, useState } from "react";
import { uploadImage } from "@/lib/admin/api";

// ------------------------------------------------------------------ Notifications
const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef();
  const show = useCallback((message, type = "success") => {
    clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = setTimeout(() => setToast(null), type === "error" ? 6000 : 3000);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed bottom-6 right-6 z-[100]">
        {toast && (
          <p
            role={toast.type === "error" ? "alert" : "status"}
            className={`pointer-events-auto max-w-sm rounded-lg px-5 py-3.5 text-sm font-medium shadow-lg ${
              toast.type === "error" ? "bg-[#8a3409] text-white" : "bg-ink text-paper"
            }`}
          >
            {toast.message}
          </p>
        )}
      </div>
    </ToastContext.Provider>
  );
}

// ------------------------------------------------------------------ Mise en page
export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold [font-variation-settings:'wdth'_112]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-stone">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, help, children, className = "" }) {
  return (
    <section className={`rounded-xl border border-ink/10 bg-white p-5 sm:p-7 ${className}`}>
      {title && <h2 className="text-lg font-bold">{title}</h2>}
      {help && <p className="mt-1 text-sm text-stone">{help}</p>}
      <div className={title || help ? "mt-5" : ""}>{children}</div>
    </section>
  );
}

export function Button({ variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-ink text-paper hover:bg-ink-soft",
    accent: "bg-orange text-night hover:bg-[#f08a45]",
    ghost: "border border-ink/20 text-ink hover:border-ink",
    danger: "border border-[#c0392b]/40 text-[#a5281b] hover:bg-[#a5281b] hover:text-white",
  };
  return (
    <button
      type="button"
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

// ------------------------------------------------------------------ Champs
const inputCls =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-[0.95rem] text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-orange/40";

export function Field({ label, hint, children, id }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
          {label}
        </label>
      )}
      {children}
      {hint && <p className="mt-1 text-xs text-stone">{hint}</p>}
    </div>
  );
}

export function TextInput({ label, hint, value, onChange, multiline = false, rows = 4, ...rest }) {
  const id = useId();
  const Tag = multiline ? "textarea" : "input";
  return (
    <Field label={label} hint={hint} id={id}>
      <Tag
        id={id}
        className={`${inputCls} ${multiline ? "resize-y" : ""}`}
        rows={multiline ? rows : undefined}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </Field>
  );
}

// Champ bilingue : français (obligatoire pour l'affichage) + anglais
export function BiInput({ label, hint, value, onChange, multiline = false, rows = 4 }) {
  const v = value && typeof value === "object" ? value : { fr: value || "", en: "" };
  const set = (lang) => (text) => onChange({ ...v, [lang]: text });
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-semibold">{label}</legend>
      <div className="grid gap-3 lg:grid-cols-2">
        {["fr", "en"].map((lang) => (
          <div key={lang} className="relative">
            <span className="pointer-events-none absolute right-2 top-2 z-10 rounded bg-sand px-1.5 py-0.5 text-[0.7rem] font-bold text-stone">
              {lang.toUpperCase()}
            </span>
            {multiline ? (
              <textarea
                aria-label={`${label} (${lang === "fr" ? "français" : "anglais"})`}
                className={`${inputCls} resize-y pr-10`}
                rows={rows}
                value={v[lang] || ""}
                onChange={(e) => set(lang)(e.target.value)}
              />
            ) : (
              <input
                aria-label={`${label} (${lang === "fr" ? "français" : "anglais"})`}
                className={`${inputCls} pr-10`}
                value={v[lang] || ""}
                onChange={(e) => set(lang)(e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      {hint && <p className="mt-1 text-xs text-stone">{hint}</p>}
      {!v.en && v.fr && (
        <p className="mt-1 text-xs text-stone">Sans traduction, le texte français s&apos;affiche sur la version anglaise.</p>
      )}
    </fieldset>
  );
}

export function SelectInput({ label, value, onChange, options }) {
  const id = useId();
  return (
    <Field label={label} id={id}>
      <select id={id} className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function Toggle({ label, checked, onChange, hint }) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={!!checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-ink" : "bg-ink/20"}`}
      >
        <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${checked ? "left-[1.375rem]" : "left-0.5"}`} />
      </button>
      <label htmlFor={id} className="cursor-pointer">
        <span className="block text-sm font-semibold">{label}</span>
        {hint && <span className="block text-xs text-stone">{hint}</span>}
      </label>
    </div>
  );
}

// Image : aperçu, envoi d'un fichier ou collage d'une URL
export function ImageInput({ label, value, onChange, hint }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  async function onFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) return toast("Image trop lourde (8 Mo maximum).", "error");
    setBusy(true);
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {label && <p className="mb-1.5 text-sm font-semibold">{label}</p>}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-sand sm:w-44">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-xs text-stone">Aucune image</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => fileRef.current?.click()} disabled={busy}>
              {busy ? "Envoi…" : value ? "Remplacer l'image" : "Choisir une image"}
            </Button>
            {value && (
              <Button variant="ghost" onClick={() => onChange("")}>
                Retirer
              </Button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
          <input
            aria-label={`${label || "Image"} : adresse URL`}
            className={`${inputCls} text-xs`}
            placeholder="ou collez l'adresse d'une image"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
          {hint && <p className="text-xs text-stone">{hint}</p>}
        </div>
      </div>
    </div>
  );
}

// Plusieurs images (réalisations) avec réordonnancement
export function ImagesInput({ label, value = [], onChange }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  async function onFiles(e) {
    const files = [...(e.target.files || [])];
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    try {
      const urls = [];
      for (const f of files) urls.push(await uploadImage(f));
      onChange([...value, ...urls]);
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setBusy(false);
    }
  }
  const move = (i, d) => {
    const next = [...value];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };

  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold">{label}</p>
      <p className="mb-3 text-xs text-stone">La première image sert de photo principale.</p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {value.map((src, i) => (
          <li key={src + i} className="overflow-hidden rounded-lg border border-ink/10 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
            <div className="flex justify-between gap-1 p-1.5 text-xs">
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="rounded px-2 py-1 hover:bg-sand disabled:opacity-30" aria-label="Déplacer avant">
                ←
              </button>
              <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="rounded px-2 py-1 text-[#a5281b] hover:bg-sand">
                Retirer
              </button>
              <button type="button" disabled={i === value.length - 1} onClick={() => move(i, 1)} className="rounded px-2 py-1 hover:bg-sand disabled:opacity-30" aria-label="Déplacer après">
                →
              </button>
            </div>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border-2 border-dashed border-ink/20 text-sm font-semibold text-stone hover:border-ink hover:text-ink"
          >
            {busy ? "Envoi…" : "+ Ajouter des images"}
          </button>
        </li>
      </ul>
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
    </div>
  );
}

export function Empty({ children }) {
  return <p className="rounded-xl border border-dashed border-ink/20 p-10 text-center text-stone">{children}</p>;
}

export function Loading() {
  return <p className="py-10 text-center text-stone">Chargement…</p>;
}

export const formatDateTime = (d) =>
  d ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(d)) : "";
