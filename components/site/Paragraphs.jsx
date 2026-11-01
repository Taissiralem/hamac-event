// Texte saisi dans un champ multiligne : une ligne vide = un nouveau paragraphe
export default function Paragraphs({ text, className = "" }) {
  const blocks = (text || "").split(/\n\s*\n/).filter(Boolean);
  return blocks.map((block, i) => (
    <p key={i} className={`${className} ${i ? "mt-4" : ""}`}>
      {block}
    </p>
  ));
}
