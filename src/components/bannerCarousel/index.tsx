'use client';

import { useState, useEffect } from 'react';
import styles from './bannerCarousel.module.css';

interface Banner {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className={styles.slide}>
            <div className={styles.slideContainer}>
              <div
                className={styles.slideImage}
                style={{ backgroundImage: `url(${banner.image})` }}
              ></div>
              <div className={styles.slideContent}>
                <h3 className={styles.bannerTitle}>{banner.title}</h3>
                <p className={styles.bannerDescription}>{banner.description}</p>
                <button className={styles.ctaButton}>Saiba Mais</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
