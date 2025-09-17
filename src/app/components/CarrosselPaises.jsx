
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import styles from "../paises/paises.module.css";

export default function CarrosselPaises({ countries }) {
  console.log("CarrosselPaises received countries:", countries);
  
  // Função para embaralhar array (algoritmo Fisher-Yates)
  const shuffleArray = (array) => {
    const shuffled = [...array]; // Cria uma cópia para não modificar o original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Embaralha os países para não ficarem em ordem alfabética
  const shuffledCountries = countries && countries.length > 0 ? shuffleArray(countries) : [];
  
  // URLs das imagens dos países
  const countryImages = {
    "Chile": "/imagens/chile.png", 
    "Brasil": "/imagens/brasil.png",
    "Austrália": "/imagens/australia.png",
    "Alemanha": "imagens/alemanha.png", 
    "Polônia": "/imagens/polonia.png",
    "Nova Zelândia": "/imagens/novazelandia.png",
    "Japão": "/imagens/japao.png",
    "Italia": "/imagens/italia.png",
    "França": "/imagens/franca.png",
    "Egito": "/imagens/egito.png",
    "Estados Unidos": "/imagens/eua.png",
    "Tailândia": "/imagens/tailandia.png",
    "Suíça": "/imagens/suica.png",
    "Itália": "/imagens/italia.png",
    "Islândia": "/imagens/islandia.png",
    "Grécia": "/imagens/grecia.png",
  };
  
  // Função para obter a URL da imagem
  const getCountryImage = (countryName) => {
    console.log(`Buscando imagem para: "${countryName}"`); // Debug
    const image = countryImages[countryName] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
    console.log(`Imagem encontrada: ${image}`); // Debug
    return image;
  };

  // Função para lidar com erro de carregamento de imagem
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"; // fallback
  };
  
  return (
    <div className={styles.carrosselContainer}>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={30}
        loop={shuffledCountries.length > 1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className={styles.swiper}
      >
        {shuffledCountries && shuffledCountries.length > 0 ? (
          shuffledCountries.map((country) => (
            <SwiperSlide key={country.id} className={styles.swiperSlide}>
              <div className={styles.card}>
                <img 
                  src={getCountryImage(country.name)} 
                  alt={country.name}
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className={styles.overlay}></div>
                <h3 className={styles.countryName}>{country.name}</h3>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div>Nenhum país encontrado</div>
        )}
        <div className="swiper-button-prev" style={{color: '#26658c', fontSize: '2rem', left: 0}}></div>
        <div className="swiper-button-next" style={{color: '#26658c', fontSize: '2rem', right: 0}}></div>
      </Swiper>
    </div>
  );
}
