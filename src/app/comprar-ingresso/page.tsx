import { redirect } from 'next/navigation';

interface Filme {
  id: number;
  titulo: string;
  sinopse: string;
  classificacao_indicativa: number;
  duracao: number;
  poster: string;
}

// Função para buscar dados do filme
async function carregarFilme(id: string): Promise<Filme | null> {
  try {
    const response = await fetch(`http://localhost:3001/filme/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) return null;
    
    const filmes = await response.json();
    return filmes[0] || null;
  } catch (error) {
    console.error('Erro ao carregar filme:', error);
    return null;
  }
}

function FormularioCompra({ filmeId }: { filmeId: string }) {
  return (
    <div style={{ 
      padding: '30px', 
      background: '#1a1a1a',
      borderRadius: '12px',
      maxWidth: '600px'
    }}>
      <h3 style={{ marginBottom: '25px' }}>Formulário de Compra</h3>
      
      <form action="/api/comprar" method="POST">
        <input type="hidden" name="filmeId" value={filmeId} />
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Tipo de Ingresso:
          </label>
          <select 
            name="tipo" 
            style={{ 
              width: '100%', 
              padding: '12px',
              background: '#2a2a2a',
              color: 'white',
              border: '1px solid #444',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            required
          >
            <option value="inteira">Inteira - R$ 30,00</option>
            <option value="meia">Meia - R$ 15,00</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Quantidade:
          </label>
          <input 
            type="number" 
            name="quantidade" 
            min="1" 
            max="10" 
            defaultValue="1"
            style={{ 
              width: '100%', 
              padding: '12px',
              background: '#2a2a2a',
              color: 'white',
              border: '1px solid #444',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            required
          />
        </div>

        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            background: '#e50914',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          Finalizar Compra
        </button>
      </form>
    </div>
  );
}

export default async function ComprarIngresso(props: {
  searchParams: Promise<{ id?: string }>
}) {
  // Aguarda os searchParams
  const searchParams = await props.searchParams;
  const filmeId = searchParams.id;

  // Se não tem ID, redireciona para home
  if (!filmeId) {
    redirect('/');
  }

  // Carrega dados do filme
  const filme = await carregarFilme(filmeId);

  // Se filme não existe, redireciona
  if (!filme) {
    redirect('/');
  }

  return (
    <div style={{ 
      padding: '40px', 
      background: '#0a0a0a', 
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🎫 Comprar Ingresso</h1>
      <p style={{ color: '#0f0' }}>✅ Funcionando com dados da API!</p>
      
      {/* Informações do Filme */}
      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        marginBottom: '40px',
        background: '#1a1a1a',
        padding: '30px',
        borderRadius: '12px'
      }}>
        <div style={{ width: '200px', flexShrink: 0 }}>
          {filme.poster ? (
            <img 
              src={filme.poster} 
              alt={filme.titulo}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          ) : (
            <div style={{ 
              width: '100%', 
              height: '300px', 
              background: '#2a2a2a',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}>
              🎬
            </div>
          )}
        </div>
        
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>{filme.titulo}</h2>
          <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '15px' }}>
            {filme.sinopse}
          </p>
          <div style={{ display: 'flex', gap: '20px', color: '#888' }}>
            <span>Duração: {filme.duracao}min</span>
            <span>Classificação: {filme.classificacao_indicativa} anos</span>
          </div>
        </div>
      </div>

      {/* Formulário de Compra */}
      <FormularioCompra filmeId={filmeId} />

      <div style={{ marginTop: '30px' }}>
        <a href="/" style={{ color: '#e50914', textDecoration: 'none', fontSize: '16px' }}>
          ← Voltar para Home
        </a>
      </div>
    </div>
  );
}