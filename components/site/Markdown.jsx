import ReactMarkdown from "react-markdown";

export default function Markdown({ children, className = "prose-hamac" }) {
  return (
    <div className={className}>
      <ReactMarkdown>{children || ""}</ReactMarkdown>
    </div>
  );
}
