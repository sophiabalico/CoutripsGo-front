import styles from '../../contato/contato.module.css';

export default function ContactForm({ form, onSubmit, onChange }) {
  return (
    <form className={styles.formulario} onSubmit={onSubmit}>
      <input
        type="text"
        name="nome"
        placeholder="Seu nome"
        value={form.nome}
        onChange={onChange}
        required
        className={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Seu e-mail"
        value={form.email}
        onChange={onChange}
        required
        className={styles.input}
        autoComplete="off"
      />
      <textarea
        name="mensagem"
        placeholder="Sua mensagem"
        value={form.mensagem}
        onChange={onChange}
        required
        className={styles.textarea}
      />
      <button type="submit" className={styles.botao}>
        Enviar
      </button>
    </form>
  );
}