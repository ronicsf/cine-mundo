// app/login/page.tsx
import LoginForm from './LoginForm'; // ← Import do mesmo diretório
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Acesse sua conta</h1>
        <LoginForm />
        
        <div className={styles.links}>
          <a href="/esqueci-senha" className={styles.link}>
            Esqueci minha senha
          </a>
          <a href="/cadastro" className={styles.link}>
            Criar nova conta
          </a>
        </div>
      </div>
    </div>
  );
}