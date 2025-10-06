"use client";

import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import styles from "./paises.module.css";
import CarrosselPaises from "../components/CarrosselPaises/CarrosselPaises";

export default function PaisesPage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("original");
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [availableContinents, setAvailableContinents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carrosselRef = useRef(null);

  // Função para extrair continentes únicos do backend
  const extractUniqueContinents = (countries) => {
    const continentsSet = new Set();
    
    countries.forEach(country => {
      // Usa o campo location como fonte principal de continente
      const location = country.location;
      if (location && typeof location === 'string' && location.trim() !== '') {
        continentsSet.add(location.trim());
      }
      
      // Fallback para outros campos se location não estiver disponível
      if (!location) {
        if (country.continent) continentsSet.add(country.continent);
        else if (country.region) continentsSet.add(country.region);
        else if (country.subregion) continentsSet.add(country.subregion);
      }
    });
    
    const continentsArray = Array.from(continentsSet).sort();
    console.log("🌍 Continentes extraídos do backend:", continentsArray);
    return continentsArray;
  };

  const fetchCountries = async () => {
    try {
      console.log("🌍 Iniciando busca de países na página Paises...");
      
      // Verificar se a API está respondendo
      const response = await axios.get("http://localhost:5000/country", {
        timeout: 10000, // 10 segundos de timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("📡 Resposta da API (Paises):", response);
      console.log("📡 Status da resposta:", response.status);
      console.log("📡 Headers da resposta:", response.headers);
      console.log("📡 Tipo de dados recebidos:", typeof response.data);
      console.log("📡 Conteúdo bruto:", response.data);
      
      // Verificar se recebemos dados válidos
      if (!response.data) {
        console.error("❌ Resposta vazia da API");
        setError('API retornou dados vazios');
        return;
      }
      
      if (typeof response.data === 'string') {
        console.error("❌ API retornou string em vez de JSON:", response.data);
        setError('API retornou formato inválido (string)');
        return;
      }
      
      console.log("🌍 Dados da API recebidos:", response.data?.length || 0, "países");
      console.log("📊 Estrutura do primeiro país:", response.data?.[0]);
      console.log("📝 Lista completa de países:", response.data.map(c => c.name).sort());
      
      if (!Array.isArray(response.data)) {
        console.error("❌ Dados não são um array (Paises):", response.data);
        setError('Formato de dados inválido recebido da API');
        return;
      }
      
      // Verificar campos de continente/região nos primeiros países
      console.log("🔍 Campos de localização nos primeiros 10 países:");
      response.data.slice(0, 10).forEach((country, index) => {
        console.log(`País ${index + 1} (${country.name}):`, {
          continent: country.continent,
          region: country.region,
          subregion: country.subregion,
          location: country.location
        });
      });
      
      // Mapear todos os valores únicos de continente/região para entender a estrutura
      const continentValues = new Set();
      const regionValues = new Set();
      const subregionValues = new Set();
      
      response.data.forEach(country => {
        if (country.continent) continentValues.add(country.continent);
        if (country.region) regionValues.add(country.region);
        if (country.subregion) subregionValues.add(country.subregion);
      });
      
      console.log("🗺️ Valores únicos de continente:", Array.from(continentValues));
      console.log("🌎 Valores únicos de region:", Array.from(regionValues));
      console.log("🏞️ Valores únicos de subregion:", Array.from(subregionValues));
      
      // Filtrar países válidos
      const validCountries = response.data.filter(country => country.name);
      console.log("✅ Países válidos após filtro:", validCountries.length);
      
      // Extrair continentes únicos do backend
      const continents = extractUniqueContinents(validCountries);
      setAvailableContinents(continents);
      
      setCountries(validCountries);
      setFilteredCountries(validCountries);
      setError(null);
      console.log("✅ Países carregados com sucesso na página Paises!");
    } catch (error) {
      console.error("❌ Erro ao carregar países:", error);
      console.error("🔍 Tipo do erro:", error.constructor.name);
      console.error("🔍 Mensagem:", error.message);
      console.error("🔍 Stack:", error.stack);
      
      if (error.response) {
        console.error("🔍 Resposta do servidor:", error.response.status, error.response.statusText);
        console.error("🔍 Dados da resposta:", error.response.data);
        console.error("🔍 Headers da resposta:", error.response.headers);
      } else if (error.request) {
        console.error("🔍 Requisição não obteve resposta:", error.request);
      }
      
      // Verificar se é erro de JSON
      if (error.message.includes('JSON') || error.message.includes('parse')) {
        setError(`Erro de formato de dados da API: ${error.message}`);
      } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        setError('Não foi possível conectar com o servidor. Verifique se o backend está funcionando.');
      } else {
        setError(`Erro ao carregar países: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar e ordenar países
  const filterAndSortCountries = (countries, query, sort, continent) => {
    console.log("🔍 Filtrando:", { query, sort, continent, totalCountries: countries.length });
    
    // Primeiro filtrar por texto de pesquisa
    let filtered = countries.filter(country => 
      country.name && country.name.toLowerCase().startsWith(query.toLowerCase())
    );

    console.log("📝 Após filtro de pesquisa:", filtered.length);

    // Filtrar por continente se não for "all" e se a ordenação for "continent"
    if (sort === "continent" && continent !== "all") {
      console.log("🌍 Aplicando filtro de continente:", continent);
      
      filtered = filtered.filter(country => {
        // Usa principalmente o campo location
        const countryLocation = (country.location || "").toLowerCase().trim();
        const selectedContinentLower = continent.toLowerCase().trim();
        
        // Verifica correspondência exata ou parcial
        const locationMatch = countryLocation === selectedContinentLower || 
                             countryLocation.includes(selectedContinentLower) ||
                             selectedContinentLower.includes(countryLocation);
        
        // Fallback para outros campos se location não bater
        if (!locationMatch && countryLocation === "") {
          const countryContinent = (country.continent || "").toLowerCase().trim();
          const countryRegion = (country.region || "").toLowerCase().trim();
          const countrySubregion = (country.subregion || "").toLowerCase().trim();
          
          return countryContinent.includes(selectedContinentLower) ||
                 countryRegion.includes(selectedContinentLower) ||
                 countrySubregion.includes(selectedContinentLower) ||
                 selectedContinentLower.includes(countryContinent) ||
                 selectedContinentLower.includes(countryRegion) ||
                 selectedContinentLower.includes(countrySubregion);
        }
        
        console.log(`País: ${country.name}, Location: "${countryLocation}", Match: ${locationMatch}`);
        return locationMatch;
      });
      
      console.log(`🌍 Após filtro de continente "${continent}": ${filtered.length} países`);
      console.log("📋 Países filtrados:", filtered.map(c => `${c.name} (${c.location || c.continent || c.region || 'N/A'})`));
    }

    // Ordenação
    if (sort === "name") {
      // Log antes da ordenação
      console.log("🔍 Países antes da ordenação A-Z:", filtered.map(c => c.name));
      
      filtered = [...filtered].sort((a, b) => {
        const nameA = (a.name || "").toLowerCase().trim();
        const nameB = (b.name || "").toLowerCase().trim();
        return nameA.localeCompare(nameB, 'pt-BR', { 
          numeric: true, 
          sensitivity: 'base' 
        });
      });
      
      console.log("📊 Primeiros 10 países ordenados A-Z:", filtered.slice(0, 10).map(c => c.name));
      console.log("🎯 Primeiro país (A-Z):", filtered[0]?.name);
    } else if (sort === "name-desc") {
      filtered = [...filtered].sort((a, b) => {
        const nameA = (a.name || "").toLowerCase().trim();
        const nameB = (b.name || "").toLowerCase().trim();
        return nameB.localeCompare(nameA, 'pt-BR', { 
          numeric: true, 
          sensitivity: 'base' 
        });
      });
      console.log("📊 Primeiros 10 países ordenados Z-A:", filtered.slice(0, 10).map(c => c.name));
      console.log("🎯 Primeiro país (Z-A):", filtered[0]?.name);
    } else if (sort === "continent") {
      filtered = [...filtered].sort((a, b) => {
        const aCont = a.continent || a.region || a.subregion || "";
        const bCont = b.continent || b.region || b.subregion || "";
        const continentCompare = aCont.localeCompare(bCont);
        
        // Se forem do mesmo continente, ordena por nome
        if (continentCompare === 0) {
          return (a.name || "").localeCompare(b.name || "");
        }
        
        return continentCompare;
      });
      console.log("📊 Primeiros 10 países ordenados por continente:", filtered.slice(0, 10).map(c => `${c.name} (${c.continent || c.region || c.subregion || 'N/A'})`));
    } else {
      console.log("📊 Ordem original mantida");
    }
    // Se for "original", mantém a ordem original (não faz nada)

    return filtered;
  };

  // Atualizar países filtrados quando houver mudanças
  useEffect(() => {
    const filtered = filterAndSortCountries(countries, searchQuery, sortOption, selectedContinent);
    setFilteredCountries(filtered);
  }, [countries, searchQuery, sortOption, selectedContinent]);

  // Rolar para o primeiro país quando qualquer filtro mudar
  useEffect(() => {
    if (filteredCountries.length > 0) {
      // Aguarda um pouco para garantir que o carrossel foi renderizado
      setTimeout(() => {
        console.log(`🎯 Iniciando scroll para filtro: ${sortOption}`);
        
        // Prioridade 1: Usar a ref do carrossel
        if (carrosselRef.current) {
          carrosselRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          console.log(`✅ Scroll realizado via ref para filtro: ${sortOption}`);
          return;
        }
        
        // Prioridade 2: Usar o ID específico
        const carouselById = document.getElementById('countries-carousel');
        if (carouselById) {
          carouselById.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          console.log(`✅ Scroll realizado via ID para filtro: ${sortOption}`);
          return;
        }
        
        // Prioridade 3: Usar o atributo data
        const carouselByData = document.querySelector('[data-countries="carrossel"]');
        if (carouselByData) {
          carouselByData.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          console.log(`✅ Scroll realizado via data-attribute para filtro: ${sortOption}`);
          return;
        }
        
        console.log(`❌ Nenhum elemento encontrado para scroll do filtro: ${sortOption}`);
      }, 500); // Timeout maior para garantir renderização completa
    }
  }, [sortOption, selectedContinent]); // Dispara quando o filtro de ordenação OU continente mudar

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.overlay}></div>
      <h2 className={styles.title}>Escolha seu Destino</h2>
      
      {/* Barra de Pesquisa e Filtros */}
      <div className={styles.searchFilterContainer}>
        {/* Linha principal com pesquisa e filtros */}
        <div className={styles.searchAndFilters}>
          {/* Barra de Pesquisa */}
          <div className={styles.searchInput}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Pesquisar países..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Filtros */}
          <div className={styles.filtersContainer}>
            {/* Filtro de Ordenação Consolidado */}
            <div className={styles.filterGroup}>
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  // Reset do filtro de continente quando mudar para outras opções
                  if (e.target.value !== "continent") {
                    setSelectedContinent("all");
                  }
                }}
                className={styles.select}
              >
                <option value="name">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="original">Ordem Original</option>
                <option value="continent">Por Continente</option>
              </select>
            </div>

            {/* Filtro de Continente - só aparece quando "Por Continente" está selecionado */}
            {sortOption === "continent" && (
              <div className={styles.filterGroup}>
                <select
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value)}
                  className={styles.select}
                >
                  <option value="all">Todos os Continentes</option>
                  {availableContinents.map(continent => (
                    <option key={continent} value={continent}>
                      {continent}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Contador de Resultados */}
        <div className={styles.resultsCounter}>
          <span>{filteredCountries.length} país{filteredCountries.length !== 1 ? 'es' : ''} encontrado{filteredCountries.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {error ? (
        <div style={{color: 'red', padding: '20px', textAlign: 'center', position: 'relative', zIndex: 2}}>
          {error}
        </div>
      ) : filteredCountries.length > 0 ? (
        <div ref={carrosselRef} data-countries="carrossel" id="countries-carousel">
          <CarrosselPaises 
            countries={filteredCountries} 
            showNavigation={selectedContinent === "all"}
          />
        </div>
      ) : countries.length > 0 ? (
        <div className={styles.noResults}>
          <p>Nenhum país encontrado com os filtros selecionados (total: {countries.length}).</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSortOption("original");
              setSelectedContinent("all");
            }}
            className={styles.clearFiltersBtn}
          >
            Limpar Filtros
          </button>
        </div>
      ) : loading ? (
        <p style={{color: 'white', position: 'relative', zIndex: 2, fontSize: '1.2rem'}}>Carregando países...</p>
      ) : (
        <p style={{color: 'white', position: 'relative', zIndex: 2, fontSize: '1.2rem'}}>Nenhum país encontrado (total: {countries.length})</p>
      )}
    </section>
  );
}
