import { Archivo } from "next/font/google";
import "../../globals.css";
import AdminShell from "@/components/admin/AdminShell";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });

export const metadata = {
  title: "Administration | Hamac Events",
  robots: { index: false, follow: false },
  icons: { icon: "/brand/hamac-mark.png" },
};

export default function AdminLayout({ children }) {
  return (
    <html lang="fr" className={archivo.variable}>
      <body className="bg-[#f3f1ec]">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
