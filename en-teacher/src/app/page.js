'use client';

import Sidebar from '@/components/Sidebar';
import ModuleCard from '@/components/ModuleCard';
import styles from './page.module.css';

export default function HomePage() {
  const basicModules = [
    { id: 1, title: 'Chat Para Basic 1', color: 'blue', icon: '📚', href: '/modules/basic1', completed: 'walking' },
    { id: 2, title: 'Chat Para Basic 2', color: 'indigo', icon: '📖', href: '/modules/basic2', completed: 'no' },
    { id: 3, title: 'Chat Para Intermediary 1', color: 'purple', icon: '🎓', href: '/modules/intermediary1', completed: 'no' },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.logo}>EN</div>
            <h1 className={styles.title}>Teacher</h1>
          </div>
          <p className={styles.subtitle}>Bem-vindo ao seu aprendizado de inglês</p>
        </div>

        <div className={styles.modulesGrid}>
          {basicModules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              color={module.color}
              icon={module.icon}
              href={module.href}
              isCompleted={module.completed}
            />
          ))}
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Como funciona</h2>
          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <span className={styles.infoBullet}>→</span>
              <span className={styles.infoText}>Comece com os módulos básicos e progresse gradualmente</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoBullet}>→</span>
              <span className={styles.infoText}>Complete as aulas e teste seus conhecimentos</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoBullet}>→</span>
              <span className={styles.infoText}>Acompanhe seu desempenho nas estatísticas</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
