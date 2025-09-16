import styles from "./page.module.css";
import HeroSection from "./components/HeroSection/HeroSection";
import DestinosPopulares from "./components/DestinosPopulares/DestinosPopulares";

export default function HomePage() {
  const places = [
    { name: "Canada", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { name: "Thailand", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    { name: "Switzerland", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090" },
    { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
    { name: "Dubai", img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1" }
  ];

  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <HeroSection />
      <DestinosPopulares places={places} />
    </div>
  );
}
