"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CompraFinalizada() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Contagem regressiva para redirecionamento automático
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      minHeight: '100vh',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        background: '#1a1a1a',
        padding: '50px 40px',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid #333'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
        <h1 style={{ color: '#0f0', marginBottom: '20px', fontSize: '2rem' }}>
          Compra Realizada com Sucesso!
        </h1>
        
        <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '30px', fontSize: '1.1rem' }}>
          Seu ingresso foi reservado e está confirmado. 
          Você receberá um e-mail com os detalhes da compra.
        </p>

        <div style={{ 
          background: '#2a2a2a', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <p style={{ color: '#0f0', fontWeight: 'bold', marginBottom: '10px' }}>
            Obrigado por escolher nosso cinema!
          </p>
          <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
            Redirecionando em {countdown} segundos...
          </p>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            href="/"
            style={{
              padding: '12px 24px',
              background: '#e50914',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Voltar para Home
          </Link>
          
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              color: '#ccc',
              border: '1px solid #555',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Permanecer Aqui
          </button>
        </div>
      </div>
    </div>
  );
}