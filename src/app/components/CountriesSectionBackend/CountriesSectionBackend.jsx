import { useRef, useEffect } from 'react';
import CarrosselPaises from '../CarrosselPaises/CarrosselPaises';

export default function CountriesSectionBackend({ countries, showNavigation, sortOption, selectedContinent }) {
  const carrosselRef = useRef(null);

  // Rolar para o primeiro país quando qualquer filtro mudar
  useEffect(() => {
    if (countries.length > 0) {
      // Aguarda um pouco para garantir que o carrossel foi renderizado
      setTimeout(() => {
        // Prioridade 1: Usar a ref do carrossel
        if (carrosselRef.current) {
          carrosselRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          return;
        }
        
        // Prioridade 2: Usar o ID específico
        const carouselById = document.getElementById('countries-carousel');
        if (carouselById) {
          carouselById.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          return;
        }
        
        // Prioridade 3: Usar o atributo data
        const carouselByData = document.querySelector('[data-countries="carrossel"]');
        if (carouselByData) {
          carouselByData.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          return;
        }
        
        }, 500); // Timeout maior para garantir renderização completa
    }
  }, [sortOption, selectedContinent, countries.length]); // Dispara quando o filtro de ordenação OU continente mudar

  return (
    <div ref={carrosselRef} data-countries="carrossel" id="countries-carousel">
      <CarrosselPaises 
        countries={countries} 
        showNavigation={showNavigation}
      />
    </div>
  );
}