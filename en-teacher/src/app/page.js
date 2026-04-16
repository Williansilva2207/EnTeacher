'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AuthLandingPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push('/home');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.authCard}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>EN</div>
          <div>
            <h1 className={styles.brandTitle}>EN Teacher</h1>
            <p className={styles.brandSubtitle}>Registre-se ou faça login para começar.</p>
          </div>
        </div>

        <div className={styles.toggleGroup}>
          <button
            type="button"
            className={`${styles.toggleButton} ${mode === 'login' ? styles.activeToggle : ''}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`${styles.toggleButton} ${mode === 'register' ? styles.activeToggle : ''}`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label className={styles.label}>
              Nome completo
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Seu nome"
                required
              />
            </label>
          )}

          <label className={styles.label}>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="seu@email.com"
              required
            />
          </label>

          <label className={styles.label}>
            Senha
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="********"
              required
            />
          </label>

          <button type="submit" className={styles.submitButton}>
            {mode === 'login' ? 'Entrar' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
