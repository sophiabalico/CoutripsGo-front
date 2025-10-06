import styles from '../../contato/contato.module.css';

export default function SuccessMessage({ show }) {
  if (!show) return null;

  return (
    <div className={styles.sucesso} style={{color: 'white'}}>
      Obrigada pelo seu feedback!
    </div>
  );
}