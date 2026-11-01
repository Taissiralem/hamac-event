import { pageSchemas } from "./schemas";
import { fetchPageData } from "@/lib/api";

// Fusionne le contenu enregistré dans l'admin avec les valeurs par défaut du schéma
export function mergeContent(key, data = {}) {
  const schema = pageSchemas[key];
  const out = {};
  for (const section of schema.sections) {
    out[section.key] = {};
    for (const [fieldKey, field] of Object.entries(section.fields)) {
      const saved = data?.[section.key]?.[fieldKey];
      out[section.key][fieldKey] = saved === undefined || saved === null ? field.default : saved;
    }
  }
  return out;
}

export async function getContent(key) {
  return mergeContent(key, await fetchPageData(key));
}
