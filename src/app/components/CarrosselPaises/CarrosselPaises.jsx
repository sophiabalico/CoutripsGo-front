
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import styles from "../../paises/paises.module.css";

export default function CarrosselPaises({ countries }) {
  const router = useRouter();
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
        key={`swiper-${countries?.length || 0}-${countries?.map(c => c.id || c.name).join(',').substring(0, 50)}`}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={0}
        loop={countries && countries.length > 1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          // Mobile Portrait - 320px até 479px
          320: {
            slidesPerView: 3,
            spaceBetween: 0,
            coverflowEffect: {
              rotate: 60,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }
          },
          // Mobile Landscape - 480px até 639px
          480: {
            slidesPerView: 3,
            spaceBetween: 0,
            coverflowEffect: {
              rotate: 55,
              stretch: 0,
              depth: 250,
              modifier: 1,
              slideShadows: false,
            }
          },
          // Tablet Portrait - 640px até 767px
          640: {
            slidesPerView: 3,
            spaceBetween: 0,
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 280,
              modifier: 1,
              slideShadows: false,
            }
          },
          // Tablet Landscape - 768px até 1023px
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 300,
              modifier: 1,
              slideShadows: false,
            }
          },
          // Desktop Small - 1024px até 1279px
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
            coverflowEffect: {
              rotate: 45,
              stretch: 0,
              depth: 320,
              modifier: 1,
              slideShadows: false,
            }
          },
          // Desktop Large - 1280px até 1439px
          1280: {
            slidesPerView: 3,
            spaceBetween: 0,
            coverflowEffect: {
              rotate: 45,
              stretch: 0,
              depth: 350,
              modifier: 1,
              slideShadows: false,
            }
          },
          // Desktop XL - 1440px+
          1440: {
            slidesPerView: 3,
            spaceBetween: 0,
            coverflowEffect: {
              rotate: 40,
              stretch: 0,
              depth: 400,
              modifier: 1,
              slideShadows: false,
            }
          }
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className={styles.swiper}
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
        
        {/* Navegação responsiva */}
        <div className="swiper-button-prev" style={{
          color: '#26658c', 
          fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', 
          left: 'clamp(5px, 2vw, 20px)',
          width: 'clamp(40px, 6vw, 60px)',
          height: 'clamp(40px, 6vw, 60px)',
          marginTop: 'clamp(-20px, -3vw, -30px)'
        }}></div>
        <div className="swiper-button-next" style={{
          color: '#26658c', 
          fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', 
          right: 'clamp(5px, 2vw, 20px)',
          width: 'clamp(40px, 6vw, 60px)',
          height: 'clamp(40px, 6vw, 60px)',
          marginTop: 'clamp(-20px, -3vw, -30px)'
        }}></div>
      </Swiper>
    </div>
  );
}
