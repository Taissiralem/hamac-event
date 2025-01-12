"use client";
import { useEffect, useRef } from "react";
import City2 from "../../assets/slider/pic1.jpg";
import City from "../../assets/Rectangle1.webp";

import "./AboutUs.css";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  const countersRef = useRef([]);

  useEffect(() => {
    const counters = countersRef.current;
    const animateCounter = (counter, endValue) => {
      let startValue = 0;
      const duration = 2000;
      const step = endValue / (duration / 16);

      const updateCounter = () => {
        startValue += step;
        if (startValue >= endValue) {
          counter.innerText = endValue;
        } else {
          counter.innerText = Math.ceil(startValue);
          requestAnimationFrame(updateCounter);
        }
      };
      updateCounter();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counterElement = entry.target;
            const endValue = parseInt(
              counterElement.getAttribute("data-end"),
              10
            );
            animateCounter(counterElement, endValue);
            observer.unobserve(counterElement);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about-section">
      <div className="forabout">
        <div className="forimgabout">
          <img src={City2} alt="Img" />
        </div>
        <div className="fortextabout">
          <h1>{t("titleabout")}</h1>
          <h2>{t("subtitle1")}</h2>
          <p>{t("description1")}</p>
          <h2>{t("subtitle2")}</h2>
          <p>{t("description2")}</p>
        </div>
      </div>

      <div className="forabout">
        <div
          className="fortextabout"
          style={{ textAlign: "left", marginRight: "30px" }}
        >
          <h1 style={{ marginBottom: "10px" }}>{t("title2")}</h1>
          <h2 style={{ fontSize: "22px" }}>{t("subtitle3")}</h2>
          <div className="statsabout">
            <div>
              <div className="forcounter">
                <h4>+</h4>
                <h4 ref={(el) => (countersRef.current[0] = el)} data-end="11">
                  0
                </h4>
              </div>
              <h2>{t("readyToUse")}</h2>
            </div>
            <div>
              <div className="forcounter">
                <h4 ref={(el) => (countersRef.current[1] = el)} data-end="99">
                  0
                </h4>
                <h4>%</h4>
              </div>
              <h2>{t("satisfaction")}</h2>
            </div>
          </div>
          <div className="buttonsabout">
            <button>{t("contactButton")}</button>
            <button>{t("bookButton")}</button>
          </div>
        </div>
        <div className="forimgabout">
          <img src={City} alt="Img" width={450} height={450} />
        </div>
      </div>
    </section>
  );
}
