import { useState } from "react";
import { FiUser, FiPhone } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Swal from "sweetalert2";
import { createContact } from "../../services/contactservices";
import { useTranslation } from "react-i18next";

export default function ContactForm({ motif }) {
  const initialFormData = {
    firstname: "",
    name: "",
    email: "",
    phonenumber: "",
    message: "",
    motif: motif,
  };

  const [formData, setFormData] = useState(initialFormData);
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact(formData);
      setFormData(initialFormData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Email has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="info-name">
        <div className="input-container">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <label>{t("first-name")}</label>
          <FiUser className="icon-contact" />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <label>{t("name")}</label>
          <FiUser className="icon-contact" />
        </div>
      </div>

      <div className="input-container">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label>{t("email")}</label>
        <MdAlternateEmail className="icon-contact" />
      </div>

      <div className="input-container">
        <input
          type="text"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleInputChange}
          required
        />
        <label>{t("phone")}</label>
        <FiPhone className="icon-contact" />
      </div>

      <div className="input-container text-area">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
        />
        <label> {t("describ")}</label>
        <FaRegFileAlt className="icon-contact" />
      </div>

      <button type="submit">{t("send")}</button>
    </form>
  );
}
