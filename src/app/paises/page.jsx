"use client";

import { useEffect, useState } from "react";
import axios from 'axios';
import styles from "./paises.module.css";
import CarrosselPaises from "../components/CarrosselPaises/CarrosselPaises";

export default function PaisesPage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [sortOption, setSortOption] = useState("original");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      console.log("🌍 Iniciando busca de países na página Paises...");
      const response = await axios.get("http://localhost:5000/country");
      console.log("📡 Resposta da API (Paises):", response);
      console.log("🌍 Dados da API recebidos:", response.data?.length || 0, "países");
      console.log("📊 Estrutura do primeiro país:", response.data?.[0]);
      
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
      
      setCountries(validCountries);
      setFilteredCountries(validCountries);
      setError(null);
      console.log("✅ Países carregados com sucesso na página Paises!");
    } catch (error) {
      console.error("❌ Erro ao carregar países:", error);
      console.error("🔍 Detalhes do erro:", error.response?.data || error.message);
      setError(`Erro ao carregar países: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar e ordenar países
  const filterAndSortCountries = (countries, query, continent, sort) => {
    console.log("🔍 Filtrando:", { query, continent, totalCountries: countries.length });
    
    // Primeiro filtrar por texto de pesquisa
    let filtered = countries.filter(country => 
      country.name && country.name.toLowerCase().startsWith(query.toLowerCase())
    );

    console.log("📝 Após filtro de pesquisa:", filtered.length);

    // Depois filtrar por continente
    if (continent !== "all") {
      console.log("🌍 === INICIANDO FILTRO DE CONTINENTE ===");
      console.log("🎯 Continente selecionado:", continent);
      
      // Mapear continentes para facilitar correspondência
      const continentMapping = {
        "áfrica": ["africa", "áfrica", "african"],
        "ásia": ["asia", "ásia", "asian"],
        "europa": ["europe", "europa", "european"],
        "américa do norte": ["north america", "américa do norte", "northern america", "norte"],
        "américa do sul": ["south america", "américa do sul", "latin america", "sul", "south", "america"],
        "oceania": ["oceania", "australia", "polynesia", "melanesia", "oceanic"]
      };
      
      const selectedMapping = continentMapping[continent.toLowerCase()] || [continent.toLowerCase()];
      console.log("🔍 Palavras-chave para busca:", selectedMapping);
      
      const beforeFilter = filtered.length;
      console.log("📊 Países antes do filtro:", beforeFilter);
      
      filtered = filtered.filter(country => {
        const countryContinent = (country.continent || "").toLowerCase();
        const countryRegion = (country.region || "").toLowerCase();
        const countrySubregion = (country.subregion || "").toLowerCase();
        
        // Verificar se algum dos campos corresponde ao filtro
        const matchContinent = selectedMapping.some(mapping => 
          countryContinent.includes(mapping) || mapping.includes(countryContinent)
        );
        const matchRegion = selectedMapping.some(mapping => 
          countryRegion.includes(mapping) || mapping.includes(countryRegion)
        );
        const matchSubregion = selectedMapping.some(mapping => 
          countrySubregion.includes(mapping) || mapping.includes(countrySubregion)
        );
        
        const finalMatch = matchContinent || matchRegion || matchSubregion;
        
        return finalMatch;
      });
      
      console.log(`📊 Resultado do filtro "${continent}": ${beforeFilter} → ${filtered.length} países`);
      console.log("📋 Países que passaram:", filtered.map(c => c.name));
    }

    // Ordenação
    if (sort === "name") {
      filtered = [...filtered].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sort === "name-desc") {
      filtered = [...filtered].sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    } else if (sort === "continent") {
      filtered = [...filtered].sort((a, b) => {
        const aCont = a.continent || a.region || a.subregion || "";
        const bCont = b.continent || b.region || b.subregion || "";
        return aCont.localeCompare(bCont);
      });
    }

    return filtered;
  };

  // Atualizar países filtrados quando houver mudanças
  useEffect(() => {
    const filtered = filterAndSortCountries(countries, searchQuery, selectedContinent, sortOption);
    setFilteredCountries(filtered);
  }, [countries, searchQuery, selectedContinent, sortOption]);

  // Função para obter continentes únicos adicionais da API
  const getUniqueontinents = () => {
    if (countries.length === 0) {
      return [];
    }

    // Continentes que já estão na lista padrão
    const defaultContinents = ["África", "Ásia", "Europa", "América do Norte", "América do Sul", "Oceania"];

    // Obter continentes únicos dos dados da API que não estão na lista padrão
    const apiContinents = countries
      .map(country => {
        return country.continent || country.region || country.subregion || null;
      })
      .filter(continent => continent && continent.trim() !== "")
      .filter(continent => !defaultContinents.includes(continent))
      .filter((continent, index, arr) => arr.indexOf(continent) === index);

    return apiContinents.sort();
  };

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
            {/* Filtro por Continente */}
            <div className={styles.filterGroup}>
              <select
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
                className={styles.select}
              >
                <option value="all">Todos os Continentes</option>
                <option value="África">África</option>
                <option value="Ásia">Ásia</option>
                <option value="Europa">Europa</option>
                <option value="América do Norte">América do Norte</option>
                <option value="América do Sul">América do Sul</option>
                <option value="Oceania">Oceania</option>
                {getUniqueontinents().map(continent => {
                  // Evitar duplicatas da lista padrão
                  const defaultContinents = ["África", "Ásia", "Europa", "América do Norte", "América do Sul", "Oceania"];
                  if (defaultContinents.includes(continent)) return null;
                  return (
                    <option key={continent} value={continent}>{continent}</option>
                  );
                })}
              </select>
            </div>

            {/* Filtro de Ordenação */}
            <div className={styles.filterGroup}>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={styles.select}
              >
                <option value="original">Ordem Original</option>
                <option value="name">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="continent">Por Continente</option>
              </select>
            </div>
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
        <CarrosselPaises countries={filteredCountries} />
      ) : countries.length > 0 ? (
        <div className={styles.noResults}>
          <p>Nenhum país encontrado com os filtros selecionados (total: {countries.length}).</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedContinent("all");
              setSortOption("original");
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
