import AboutUs from "../../components/AboutUs/AboutUs.jsx";
import NosServices from "../../components/NosServices/NosServices.jsx";
import ContactPage from "../../components/Contact/page.jsx";
import Swiper from "../../components/Swiper/Swiper.jsx";

export default function Home() {
  return (
    <>
      <Swiper></Swiper>
      <AboutUs></AboutUs>
      <NosServices></NosServices>
      <ContactPage></ContactPage>
    </>
  );
}
