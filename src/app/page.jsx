import styles from "./page.module.css";
import HeroSection from "./components/HeroSection/HeroSection";
import DestinosPopulares from "./components/DestinosPopulares/DestinosPopulares";

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <HeroSection />
      <DestinosPopulares />
    </div>
  );
}
