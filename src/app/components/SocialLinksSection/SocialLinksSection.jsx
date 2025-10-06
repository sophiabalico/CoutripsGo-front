import styles from '../../sobre/sobre.module.css';
import SocialLink from '../SocialLink/SocialLink';

export default function SocialLinksSection() {
  const socialLinks = [
    {
      href: "https://github.com/sophiabalico",
      icon: "🐙",
      label: "GitHub"
    },
    {
      href: "https://www.linkedin.com/in/sophia-balico-1366542b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      icon: "💼",
      label: "LinkedIn"
    },
    {
      href: "https://www.instagram.com/sophiabalico/",
      icon: "📷",
      label: "Instagram"
    }
  ];

  return (
    <section className={styles.socialSection}>
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>Vamos nos Conectar?</h2>
        <p className={styles.socialDescription}>
          Siga-me nas redes sociais e acompanhe meus projetos e jornada!
        </p>
        <div className={styles.socialLinks}>
          {socialLinks.map((social, index) => (
            <SocialLink
              key={index}
              href={social.href}
              icon={social.icon}
              label={social.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}