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
              src="/image/minha-foto.jpg" // Substitua pelo caminho da sua foto
              alt="Minha foto"
              width={300}
              height={300}
              className={styles.profilePhoto}
            />
          </div>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Olá, eu sou [Seu Nome]</h1>
            <p className={styles.subtitle}>Desenvolvedor(a) Full Stack & Apaixonado(a) por Viagens</p>
            <p className={styles.description}>
              Bem-vindo(a) ao CoutripsGo! Sou apaixonado(a) por tecnologia e viagens, 
              e este projeto nasceu da minha vontade de ajudar pessoas a descobrirem 
              destinos incríveis ao redor do mundo.
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
              Sou um(a) desenvolvedor(a) em constante evolução, sempre buscando 
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

      {/* Projetos Section */}
      <section className={styles.projectsSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Projetos Anteriores</h2>
          <div className={styles.projectsGrid}>
            <div className={styles.projectCard}>
              <div className={styles.projectImage}>
                <Image
                  src="/image/projeto1.jpg" // Substitua pela imagem do projeto
                  alt="Projeto 1"
                  width={300}
                  height={200}
                  className={styles.projectImg}
                />
              </div>
              <div className={styles.projectContent}>
                <h3>Nome do Projeto 1</h3>
                <p>Descrição breve do projeto e das tecnologias utilizadas.</p>
                <div className={styles.projectTech}>
                  <span>React</span>
                  <span>CSS</span>
                </div>
              </div>
            </div>

            <div className={styles.projectCard}>
              <div className={styles.projectImage}>
                <Image
                  src="/image/projeto2.jpg" // Substitua pela imagem do projeto
                  alt="Projeto 2"
                  width={300}
                  height={200}
                  className={styles.projectImg}
                />
              </div>
              <div className={styles.projectContent}>
                <h3>Nome do Projeto 2</h3>
                <p>Descrição breve do projeto e das tecnologias utilizadas.</p>
                <div className={styles.projectTech}>
                  <span>JavaScript</span>
                  <span>Node.js</span>
                </div>
              </div>
            </div>

            <div className={styles.projectCard}>
              <div className={styles.projectImage}>
                <Image
                  src="/image/projeto3.jpg" // Substitua pela imagem do projeto
                  alt="Projeto 3"
                  width={300}
                  height={200}
                  className={styles.projectImg}
                />
              </div>
              <div className={styles.projectContent}>
                <h3>Nome do Projeto 3</h3>
                <p>Descrição breve do projeto e das tecnologias utilizadas.</p>
                <div className={styles.projectTech}>
                  <span>Next.js</span>
                  <span>API</span>
                </div>
              </div>
            </div>
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
              href="https://github.com/seuusuario" 
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
              href="https://linkedin.com/in/seuusuario" 
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
              href="https://instagram.com/seuusuario" 
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