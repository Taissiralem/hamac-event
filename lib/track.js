// Envoi d'événements aux outils de mesure (GA4, Google Ads, Meta Pixel).
// Ne fait rien si les outils ne sont pas chargés (pas d'ID ou cookies refusés).

let adsLead = null; // "AW-XXXX/libellé", fourni par <Analytics> une fois les outils chargés

export function setAdsLeadTarget(target) {
  adsLead = target;
}

const gtag = (...args) => typeof window !== "undefined" && window.gtag?.(...args);
const fbq = (...args) => typeof window !== "undefined" && window.fbq?.(...args);

// Demande envoyée depuis un formulaire : conversion principale
export function trackLead(type) {
  gtag("event", "generate_lead", { form_type: type });
  if (adsLead) gtag("event", "conversion", { send_to: adsLead });
  fbq("track", "Lead", { content_category: type });
}

// Clic sur un numéro de téléphone ou une adresse e-mail
export function trackContactClick(method) {
  gtag("event", method === "phone" ? "click_to_call" : "click_email");
  fbq("track", "Contact", { content_category: method });
}

// Événement libre (ex. lancement de la visite virtuelle)
export function trackEvent(name, params = {}) {
  gtag("event", name, params);
  fbq("trackCustom", name, params);
}
