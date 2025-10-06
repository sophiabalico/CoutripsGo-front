import { useState, useMemo, useEffect, useCallback } from 'react';

export function useCountryFiltersBackend(countries, availableContinents) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("original");
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Função para normalizar texto (remover acentos, espaços extras, etc.)
  const normalizeText = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .normalize('NFD')                           // Decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '')           // Remover marcas diacríticas (acentos)
      .replace(/[^a-z0-9\s]/g, '')               // Remover caracteres especiais
      .replace(/\s+/g, ' ')                      // Normalizar espaços
      .trim();
  };

  // Função para filtrar e ordenar países
  const filterAndSortCountries = useCallback((countries, query, sort, continent) => {
    // Função para verificar se o país corresponde à busca
    const matchesSearchQuery = (country, query) => {
      if (!query || query.trim() === "") return true;
      
      const normalizedQuery = normalizeText(query);
      const normalizedName = normalizeText(country.name);
      
      // Se a busca for apenas uma letra, só retorna países que COMEÇAM com essa letra
      if (normalizedQuery.length === 1) {
        return normalizedName.startsWith(normalizedQuery);
      }
      
      // Para buscas com mais de uma letra, mantém a busca inteligente
      // Busca por:
      // 1. Início do nome (prioridade)
      // 2. Nome completo (inclui busca parcial)
      // 3. Palavras individuais do nome
      return normalizedName.startsWith(normalizedQuery) ||
             normalizedName.includes(normalizedQuery) ||
             normalizedName.split(' ').some(word => 
               word.startsWith(normalizedQuery) || 
               word.includes(normalizedQuery)
             );
    };
    
    // Primeiro filtrar por texto de pesquisa com busca inteligente
    let filtered = countries.filter(country => matchesSearchQuery(country, query));

    // Filtrar por continente se não for "all" e se a ordenação for "continent"
    if (sort === "continent" && continent !== "all") {
      
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
  }, []);

  // Atualizar países filtrados quando houver mudanças
  useEffect(() => {
    const filtered = filterAndSortCountries(countries, searchQuery, sortOption, selectedContinent);
    setFilteredCountries(filtered);
  }, [countries, searchQuery, sortOption, selectedContinent, filterAndSortCountries]);

  const clearFilters = () => {
    setSearchQuery("");
    setSortOption("original");
    setSelectedContinent("all");
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    if (value !== "continent") {
      setSelectedContinent("all");
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption: handleSortChange,
    selectedContinent,
    setSelectedContinent,
    filteredCountries,
    clearFilters
  };
}