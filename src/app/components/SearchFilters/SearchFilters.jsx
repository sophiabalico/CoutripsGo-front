import styles from './SearchFilters.module.css';

export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  selectedContinent,
  setSelectedContinent,
  availableContinents,
  filteredCount
}) {
  return (
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
              onChange={(e) => setSortOption(e.target.value)}
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
      {typeof filteredCount === 'number' && (
        <div className={styles.resultsCounter}>
          <span>{filteredCount} país{filteredCount !== 1 ? 'es' : ''} encontrado{filteredCount !== 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  );
}