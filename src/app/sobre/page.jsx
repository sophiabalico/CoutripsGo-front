import styles from './sobre.module.css';
import Image from 'next/image';

export default function Sobre() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
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

      {/* Sobre Mim Section */}
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

      {/* Redes Sociais Section */}
      <section className={styles.socialSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Vamos nos Conectar?</h2>
          <p className={styles.socialDescription}>
            Siga-me nas redes sociais e acompanhe meus projetos e jornada!
          </p>
          <div className={styles.socialLinks}>
            <a 
              href="https://github.com/sophiabalico" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <div className={styles.socialIcon}>
                <span>🐙</span>
              </div>
              <span>GitHub</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/sophia-balico-1366542b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <div className={styles.socialIcon}>
                <span>💼</span>
              </div>
              <span>LinkedIn</span>
            </a>
            
            <a 
              href="https://www.instagram.com/sophiabalico/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <div className={styles.socialIcon}>
                <span>📷</span>
              </div>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}