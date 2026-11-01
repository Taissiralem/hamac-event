// Icônes au trait (24 × 24), clé = valeur choisie dans l'admin
const paths = {
  stand: "M3 20h18M5 20V8l7-4 7 4v12M9 20v-6h6v6M5 8h14",
  furniture: "M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 11h18v5H3zM5 16v3M19 16v3",
  staff: "M9 7a3 3 0 1 0 6 0 3 3 0 0 0-6 0M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2M12 14v4",
  media: "M4 5h16v10H4zM8 21h8M12 15v6M8 9l3 2-3 2z",
  logistics: "M3 6h11v10H3zM14 9h4l3 3v4h-7M7 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01",
  hotel: "M3 20V6M21 20v-6a3 3 0 0 0-3-3h-8v6M3 17h18M7 11a2 2 0 1 0 0-.01",
  people: "M8 8a3 3 0 1 0 0-.01M16 9a2.5 2.5 0 1 0 0-.01M2 20v-1a5 5 0 0 1 10 0v1M14 20v-1a4 4 0 0 1 8 0v1",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7",
  check: "M4 12l5 5L20 6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  plus: "M12 5v14M5 12h14",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
};

export default function Icon({ name, className = "size-6", strokeWidth = 1.6 }) {
  const d = paths[name] || paths.check;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export function SocialIcon({ name, className = "size-5" }) {
  const icons = {
    facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v7h4v-7h3l1-4h-4V8z" />,
    instagram: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </>
    ),
    linkedin: <path d="M4 9h3.5v11H4zM5.75 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.4v1.6c.5-.9 1.7-1.9 3.6-1.9 3.6 0 4 2.3 4 5.3V20h-3.5v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H10z" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  );
}
