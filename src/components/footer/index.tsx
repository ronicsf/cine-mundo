// src/components/footer/index.tsx
import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>
          CINE MUNDO
        </div>
        
        <nav className={styles.nav}>
          <a href="/sobre" className={styles.navLink}>Sobre</a>
          <a href="/contato" className={styles.navLink}>Contato</a>
          <a href="/privacidade" className={styles.navLink}>Privacidade</a>
          <a href="/termos" className={styles.navLink}>Termos</a>
        </nav>
        
        <div className={styles.social}>
          <a href="#" className={styles.socialLink}>Instagram</a>
          <a href="#" className={styles.socialLink}>Facebook</a>
          <a href="#" className={styles.socialLink}>Twitter</a>
        </div>
        
        <div className={styles.copyright}>
          © {new Date().getFullYear()} CINE MUNDO. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}