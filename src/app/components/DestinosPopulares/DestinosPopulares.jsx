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
      console.log("🚀 Iniciando busca de países para destinos populares...");
      setError(null);
      
      const response = await axios.get("http://localhost:5000/country");
      console.log("🌍 Resposta da API recebida:", response);
      console.log("📊 Status da resposta:", response.status);
      console.log("📊 Dados da API recebidos para destinos populares:", response.data?.length || 0, "países");
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("API não retornou um array de países");
      }
      
      // Pegar apenas os primeiros 5 países válidos
      const validCountries = response.data.filter(country => country && country.name).slice(0, 5);
      console.log("✅ 5 países selecionados:", validCountries.map(c => c.name));
      console.log("📋 Dados completos dos países:", validCountries);
      
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
    console.log(`🔍 Buscando imagem para país:`, country); // Debug
    
    // Se o país já tem uma URL de imagem da API, usa ela diretamente
    if (country.image) {
      console.log(`✅ Imagem encontrada na API: ${country.image}`); // Debug
      return country.image;
    }
    
    // Se tem um campo imageUrl
    if (country.imageUrl) {
      console.log(`✅ ImageUrl encontrada na API: ${country.imageUrl}`); // Debug
      return country.imageUrl;
    }
    
    // Se tem um campo photo
    if (country.photo) {
      console.log(`✅ Photo encontrada na API: ${country.photo}`); // Debug
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
    console.log(`🌐 URL construída: ${imageUrl}`); // Debug
    
    return imageUrl;
  };

  // Função para lidar com erro de carregamento de imagem
  const handleImageError = (e) => {
    console.log(`❌ Erro ao carregar: ${e.target.src}`); // Debug
    
    const currentSrc = e.target.src;
    
    // Tenta URLs alternativas
    if (currentSrc.includes('/public/image/')) {
      // Tenta sem o 'public'
      e.target.src = currentSrc.replace('/public/image/', '/image/');
      console.log(`🔄 Tentando sem 'public': ${e.target.src}`);
    } else if (currentSrc.includes('/image/') && !currentSrc.includes('/images/')) {
      // Tenta com 'images' plural
      e.target.src = currentSrc.replace('/image/', '/images/');
      console.log(`🔄 Tentando 'images' plural: ${e.target.src}`);
    } else {
      // Fallback final
      e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
      console.log(`🚫 Usando fallback externo`);
    }
  };

  // Função para navegar para a página de detalhes do país
  const handleCountryClick = (country) => {
    console.log(`🔗 Navegando para detalhes do país:`, country);
    const countryId = country.id || country._id || country.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/paises/${countryId}`);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (loading) {
    console.log("⏳ Estado de loading ativo...");
    return (
      <section className={styles.destinations}>
        <h3>Destinos Populares</h3>
        <div className={styles.grid}>
          <div className={styles.loading}>Carregando destinos...</div>
        </div>
      </section>
    );
  }

  console.log("🎯 Renderizando destinos populares com:", countries.length, "países");
  console.log("📋 Lista de países:", countries);
  console.log("❌ Erro atual:", error);

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
            console.log("🗂️ Renderizando card para:", country.name);
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
