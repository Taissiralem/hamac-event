"use client";

import { BiInput, Button, Card, ImageInput, SelectInput, TextInput } from "./ui";

// Formulaire généré à partir du schéma d'une page (lib/content/schemas.js)

function FieldEditor({ field, value, onChange }) {
  switch (field.type) {
    case "text":
      return <BiInput label={field.label} value={value} onChange={onChange} />;
    case "textarea":
      return <BiInput label={field.label} value={value} onChange={onChange} multiline hint="Laissez une ligne vide pour créer un nouveau paragraphe." />;
    case "markdown":
      return (
        <BiInput
          label={field.label}
          value={value}
          onChange={onChange}
          multiline
          rows={14}
          hint="Mise en forme : ## Titre, **gras**, *italique*, - liste, [lien](https://…)"
        />
      );
    case "image":
      return <ImageInput label={field.label} value={value} onChange={onChange} />;
    case "plain":
      return <TextInput label={field.label} value={value} onChange={onChange} />;
    case "select":
      return <SelectInput label={field.label} value={value} onChange={onChange} options={field.options} />;
    case "list":
      return <ListEditor field={field} value={value} onChange={onChange} />;
    default:
      return null;
  }
}

const emptyValue = (field) => {
  if (["text", "textarea", "markdown"].includes(field.type)) return { fr: "", en: "" };
  if (field.type === "select") return field.options[0]?.value;
  if (field.type === "list") return [];
  return "";
};

function ListEditor({ field, value = [], onChange }) {
  const items = Array.isArray(value) ? value : [];
  const update = (i, key, v) => onChange(items.map((item, j) => (j === i ? { ...item, [key]: v } : item)));
  const add = () => onChange([...items, Object.fromEntries(Object.entries(field.fields).map(([k, f]) => [k, emptyValue(f)]))]);
  const remove = (i) => confirm("Retirer cet élément ?") && onChange(items.filter((_, j) => j !== i));
  const move = (i, d) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  const preview = (item) => {
    const first = Object.values(item).find((v) => v && typeof v === "object" && v.fr) || Object.values(item).find((v) => typeof v === "string" && v && !v.startsWith("http"));
    return typeof first === "object" ? first.fr : first;
  };

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">{field.label}</legend>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i}>
            <details className="group rounded-lg border border-ink/15 bg-paper/60" open={items.length <= 2}>
              <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                <span className="text-xs font-bold text-stone">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate font-medium">{preview(item) || `${field.itemLabel} ${i + 1}`}</span>
                <span className="text-xs text-stone group-open:hidden">Modifier</span>
              </summary>
              <div className="space-y-5 border-t border-ink/10 p-4">
                {Object.entries(field.fields).map(([key, sub]) => (
                  <FieldEditor key={key} field={sub} value={item[key]} onChange={(v) => update(i, key, v)} />
                ))}
                <div className="flex flex-wrap gap-2 border-t border-ink/10 pt-4">
                  <Button variant="ghost" disabled={i === 0} onClick={() => move(i, -1)}>Monter</Button>
                  <Button variant="ghost" disabled={i === items.length - 1} onClick={() => move(i, 1)}>Descendre</Button>
                  <Button variant="danger" className="ml-auto" onClick={() => remove(i)}>Retirer</Button>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ol>
      <Button variant="ghost" className="mt-3" onClick={add}>
        + Ajouter : {field.itemLabel.toLowerCase()}
      </Button>
    </fieldset>
  );
}

export default function SchemaForm({ schema, value, onChange }) {
  const setField = (sectionKey, fieldKey, v) =>
    onChange({ ...value, [sectionKey]: { ...(value[sectionKey] || {}), [fieldKey]: v } });

  return (
    <div className="space-y-6">
      {schema.sections.map((section) => (
        <Card key={section.key} title={section.label} help={section.help}>
          <div id={`section-${section.key}`} className="scroll-mt-24 space-y-6">
            {Object.entries(section.fields).map(([key, field]) => (
              <FieldEditor key={key} field={field} value={value?.[section.key]?.[key]} onChange={(v) => setField(section.key, key, v)} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
