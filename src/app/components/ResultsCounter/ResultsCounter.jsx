import styles from './ResultsCounter.module.css';

export default function ResultsCounter({ count }) {
  return (
    <div className={styles.resultsCounter}>
      <span>
        {count} país{count !== 1 ? 'es' : ''} encontrado{count !== 1 ? 's' : ''}
      </span>
    </div>
  );
}