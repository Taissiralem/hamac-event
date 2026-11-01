"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { login } from "@/lib/admin/api";

function LoginForm() {
  const router = useRouter();
  const expired = useSearchParams().get("expire");
  const [error, setError] = useState(expired ? "Votre session a expiré, reconnectez-vous." : "");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));
    setBusy(true);
    setError("");
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-paper p-8 text-ink shadow-2xl">
      <div className="flex items-center gap-3">
        <Image src="/brand/hamac-mark.png" alt="" width={40} height={40} />
        <h1 className="text-xl font-bold [font-variation-settings:'wdth'_115]">Administration</h1>
      </div>
      <p className="mt-2 text-sm text-stone">Connectez-vous pour gérer le contenu du site.</p>
      <label className="mt-7 block text-sm font-semibold" htmlFor="email">
        E-mail
      </label>
      <input id="email" name="email" type="email" required autoComplete="username" className="field mt-1.5" />
      <label className="mt-4 block text-sm font-semibold" htmlFor="password">
        Mot de passe
      </label>
      <input id="password" name="password" type="password" required autoComplete="current-password" className="field mt-1.5" />
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-[#fbe9e0] px-3 py-2 text-sm text-[#8a3409]">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className="btn btn-primary mt-6 w-full disabled:opacity-60">
        {busy ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="floorplan flex min-h-screen items-center justify-center bg-ink p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
