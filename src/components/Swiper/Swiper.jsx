// import Swiper from "swiper";
import "swiper/css";
import "./Swiper.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, EffectFlip } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import pic1 from "../../assets/slider/pic1.jpg";
import pic2 from "../../assets/slider/pic2.avif";
import pic3 from "../../assets/slider/pic3.jpg";
import { useTranslation } from "react-i18next";

const swiperItems = [
  {
    id: 1,
    image: pic1,
    header1: "tool.header1_1",
    description: "tool.description_1",
    button: "button.learn_more",
    link: "/products/664e88294cf5a42abd0b5e35",
  },
  {
    id: 2,
    image: pic2,
    header1: "tool.header1_2",
    description: "tool.description_2",
    button: "button.explore",
    link: "/products/664e87fc4cf5a42abd0b5e33",
  },
  {
    id: 3,
    image: pic3,
    header1: "tool.header1_3",
    description: "tool.description_3",
    button: "button.explore_exp",

    link: "/products/664e88614cf5a42abd0b5e37",
  },
];

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="forswiper">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        effect={"Flip"}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        navigation={true}
        modules={[EffectFlip, Navigation, Autoplay]}
        className="mySwiper"
      >
        {swiperItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="iamtesting">
              <img src={item.image} className="slider-image" />
              <div className="iamtestinginside">
                <h1>{t(item.header1)}</h1>
                <p>{t(item.description)}</p>
                <button>
                  <a href={item.link}>{t(item.button)}</a>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
