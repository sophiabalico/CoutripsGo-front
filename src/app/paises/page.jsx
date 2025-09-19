"use client";

import { useEffect, useState } from "react";
import styles from "./paises.module.css";
import CarrosselPaises from "../components/CarrosselPaises";

export default function PaisesPage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [sortOption, setSortOption] = useState("original");

  // Função para filtrar e ordenar países
  const filterAndSortCountries = (countries, query, continent, sort) => {
    console.log("🔍 Filtrando:", { query, continent, totalCountries: countries.length });
    
    // Primeiro filtrar por texto de pesquisa
    let filtered = countries.filter(country => 
      country.name && country.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log("📝 Após filtro de pesquisa:", filtered.length);

    // Depois filtrar por continente
    if (continent !== "all") {
      console.log("🌍 Aplicando filtro de continente:", continent);
      
      // Mapear continentes para facilitar correspondência
      const continentMapping = {
        "américa do sul": ["south america", "américa do sul", "latin america", "sul"],
        "américa do norte": ["north america", "américa do norte", "northern america", "norte"],
        "europa": ["europe", "europa"],
        "ásia": ["asia", "ásia"],
        "áfrica": ["africa", "áfrica"],
        "oceania": ["oceania", "australia", "polynesia", "melanesia"]
      };
      
      const selectedMapping = continentMapping[continent.toLowerCase()] || [continent.toLowerCase()];
      
      filtered = filtered.filter(country => {
        const countryContinent = (country.continent || country.region || country.subregion || "").toLowerCase();
        
        // Verificar se o continente do país corresponde a alguma das variações
        const match = selectedMapping.some(mapping => 
          countryContinent.includes(mapping) || mapping.includes(countryContinent)
        );
        
        // Log para debug de alguns países específicos
        if (country.name.toLowerCase().includes('brasil') || 
            country.name.toLowerCase().includes('brazil') ||
            country.name.toLowerCase().includes('argentina') ||
            country.name.toLowerCase().includes('frança') ||
            country.name.toLowerCase().includes('france')) {
          console.log(`🏁 ${country.name}: "${countryContinent}" → ${match ? '✅' : '❌'}`);
        }
        
        return match;
      });
      
      console.log("✅ Após filtro de continente:", filtered.length, "países");
      console.log("📋 Países encontrados:", filtered.map(c => c.name).slice(0, 5));
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sort) {
        case "name":
          return (a.name || "").localeCompare(b.name || "");
        case "name-desc":
          return (b.name || "").localeCompare(a.name || "");
        case "continent":
          const aCont = a.continent || a.region || a.subregion || "";
          const bCont = b.continent || b.region || b.subregion || "";
          return aCont.localeCompare(bCont);
        case "original":
        default:
          return 0; // Mantém a ordem original
      }
    });

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
    fetch("http://localhost:5000/country")
      .then((res) => res.json())
      .then((data) => {        
        console.log("🌍 Dados da API recebidos:", data.length, "países");
        console.log("📊 Estrutura do primeiro país:", data[0]);
        
        // Verificar campos de continente/região nos primeiros países
        console.log("🔍 Campos de localização nos primeiros 3 países:");
        data.slice(0, 3).forEach((country, index) => {
          console.log(`País ${index + 1} (${country.name}):`, {
            continent: country.continent,
            region: country.region,
            subregion: country.subregion,
            location: country.location
          });
        });
        
        // Filtrar países válidos
        const validCountries = data.filter(country => country.name);
        console.log("✅ Países válidos após filtro:", validCountries.length);
        
        setCountries(validCountries);
        setFilteredCountries(validCountries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
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

      {filteredCountries.length > 0 ? (
        <CarrosselPaises countries={filteredCountries} />
      ) : countries.length > 0 ? (
        <div className={styles.noResults}>
          <p>Nenhum país encontrado com os filtros selecionados.</p>
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
      ) : (
        <p style={{color: 'white', position: 'relative', zIndex: 2, fontSize: '1.2rem'}}>Carregando países...</p>
      )}
    </section>
  );
}
