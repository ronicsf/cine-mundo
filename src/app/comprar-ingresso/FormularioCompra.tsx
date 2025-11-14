"use client";

import { useState } from 'react';

export default function FormularioCompra({ filmeId }: { filmeId: string }) {
  const [tipo, setTipo] = useState('inteira');
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);

  const calcularTotal = () => {
    const valorUnitario = tipo === 'meia' ? 15 : 30;
    return valorUnitario * quantidade;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('filmeId', filmeId);
      formData.append('tipo', tipo);
      formData.append('quantidade', quantidade.toString());

      console.log('🔄 Enviando requisição para /api/comprar...');

      const response = await fetch('/api/comprar', {
        method: 'POST',
        body: formData
      });

      console.log('📨 Status da resposta:', response.status);
      
      const result = await response.json();
      console.log('📦 Resposta da API:', result);

      if (result.success) {
        console.log('🎉 Sucesso! Redirecionando para compra-sucesso...');
        // FORÇAR O REDIRECIONAMENTO
        window.location.assign(`/compra-sucesso?numero=${result.numero}`);
      } else {
        console.error('❌ Erro na compra:', result.error);
        alert('Erro na compra: ' + result.error);
      }
    } catch (error) {
      console.error('💥 Erro fatal:', error);
      alert('Erro ao processar compra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '30px', 
      background: '#1a1a1a',
      borderRadius: '12px',
      maxWidth: '600px'
    }}>
      <h3 style={{ marginBottom: '25px' }}>Formulário de Compra</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Tipo de Ingresso:
          </label>
          <select 
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
            disabled={loading}
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
            disabled={loading}
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
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            background: loading ? '#666' : '#e50914',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: '10px',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Processando...' : `Finalizar Compra - R$ ${calcularTotal().toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}