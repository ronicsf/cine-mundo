import styles from './promocoes.module.css';
import BannerCarousel from '../../components/bannerCarousel';

const banners = [
  {
    id: 1,
    title: "Promoção 1",
    image: "/banner1.png", // Substitua pelo caminho do seu banner
    description: "Descrição da promoção 1"
  },
  {
    id: 2,
    title: "Promoção 2",
    image: "/banner2.jpg", // Substitua pelo caminho do seu banner
    description: "Descrição da promoção 2"
  },
  // Adicione mais banners aqui conforme necessário
];

export default function Promocoes() {
  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <h1 className={styles.pageTitle}>Promoções</h1>
        <BannerCarousel banners={banners} />
      </section>
    </div>
  );
}
