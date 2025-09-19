"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./pais-detalhes.module.css";

export default function PaisDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        console.log("🌍 Buscando detalhes do país ID:", params.id);
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:5000/country/${params.id}`);
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: País não encontrado`);
        }

        const data = await response.json();
        console.log("📊 Dados do país recebidos:", data);
        
        // Debug das estruturas de dados do schema Prisma
        if (data.curiosities) {
          console.log("💡 Estrutura de curiosities:", data.curiosities);
          console.log("🔍 Tipo da primeira curiosity:", typeof data.curiosities[0], data.curiosities[0]);
        }
        if (data.tourists) {
          console.log("🏛️ Estrutura de tourists (pontos turísticos):", data.tourists);
          console.log("🔍 Tipo do primeiro tourist spot:", typeof data.tourists[0], data.tourists[0]);
        }
        
        setCountry(data);
      } catch (err) {
        console.error("❌ Erro ao buscar país:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCountryDetails();
    }
  }, [params.id]);

  // Função para obter a URL da imagem do backend
  const getCountryImage = (country) => {
    if (country.imageUrl) return country.imageUrl;
    if (country.image) return country.image;
    
    // Fallback para imagem local baseada no nome
    const normalizedName = country.name
      ?.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[áàâã]/g, 'a')
      .replace(/[éèê]/g, 'e')
      .replace(/[íì]/g, 'i')
      .replace(/[óòôõ]/g, 'o')
      .replace(/[úù]/g, 'u')
      .replace(/[ç]/g, 'c');
    
    return `/image/${normalizedName}.png`;
  };

  // Função para formatar custo
  const formatCost = (cost) => {
    if (!cost) return "Não informado";
    return cost;
  };

  // Função para renderizar conteúdo de forma segura
  const renderSafeContent = (content, fallback = "Informação não disponível") => {
    if (typeof content === 'string' && content.trim()) return content;
    if (typeof content === 'number') return content.toString();
    if (Array.isArray(content)) {
      // Se for um array de strings, junta com vírgulas
      if (content.every(item => typeof item === 'string')) {
        return content.join(', ');
      }
      // Se for um array de objetos, tenta extrair o primeiro valor útil
      return content.map(item => renderSafeContent(item, '')).filter(Boolean).join(', ') || fallback;
    }
    if (typeof content === 'object' && content !== null) {
      return content.title || content.name || content.description || content.text || content.value || fallback;
    }
    return fallback;
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando informações do país...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorContainer}>
          <h2>Ops! Algo deu errado</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorContainer}>
          <h2>País não encontrado</h2>
          <p>O país solicitado não foi encontrado em nossa base de dados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>

      {/* Hero Section com imagem do país */}
      <div className={styles.heroSection}>
        <div className={styles.heroImage}>
          <img 
            src={getCountryImage(country)} 
            alt={`Paisagem de ${country.name}`}
            onError={(e) => {
              e.target.src = '/image/default-country.jpg';
            }}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.countryTitle}>{country.name}</h1>
          <p className={styles.countrySubtitle}>
            {country.location || 'Localização não informada'}
          </p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className={styles.mainContent}>
        {/* Informações básicas */}
        <div className={styles.infoSection}>
          <h2>Informações Gerais</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🏛️</div>
              <h3>Capital</h3>
              <p>{renderSafeContent(country.capital, 'Não informado')}</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>�️</div>
              <h3>Idioma</h3>
              <p>{renderSafeContent(country.language, 'Não informado')}</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>�</div>
              <h3>Moeda</h3>
              <p>{renderSafeContent(country.coin, 'Não informado')}</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>�</div>
              <h3>Custo de Viagem</h3>
              <p>{formatCost(country.cost)}</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🏳️</div>
              <h3>Bandeira</h3>
              <p>{renderSafeContent(country.flag, '🏳️')}</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🌍</div>
              <h3>Localização</h3>
              <p>{renderSafeContent(country.location, 'Não informado')}</p>
            </div>
          </div>
        </div>

        {/* Pontos Turísticos */}
        {country.tourists && Array.isArray(country.tourists) && country.tourists.length > 0 && (
          <div className={styles.attractionsSection}>
            <h2>Pontos Turísticos</h2>
            <div className={styles.attractionsList}>
              {country.tourists.map((tourist, index) => (
                <div key={tourist.id || index} className={styles.attractionItem}>
                  {tourist.imageUrl && (
                    <div className={styles.attractionImage}>
                      <img 
                        src={tourist.imageUrl} 
                        alt={tourist.title}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className={styles.attractionContent}>
                    <h4>{renderSafeContent(tourist.title, `Ponto Turístico ${index + 1}`)}</h4>
                    {tourist.description && (
                      <p>{renderSafeContent(tourist.description)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Curiosidades */}
        {country.curiosities && Array.isArray(country.curiosities) && country.curiosities.length > 0 && (
          <div className={styles.curiositiesSection}>
            <h2>Curiosidades</h2>
            <div className={styles.curiositiesList}>
              {country.curiosities.map((curiosity, index) => (
                <div key={curiosity.id || index} className={styles.curiosityItem}>
                  <span className={styles.curiosityIcon}>💡</span>
                  <div className={styles.curiosityContent}>
                    <h4>{renderSafeContent(curiosity.title, `Curiosidade ${index + 1}`)}</h4>
                    {curiosity.description && (
                      <p>{renderSafeContent(curiosity.description)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
