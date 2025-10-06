"use client";
import styles from "./contato.module.css";
import ContactForm from "../components/ContactForm/ContactForm";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
import { useContactForm } from "../components/hooks/useContactForm";

export default function ContatoPage() {
  const { form, enviado, handleChange, handleSubmit } = useContactForm();

  return (
    <div className={styles.contatoContainer}>
      <h2 className={styles.titulo}>Envie seu feedback, sugestão ou dúvida!</h2>
      <ContactForm 
        form={form}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
      <SuccessMessage show={enviado} />
    </div>
  );
}