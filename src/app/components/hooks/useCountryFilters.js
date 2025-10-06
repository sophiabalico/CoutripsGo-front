import { useState, useMemo } from 'react';

export function useCountryFilters(countries) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("original");
  const [selectedContinent, setSelectedContinent] = useState("all");

  const availableContinents = useMemo(() => {
    if (!countries || countries.length === 0) return [];
    const continents = [...new Set(countries.map(country => country.continent))];
    return continents.filter(continent => continent && continent !== 'Continente não disponível').sort();
  }, [countries]);

  const filterAndSortCountries = useMemo(() => {
    if (!countries || countries.length === 0) return [];

    let filtered = countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          country.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          country.region.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesContinent = selectedContinent === "all" || country.continent === selectedContinent;
      
      return matchesSearch && matchesContinent;
    });

    // Aplicar ordenação
    switch (sortOption) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "continent":
        filtered.sort((a, b) => {
          const continentComparison = a.continent.localeCompare(b.continent);
          if (continentComparison !== 0) return continentComparison;
          return a.name.localeCompare(b.name);
        });
        break;
      case "original":
      default:
        // Manter ordem original (não fazer nada)
        break;
    }

    return filtered;
  }, [countries, searchQuery, sortOption, selectedContinent]);

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
    availableContinents,
    filteredCountries: filterAndSortCountries,
    clearFilters
  };
}