import styles from "./slider.module.css";
import { useEffect, useState } from "react";
import { sliderImages } from "../../../constants/constants.js";
import { Link } from "react-router-dom";
export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;
  useEffect(() => {
    timeOut =
      autoPlay &&
      setTimeout(() => {
        nextSlide();
      }, 2500);
  });

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 4 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 4 ? 0 : currentSlide + 1);
  };
  return (
    <div className={styles.slider}>
      <div
        className={styles.container}
        onMouseEnter={() => {
          setAutoPlay(false);
          clearTimeout(timeOut);
        }}
        onMouseLeave={() => {
          setAutoPlay(true);
        }}
      >
        {sliderImages.map((image, index) => {
          return (
            <div
              key={index}
              className={`${styles.carouselCard} ${
                index == currentSlide
                  ? styles.carouselCardActive
                  : styles.carouselCard
              }`}
            >
              <img
                className={styles.cardImage}
                src={image.url}
                alt={image.title}
              />
              <div className={styles.cardOverlay}>
                <Link to={image.link} className="link">
                  <h2 className={styles.cardTitle}>{image.title}</h2>
                </Link>
              </div>
            </div>
          );
        })}
        <div className={styles.carouselArrowLeft} onClick={prevSlide}>
          &lsaquo;
        </div>
        <div className={styles.carouselArrowRight} onClick={nextSlide}>
          &rsaquo;
        </div>
        <div className={styles.carouselPagination}>
          {sliderImages.map((_, index) => {
            return (
              <div
                key={index}
                className={`${styles.carouselPaginationDot} ${
                  index == currentSlide
                    ? styles.carouselPaginationDotActive
                    : styles.carouselPaginationDot
                }`}
                onMouseOver={() => setCurrentSlide(index)}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
