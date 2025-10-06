import Image from 'next/image';
import styles from '../../sobre/sobre.module.css';

export default function HeroAbout() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.photoContainer}>
          <Image
            src="/image/Sophia.png"
            alt="Foto de Perfil"
            width={300}
            height={300}
            className={styles.profilePhoto}
          />
        </div>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Olá, eu sou Sophia Balico</h1>
          <p className={styles.subtitle}>Desenvolvedora Full Stack & Apaixonadoa por Viagens</p>
          <p className={styles.description}>
            Bem-vindo(a) ao CoutripsGo! Sou apaixonada por tecnologia e viagens, 
            e este projeto nasceu da minha vontade de ajudar pessoas a descobrirem destinos incríveis ao redor do mundo.
          </p>
        </div>
      </div>
    </section>
  );
}