// app/page.tsx
import styles from './page.module.css';
import MovieCarousel from '../components/carrosel'; // ← Corrigido o caminho
import MovieGrid from '../components/gradeFilmes';  // ← Corrigido o caminho

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <MovieCarousel />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Em Cartaz</h2>
        <MovieGrid category="now-playing" />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Em Breve</h2>
        <MovieGrid category="coming-soon" />
      </section>
    </div>
  );
}


