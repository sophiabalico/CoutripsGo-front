import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useCountriesBackend() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableContinents, setAvailableContinents] = useState([]);

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

  const fetchCountries = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return {
    countries,
    loading,
    error,
    availableContinents,
    fetchCountries
  };
}