import { useState } from 'react';

export function useContactForm() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEnviado(true);
  }

  function resetForm() {
    setForm({ nome: "", email: "", mensagem: "" });
    setEnviado(false);
  }

  return {
    form,
    enviado,
    handleChange,
    handleSubmit,
    resetForm
  };
}