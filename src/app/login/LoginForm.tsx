// app/login/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Tentando login:', { email, password });
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          E-mail
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Sua senha"
          required
        />
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}