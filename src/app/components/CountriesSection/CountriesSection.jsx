import { useRef } from 'react';
import CarrosselPaises from '../CarrosselPaises/CarrosselPaises';

export default function CountriesSection({ countries, showNavigation }) {
  const carrosselRef = useRef(null);

  return (
    <div ref={carrosselRef} data-countries="carrossel" id="countries-carousel">
      <CarrosselPaises 
        countries={countries} 
        showNavigation={showNavigation}
      />
    </div>
  );
}