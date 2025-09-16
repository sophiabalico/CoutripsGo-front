
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import styles from "../paises/paises.module.css";

export default function CarrosselPaises({ countries }) {
  console.log("CarrosselPaises received countries:", countries);
  
  return (
    <div className={styles.carrosselContainer}>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={30}
        loop={countries.length > 1}
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
        {countries && countries.length > 0 ? (
          countries.map((country) => (
            <SwiperSlide key={country.id} className={styles.swiperSlide}>
              <div className={styles.card}>
                <img src={`/imagens/${country.name.toLowerCase()}.png`} alt={country.name} />
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
