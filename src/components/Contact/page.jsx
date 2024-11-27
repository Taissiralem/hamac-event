import { useTranslation } from "react-i18next";
import ContactForm from "../ContactForm/ContactForm";
import Question from "../Question/Question";
import "./Contact.css";

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <main className="contact-page">
      <Question />

      <div className="right">
        <h2>{t("title")}</h2>
        <p>{t("description")}</p>
        <ContactForm />
      </div>
    </main>
  );
}
