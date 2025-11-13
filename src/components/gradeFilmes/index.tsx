"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './gradeFilmes.module.css';

interface ListaFilmes {
  id: number;
  titulo: string;
  sinopse: string;
  classificacao_indicativa: number;
  duracao: number;
  poster: string;
  ano_lancamento: string;
  produtora: string;
  IdGenero: number;
  status?: string;
}

export default function MovieGrid({ category }: { category: 'now-playing' | 'coming-soon' }) {
  const [filmes, setFilmes] = useState<ListaFilmes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const response = await fetch("http://localhost:3001/filme");
        
        if (!response.ok) {
          throw new Error(`Erro ao carregar filmes: ${response.status}`);
        }

        const todosFilmes: ListaFilmes[] = await response.json();
        
        let filmesFiltrados: ListaFilmes[] = [];
        
        if (category === 'now-playing') {
          filmesFiltrados = todosFilmes.filter(filme => 
            filme.status === 'em_cartaz'
          );
        } else {
          filmesFiltrados = todosFilmes.filter(filme => 
            filme.status === 'em_breve'
          );
        }
        
        setFilmes(filmesFiltrados);
      } catch (error: any) {
        console.error("Erro ao carregar filmes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    carregarFilmes();
  }, [category]);

  // REDIRECIONA PARA PÁGINA DE COMPRA COM QUERY PARAMETER
 const handleComprarIngresso = (filme: ListaFilmes) => {
  router.push(`/comprar-ingresso?id=${filme.id}`);
};

  const getClassificacao = (idade: number) => {
    if (idade >= 18) return "18";
    if (idade >= 16) return "16";
    if (idade >= 14) return "14";
    if (idade >= 12) return "12";
    if (idade >= 10) return "10";
    return "L";
  };

  if (loading) {
    return (
      <div className={styles.grid}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={styles.movieCard}>
            <div className={styles.posterContainer}>
              <div className={styles.posterLoading}>
                <div className={styles.rating}>...</div>
              </div>
            </div>
            <h3 className={styles.movieTitle}>Carregando...</h3>
            <button className={styles.buyButton} disabled>Carregando</button>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        Erro ao carregar filmes: {error}
      </div>
    );
  }

  if (filmes.length === 0) {
    return (
      <div className={styles.empty}>
        {category === 'now-playing' 
          ? 'Nenhum filme em cartaz no momento' 
          : 'Nenhum filme em breve'
        }
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {filmes.map((filme) => (
        <div key={filme.id} className={styles.movieCard}>
          <div className={styles.posterContainer}>
            {filme.poster ? (
              <img
                src={filme.poster.startsWith("/") ? filme.poster : `/${filme.poster}`}
                alt={`Poster do filme ${filme.titulo}`}
                className={styles.posterImage}
              />
            ) : (
              <div className={styles.posterPlaceholder}>
                🎬
                <span>Sem imagem</span>
              </div>
            )}
            <div className={styles.rating}>
              {getClassificacao(filme.classificacao_indicativa)}
            </div>
          </div>
          <h3 className={styles.movieTitle}>{filme.titulo}</h3>
          
          <button 
            className={styles.buyButton}
            onClick={() => handleComprarIngresso(filme)}
          >
            {category === 'now-playing' ? 'COMPRAR INGRESSO' : 'AVISE-ME'}
          </button>
        </div>
      ))}
    </div>
  );
}