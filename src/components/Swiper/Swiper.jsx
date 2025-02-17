// import Swiper from "swiper";
import "swiper/css";
import "./Swiper.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, EffectFlip } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import pic1 from "../../assets/slider/pic1.jpg";
import pic2 from "../../assets/slider/pic4.jpg";
import pic3 from "../../assets/slider/pic3.jpg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const swiperItems = [
  {
    id: 1,
    image: pic1,
    header1: "tool.header1_1",
    description: "tool.description_1",
    button: "button.learn_more",
    link: "/services/team-building",
  },
  {
    id: 2,
    image: pic2,
    header1: "tool.header1_2",
    description: "tool.description_2",
    button: "button.explore",
    link: "/services/custom-stands",
  },
  {
    id: 3,
    image: pic3,
    header1: "tool.header1_3",
    description: "tool.description_3",
    button: "button.explore_exp",
    link: "/services/global-support",
  },
];

export default function App() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="forswiper">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect={"Flip"}
        speed={1500}
        autoplay={{
          delay: 3500,
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
                <button onClick={() => navigate(item.link)}>
                  {t(item.button)}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
