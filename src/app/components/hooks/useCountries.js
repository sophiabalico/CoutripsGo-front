import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://restcountries.com/v3.1/all');
      
      if (!response.data) {
        throw new Error('Nenhum dado recebido da API');
      }

      const formattedCountries = response.data.map(country => ({
        id: country.cca3,
        name: country.name?.common || 'Nome não disponível',
        capital: country.capital?.[0] || 'Capital não disponível',
        population: country.population || 0,
        region: country.region || 'Região não disponível',
        subregion: country.subregion || 'Sub-região não disponível',
        area: country.area || 0,
        flag: country.flags?.png || country.flags?.svg || '/image/default-country.jpg',
        languages: country.languages || {},
        currencies: country.currencies || {},
        timezones: country.timezones || [],
        borders: country.borders || [],
        continent: country.continents?.[0] || country.region || 'Continente não disponível'
      }));

      setCountries(formattedCountries);
    } catch (err) {
      console.error('Erro ao buscar países:', err);
      setError(`Erro ao carregar países: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const extractUniqueContinents = (countriesList) => {
    const continents = [...new Set(countriesList.map(country => country.continent))];
    return continents.filter(continent => continent && continent !== 'Continente não disponível').sort();
  };

  return {
    countries,
    loading,
    error,
    fetchCountries,
    extractUniqueContinents
  };
}