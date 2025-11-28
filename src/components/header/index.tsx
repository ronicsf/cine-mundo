// src/components/header/index.tsx
import styles from './header.module.css';
import Link from 'next/link';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">CINEMUNDO</Link>
      </div>
      
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/ingresso" className={styles.navLink}>Ingressos</Link>
        <Link href="/promocoes" className={styles.navLink}>Promoções</Link>
        <Link href="/cinemas" className={styles.navLink}>Cinemas</Link>
      </nav>

      <div className={styles.auth}>
        <Link href="/login" className={styles.loginButton}>
          Minha Conta
        </Link>
      </div>
    </header>
  );
}