import styles from './sobre.module.css';
import HeroAbout from '../components/HeroAbout/HeroAbout';
import AboutMeSection from '../components/AboutMeSection/AboutMeSection';
import SocialLinksSection from '../components/SocialLinksSection/SocialLinksSection';

export default function Sobre() {
  return (
    <div className={styles.container}>
      <HeroAbout />
      <AboutMeSection />
      <SocialLinksSection />
    </div>
  );
}