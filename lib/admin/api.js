"use client";

// Client HTTP de l'admin : ajoute le token, gère l'expiration de session
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const TOKEN_KEY = "hamac_admin_token";

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function api(path, { method = "GET", body, form } = {}) {
  const headers = { Authorization: `Bearer ${getToken()}` };
  let payload;
  if (form) payload = form;
  else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, { method, headers, body: payload });
  } catch {
    throw new ApiError("Le serveur ne répond pas. Vérifiez votre connexion.", 0);
  }
  if (res.status === 401) {
    clearToken();
    if (!location.pathname.startsWith("/admin/login")) location.href = "/admin/login?expire=1";
    throw new ApiError("Session expirée, reconnectez-vous.", 401);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.error || data.message || `Erreur ${res.status}`, res.status);
  return data;
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).catch(() => null);
  if (!res) throw new ApiError("Le serveur ne répond pas.", 0);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError("E-mail ou mot de passe incorrect.", res.status);
  setToken(data.token);
  return data.user;
}

export async function uploadImage(file) {
  const form = new FormData();
  form.append("image", file);
  const { url } = await api("/upload", { method: "POST", form });
  return url;
}

// Demande au site public de rafraîchir son cache après une modification
export async function refreshSite() {
  await fetch("/api/revalidate", {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
  }).catch(() => {});
}
