import styles from '../../sobre/sobre.module.css';

export default function AboutMeSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>Sobre Mim</h2>
        <div className={styles.aboutText}>
          <p>
            Sou uma desenvolvedora em constante evolução, sempre buscando 
            aprender novas tecnologias e criar soluções inovadoras. Minha paixão 
            por viagens me inspirou a criar este projeto, unindo tecnologia e 
            turismo para proporcionar experiências únicas.
          </p>
          <p>
            Acredito que a tecnologia pode tornar o mundo mais conectado e 
            acessível, e é isso que busco em cada projeto que desenvolvo.
          </p>
        </div>
      </div>
    </section>
  );
}