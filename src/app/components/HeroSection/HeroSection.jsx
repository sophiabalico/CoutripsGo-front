import styles from "../HeroSection/HeroSection.module.css";
import Link from "next/link";

export default function HeroSection() {
  return (
    <main className={styles.heroContent}>
      <h2>Coutrips Go</h2>
      <h3>Explore os países do mundo!</h3>
      <p>
        A Coutrips Go foi criada para quem ama viajar e descobrir novos lugares. Aqui você encontra informações sobre países de todos os continentes: cultura, curiosidades, pontos turísticos e muito mais. Seu próximo destino começa por aqui.
      </p>
      <Link href="/paises" passHref legacyBehavior>
        <button className={styles.exploreBtn}>Explorar Países</button>
      </Link>
    </main>
  );
}
