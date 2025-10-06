import styles from './NoResults.module.css';

export default function NoResults({ totalCountries, onClearFilters }) {
  return (
    <div className={styles.noResults}>
      <div className={styles.noResultsContent}>
        <div className={styles.noResultsIcon}>🔍</div>
        <p className={styles.noResultsText}>
          Nenhum país encontrado com os filtros selecionados
        </p>
        <p className={styles.totalCount}>
          Total de países disponíveis: {totalCountries}
        </p>
        <button 
          onClick={onClearFilters}
          className={styles.clearFiltersBtn}
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}