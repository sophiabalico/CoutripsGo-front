"use client";

import styles from './paises.module.css';
import SearchFilters from '../components/SearchFilters/SearchFilters';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import LoadingMessage from '../components/LoadingMessage/LoadingMessage';
import NoResults from '../components/NoResults/NoResults';
import CountriesSectionBackend from '../components/CountriesSectionBackend/CountriesSectionBackend';
import { useCountriesBackend } from '../components/hooks/useCountriesBackend';
import { useCountryFiltersBackend } from '../components/hooks/useCountryFiltersBackend';

export default function PaisesPage() {
  const { countries, loading, error, availableContinents } = useCountriesBackend();
  
  const {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    selectedContinent,
    setSelectedContinent,
    filteredCountries,
    clearFilters
  } = useCountryFiltersBackend(countries, availableContinents);

  const renderContent = () => {
    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (loading) {
      return <LoadingMessage />;
    }

    if (filteredCountries.length > 0) {
      return (
        <CountriesSectionBackend 
          countries={filteredCountries} 
          showNavigation={selectedContinent === "all" && !searchQuery.trim()}
          sortOption={sortOption}
          selectedContinent={selectedContinent}
        />
      );
    }

    if (countries.length > 0) {
      return (
        <NoResults 
          totalCountries={countries.length}
          onClearFilters={clearFilters}
        />
      );
    }

    return (
      <LoadingMessage message={`Nenhum país encontrado (total: ${countries.length})`} />
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.overlay}></div>
      <h2 className={styles.title}>Escolha seu Destino</h2>
      
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        selectedContinent={selectedContinent}
        setSelectedContinent={setSelectedContinent}
        availableContinents={availableContinents}
        filteredCount={filteredCountries.length}
      />

      {renderContent()}
    </section>
  );
}
