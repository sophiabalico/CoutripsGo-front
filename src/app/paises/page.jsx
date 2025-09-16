"use client";

import { useEffect, useState } from "react";
import styles from "./paises.module.css";
import CarrosselPaises from "../components/CarrosselPaises";

export default function PaisesPage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/country")
      .then((res) => res.json())
      .then((data) => {
        console.log("Countries data:", data);
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Escolha seu Destino</h2>
      {countries.length > 0 ? (
        <CarrosselPaises countries={countries} />
      ) : (
        <p>Carregando países...</p>
      )}
    </section>
  );
}
