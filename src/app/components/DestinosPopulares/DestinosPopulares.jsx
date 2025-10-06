"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from "../DestinosPopulares/DestinosPopulares.module.css";

export default function DestinosPopulares() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchCountries = async () => {
    try {
      setError(null);
      
      const response = await axios.get("http://localhost:5000/country");
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("API não retornou um array de países");
      }
      
      // Pegar apenas os primeiros 5 países válidos
      const validCountries = response.data.filter(country => country && country.name).slice(0, 5);

      
      setCountries(validCountries);
    } catch (error) {
      console.error("❌ Erro ao carregar países para destinos populares:", error);
      console.error("❌ Detalhes do erro:", error.response?.data || error.message);
      setError(`Erro ao carregar destinos: ${error.message}`);
      setCountries([]); // Garantir que countries seja um array vazio em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // Função para obter a URL da imagem do país
  const getCountryImage = (country) => {
    
    
    // Se o país já tem uma URL de imagem da API, usa ela diretamente
    if (country.image) {
      
      return country.image;
    }
    
    // Se tem um campo imageUrl
    if (country.imageUrl) {
      
      return country.imageUrl;
    }
    
    // Se tem um campo photo
    if (country.photo) {
      
      return country.photo;
    }
    
    // Normaliza o nome do país para construir a URL
    const normalizedName = country.name
      .toLowerCase()
      .normalize('NFD')                           // Remove acentos
      .replace(/[\u0300-\u036f]/g, '')           
      .replace(/\s+/g, '')                       // Remove espaços
      .replace(/[^a-z0-9]/g, '');                // Remove caracteres especiais
    
    // Constrói a URL baseada no padrão do seu backend
    const imageUrl = `http://localhost:5000/public/image/${normalizedName}.png`;
    
    
    return imageUrl;
  };

  // Função para lidar com erro de carregamento de imagem
  const handleImageError = (e) => {
    
    
    const currentSrc = e.target.src;
    
    // Tenta URLs alternativas
    if (currentSrc.includes('/public/image/')) {
      // Tenta sem o 'public'
      e.target.src = currentSrc.replace('/public/image/', '/image/');
      } else if (currentSrc.includes('/image/') && !currentSrc.includes('/images/')) {
      // Tenta com 'images' plural
      e.target.src = currentSrc.replace('/image/', '/images/');
      } else {
      // Fallback final
      e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
      }
  };

  // Função para navegar para a página de detalhes do país
  const handleCountryClick = (country) => {
    const countryId = country.id || country._id || country.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/paises/${countryId}`);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (loading) {
    return (
      <section className={styles.destinations}>
        <h3>Destinos Populares</h3>
        <div className={styles.grid}>
          <div className={styles.loading}>Carregando destinos...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.destinations}>
        <h3>Destinos Populares</h3>
        <div className={styles.grid}>
          <div style={{color: 'red', padding: '20px'}}>
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.destinations}>
      <h3>Destinos Populares</h3>
      <div className={styles.grid}>
        {countries.length === 0 ? (
          <div style={{color: 'white', padding: '20px'}}>
            Nenhum destino encontrado (total: {countries.length})
          </div>
        ) : (
          countries.map((country) => {

            return (
              <div 
                key={country.id || country._id || country.name} 
                className={styles.card}
                onClick={() => handleCountryClick(country)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={getCountryImage(country)} 
                  alt={country.name}
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className={styles.cardTitle}>{country.name}</div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
