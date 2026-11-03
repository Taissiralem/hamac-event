// Envoi d'événements aux outils de mesure :
// - statistiques internes (anonymes, sans cookie) : toujours envoyées, visibles dans l'admin ;
// - GA4, Google Ads, Meta Pixel : seulement s'ils sont chargés (ID renseigné et cookies acceptés).

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

let adsLead = null; // "AW-XXXX/libellé", fourni par <Analytics> une fois les outils chargés

export function setAdsLeadTarget(target) {
  adsLead = target;
}

const gtag = (...args) => typeof window !== "undefined" && window.gtag?.(...args);
const fbq = (...args) => typeof window !== "undefined" && window.fbq?.(...args);

// Les visites de l'équipe connectée à l'admin ne sont pas comptées
function isTeam() {
  try {
    return Boolean(localStorage.getItem("hamac_admin_token"));
  } catch {
    return false;
  }
}

// Statistiques internes : sendBeacon survit à un changement de page
export function collect(type, extra = {}) {
  if (typeof window === "undefined" || isTeam()) return;
  const body = JSON.stringify({ type, path: location.pathname, w: window.innerWidth, ...extra });
  const url = `${API_URL}/stats/collect`;
  if (!navigator.sendBeacon?.(url, new Blob([body], { type: "text/plain" }))) {
    fetch(url, { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
  }
}

// Demande envoyée depuis un formulaire : conversion principale
export function trackLead(type) {
  collect("lead", { detail: type });
  gtag("event", "generate_lead", { form_type: type });
  if (adsLead) gtag("event", "conversion", { send_to: adsLead });
  fbq("track", "Lead", { content_category: type });
}

// Clic sur un numéro de téléphone ou une adresse e-mail
export function trackContactClick(method) {
  collect(method === "phone" ? "click_to_call" : "click_email");
  gtag("event", method === "phone" ? "click_to_call" : "click_email");
  fbq("track", "Contact", { content_category: method });
}

// Événement libre (ex. lancement de la visite virtuelle)
export function trackEvent(name, params = {}) {
  if (name === "vr_tour_start") collect(name);
  gtag("event", name, params);
  fbq("trackCustom", name, params);
}
