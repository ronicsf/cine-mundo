import styles from './promocoes.module.css';
import BannerCarousel from '../../components/bannerCarousel';

const banners = [
  {
    id: 1,
    title: "Compre 1 e leve 2",
    image: "/banner1.png", // Substitua pelo caminho do seu banner
    description: "Na compra de 1 ingresso, ganhe outro grátis!"
  },
  {
    id: 2,
    title: "Promoção leve mais",
    image: "/promopipoca.png", // Substitua pelo caminho do seu banner
    description: "Na compra de 2 ingressos, ganhe 1 pipoca grande grátis!"
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

      <section className={styles.loyaltySection}>
        <h2 className={styles.loyaltyTitle}>Plano de Fidelidade CineMundo</h2>
        <p className={styles.loyaltyDescription}>
          Acumulando pontos a cada compra, você ganha benefícios exclusivos no CineMundo!
        </p>

        <div className={styles.loyaltyPlans}>
          {/* PLANO BÁSICO */}
          <div className={`${styles.plan} ${styles.planBasic}`}>
            <h3>Plano Básico</h3>
            <p>Acumule 100 pontos por ingresso comprado.</p>
            <p>Resgate 1 ingresso grátis a cada 1000 pontos.</p>
            <p>Aniversário: 50% de desconto em 1 ingresso.</p>
          </div>

          {/* PLANO PREMIUM */}
          <div className={`${styles.plan} ${styles.planPremium}`}>
            <h3>Plano Premium</h3>
            <p>Acumule 150 pontos por ingresso comprado.</p>
            <p>Resgate 1 ingresso grátis a cada 800 pontos.</p>
            <p>Aniversário: 1 ingresso grátis + combo completo.</p>
            <p>Convide amigos: Ganhe pontos extras por indicações.</p>
          </div>

          {/* PLANO VIP */}
          <div className={`${styles.plan} ${styles.planVip}`}>
            <h3>Plano VIP</h3>
            <p>Acumule 200 pontos por ingresso comprado.</p>
            <p>Resgate 1 ingresso grátis a cada 600 pontos.</p>
            <p>Aniversário: 2 ingressos grátis + combo premium.</p>
            <p>Acesso antecipado a pré-estreias e sessões especiais.</p>
            <p>Atendimento prioritário e lounge exclusivo.</p>
          </div>
        </div>

        <div className={styles.loyaltyBenefits}>
          <h3>Benefícios Adicionais</h3>
          <ul>
            <li>Descontos em combos de pipoca e bebidas</li>
            <li>Convites para eventos especiais</li>
            <li>Personalização de assentos preferenciais</li>
            <li>Newsletter com promoções exclusivas</li>
          </ul>
        </div>

        <div className={styles.joinNow}>
          <button className={styles.joinButton}>Cadastre-se Agora</button>
        </div>
      </section>
    </div>
  );
}
