"use client";
import styles from "./contato.module.css";
import { useState } from "react";

export default function ContatoPage() {
	const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
	const [enviado, setEnviado] = useState(false);

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		setEnviado(true);
	}

	return (
		<div className={styles.contatoContainer}>
			<h2 className={styles.titulo}>Envie seu feedback, sugestão ou dúvida!</h2>
			<form className={styles.formulario} onSubmit={handleSubmit}>
				<input
					type="text"
					name="nome"
					placeholder="Seu nome"
					value={form.nome}
					onChange={handleChange}
					required
					className={styles.input}
				/>
				<input
					type="email"
					name="email"
					placeholder="Seu e-mail"
					value={form.email}
					onChange={handleChange}
					required
					className={styles.input}
					autoComplete="off"
				/>
				<textarea
					name="mensagem"
					placeholder="Sua mensagem"
					value={form.mensagem}
					onChange={handleChange}
					required
					className={styles.textarea}
				/>
				<button type="submit" className={styles.botao}>Enviar</button>
			</form>
			{enviado && (
				<div className={styles.sucesso} style={{color: 'white'}}>Obrigada pelo seu feedback!</div>
			)}
		</div>
	);
}