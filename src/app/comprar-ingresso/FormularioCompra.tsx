"use client";

import { useState } from 'react';

interface Filme {
  id: number;
  titulo: string;
  sinopse: string;
  classificacao_indicativa: number;
  duracao: number;
  poster: string;
}

export default function FormularioCompra({ filmeId, filme }: { filmeId: string; filme: Filme }) {
  const [tipo, setTipo] = useState('inteira');
  const [quantidade, setQuantidade] = useState(1);

  const calcularTotal = () => {
    const valorUnitario = tipo === 'meia' ? 15 : 30;
    return valorUnitario * quantidade;
  };

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
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
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
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
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

        <div style={{ 
          background: '#2a2a2a', 
          padding: '15px', 
          borderRadius: '6px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
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
          Finalizar Compra - R$ {calcularTotal().toFixed(2)}
        </button>
      </form>
    </div>
  );
}