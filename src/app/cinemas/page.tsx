import styles from './cinemas.module.css';

export default function CinemasPage() {
  const cinemas = [
    {
      nome: 'Cinemark Shopping Eldorado',
      endereco: 'Av. Rebouças, 3970 - Pinheiros, São Paulo - SP',
      telefone: '(11) 2197-0700'
    },
    {
      nome: 'Cinemark Shopping Morumbi',
      endereco: 'Av. Roque Petroni Jr, 1089 - Vila Gertrudes, São Paulo - SP',
      telefone: '(11) 5181-4700'
    },
    {
      nome: 'Cinemark Rio Design Barra',
      endereco: 'Av. das Américas, 7777 - Barra da Tijuca, Rio de Janeiro - RJ',
      telefone: '(21) 3038-9300'
    },
    {
      nome: 'Cinemark Shopping Recife',
      endereco: 'Rua Padre Carapuceiro, 777 - Boa Viagem, Recife - PE',
      telefone: '(81) 3465-5000'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cinemas Cinermark</h1>
        <p className={styles.subtitle}>Encontre a localização dos cinemas Cinermark mais próximos</p>
      </div>

      <div className={styles.cinemasGrid}>
        {cinemas.map((cinema, index) => (
          <div key={index} className={styles.cinemaCard}>
            <h3 className={styles.cinemaNome}>{cinema.nome}</h3>
            <p className={styles.cinemaEndereco}>{cinema.endereco}</p>
            <p className={styles.cinemaTelefone}>{cinema.telefone}</p>
            <button className={styles.verLocalizacaoBtn}>Ver Localização</button>
          </div>
        ))}
      </div>
    </div>
  );
}
