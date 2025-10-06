
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../../paises/paises.module.css";

export default function CarrosselPaises({ countries, showNavigation = true }) {
  const router = useRouter();
  const swiperRef = useRef(null);
  
  // Hook para forçar atualização do Swiper quando a janela redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        const swiper = swiperRef.current.swiper;
        if (typeof swiper.update === 'function' && !swiper.destroyed) {
          setTimeout(() => {
            swiper.update();
          }, 100);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  console.log("🎠 CarrosselPaises iniciado");
  console.log("📊 Countries recebidos:", countries);
  console.log("📈 Quantidade de países:", countries ? countries.length : 0);
  console.log("🔍 Tipo da prop countries:", typeof countries);
  console.log("📋 É array?", Array.isArray(countries));
  
  // Log da estrutura do primeiro país para debug
  if (countries && countries.length > 0) {
    console.log("🔍 Estrutura do primeiro país:", countries[0]);
    console.log("🖼️ Campo 'image' existe?", countries[0].image ? "SIM" : "NÃO");
    console.log("🏳️ Campo 'flag' existe?", countries[0].flag ? "SIM" : "NÃO");
    console.log("📍 Campo 'name' existe?", countries[0].name ? "SIM" : "NÃO");
    console.log("🆔 Campo 'id' existe?", countries[0].id ? "SIM" : "NÃO");
    console.log("📝 Nomes dos países:", countries.map(c => c.name));
  }

  // Verificação de segurança
  if (!countries || countries.length === 0) {
    console.log("⚠️ Nenhum país para exibir no carrossel (total:", countries?.length || 0, ")");
    return (
      <div className={styles.carrosselContainer}>
        <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
          Carregando países... (total recebido: {countries?.length || 0})
        </div>
      </div>
    );
  }
  
  // Função para obter a URL da imagem do backend
  const getCountryImage = (country) => {
    console.log(`🔍 Buscando imagem para país:`, country); // Debug
    
    // Se o país já tem uma URL de imagem da API, usa ela diretamente
    if (country.image) {
      console.log(`✅ Imagem encontrada na API: ${country.image}`); // Debug
      return country.image;
    }
    
    // Se tem um campo imageUrl
    if (country.imageUrl) {
      console.log(`✅ ImageUrl encontrada na API: ${country.imageUrl}`); // Debug
      return country.imageUrl;
    }
    
    // Se tem um campo photo
    if (country.photo) {
      console.log(`✅ Photo encontrada na API: ${country.photo}`); // Debug
      return country.photo;
    }
    
    // Normaliza o nome do país para construir a URL
    const normalizedName = country.name
      .toLowerCase()
      .normalize('NFD')                           // Remove acentos
      .replace(/[\u0300-\u036f]/g, '')           
      .replace(/\s+/g, '')                       // Remove espaços
      .replace(/[^a-z0-9]/g, '');                // Remove caracteres especiais
    
    // Constrói a URL baseada no padrão do seu backend
    const imageUrl = `http://localhost:5000/public/image/${normalizedName}.png`;
    console.log(`🌐 URL construída: ${imageUrl}`); // Debug
    
    return imageUrl;
  };

  // Função para lidar com erro de carregamento de imagem
  const handleImageError = (e) => {
    console.log(`❌ Erro ao carregar: ${e.target.src}`); // Debug
    
    const currentSrc = e.target.src;
    
    // Tenta URLs alternativas
    if (currentSrc.includes('/public/image/')) {
      // Tenta sem o 'public'
      e.target.src = currentSrc.replace('/public/image/', '/image/');
      console.log(`🔄 Tentando sem 'public': ${e.target.src}`);
    } else if (currentSrc.includes('/image/') && !currentSrc.includes('/images/')) {
      // Tenta com 'images' plural
      e.target.src = currentSrc.replace('/image/', '/images/');
      console.log(`🔄 Tentando 'images' plural: ${e.target.src}`);
    } else {
      // Fallback final
      e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
      console.log(`🚫 Usando fallback externo`);
    }
  };

  // Função para navegar para a página de detalhes do país
  const handleCountryClick = (country) => {
    console.log(`🔗 Navegando para detalhes do país:`, country);
    const countryId = country.id || country._id || country.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/paises/${countryId}`);
  };
  
  return (
    <div className={styles.carrosselContainer}>
      <Swiper
        ref={swiperRef}
        slidesPerView="auto"
        spaceBetween={15}
        loop={false}
        centeredSlides={false}
        navigation={showNavigation ? {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        } : false}
        modules={showNavigation ? [Navigation] : []}
        className={`${styles.swiper} ${!showNavigation ? styles.swiperNoNavigation : ''}`}
        onSwiper={(swiper) => {
          // Configuração inicial segura
          setTimeout(() => {
            if (swiper && typeof swiper.update === 'function' && !swiper.destroyed) {
              swiper.update();
            }
          }, 100);
        }}
        onResize={(swiper) => {
          // Atualização segura no redimensionamento
          if (swiper && typeof swiper.update === 'function' && !swiper.destroyed) {
            swiper.update();
          }
        }}
        watchSlidesProgress={true}
        updateOnWindowResize={true}
        breakpoints={{
          // Mobile muito pequeno (até 320px)
          280: {
            slidesPerView: 1,
            spaceBetween: 8,
            centeredSlides: true,
          },
          // Mobile pequeno (até 480px)
          320: {
            slidesPerView: 1.1,
            spaceBetween: 10,
            centeredSlides: false,
          },
          // Mobile médio
          400: {
            slidesPerView: 1.3,
            spaceBetween: 12,
          },
          // Mobile grande / Tela dividida muito pequena
          480: {
            slidesPerView: 1.5,
            spaceBetween: 14,
          },
          // Tela dividida pequena
          550: {
            slidesPerView: 1.7,
            spaceBetween: 16,
          },
          // Tela dividida média
          620: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          // Tablet pequeno / Tela dividida grande
          720: {
            slidesPerView: 2.3,
            spaceBetween: 20,
          },
          // Tablet médio
          820: {
            slidesPerView: 2.6,
            spaceBetween: 22,
          },
          // Tablet grande
          920: {
            slidesPerView: 2.9,
            spaceBetween: 24,
          },
          // Desktop muito pequeno
          1020: {
            slidesPerView: 3.2,
            spaceBetween: 26,
          },
          // Desktop pequeno
          1120: {
            slidesPerView: 3.5,
            spaceBetween: 28,
          },
          // Desktop médio
          1220: {
            slidesPerView: 3.8,
            spaceBetween: 30,
          },
          // Desktop grande
          1320: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          // Desktop muito grande
          1420: {
            slidesPerView: 4.3,
            spaceBetween: 32,
          },
          // Tela ultra-wide
          1520: {
            slidesPerView: 4.6,
            spaceBetween: 34,
          },
          // 2K Resolution
          1620: {
            slidesPerView: 5,
            spaceBetween: 36,
          },
          // 4K Resolution
          1920: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
        }}
      >
        {countries && countries.length > 0 ? (
          countries.map((country, index) => {
            console.log(`🎴 Renderizando card ${index + 1}: ${country.name} (ID: ${country.id})`);
            return (
              <SwiperSlide key={country.id || index} className={styles.swiperSlide}>
                <div 
                  className={styles.card}
                  onClick={() => handleCountryClick(country)}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={getCountryImage(country)} 
                    alt={`Paisagem de ${country.name}`}
                    onError={handleImageError}
                    loading="lazy"
                  />
                  <div className={styles.overlay}></div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.countryName}>{country.name}</h3>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <div>Nenhum país encontrado</div>
        )}
        
        {/* Setas de navegação */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
}
