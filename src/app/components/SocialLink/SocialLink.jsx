import styles from '../../sobre/sobre.module.css';

export default function SocialLink({ href, icon, label }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.socialLink}
    >
      <div className={styles.socialIcon}>
        <span>{icon}</span>
      </div>
      <span>{label}</span>
    </a>
  );
}