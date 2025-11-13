// src/components/MovieCarousel.tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './carrosel.module.css';

const featuredMovies = [
  {
    id: 1,
    title: "Duna: Parte Dois",
    image: "/images/duna2.jpg",
    description: "A jornada de Paul Atreides continua"
  },
  {
    id: 2, 
    title: "Deadpool & Wolverine",
    image: "/images/deadpool.jpg",
    description: "A dupla mais aguardada dos cinemas"
  },
  {
    id: 3,
    title: "Godzilla e Kong",
    image: "/kong.jpg", 
    description: "O novo capítulo do Monsterverse"
  }
];

export default function MovieCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.carousel}>
      <div 
        className={styles.slides}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featuredMovies.map((movie) => (
          <div key={movie.id} className={styles.slide}>
            <div 
              className={styles.slideImage}
              style={{ backgroundImage: `url(${movie.image})` }}
            >
              <div className={styles.slideContent}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <p className={styles.movieDescription}>{movie.description}</p>
                <button className={styles.ctaButton}>Comprar Ingressos</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.dots}>
        {featuredMovies.map((_, index) => (
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