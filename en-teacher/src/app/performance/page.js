'use client';

import Sidebar from '@/components/Sidebar';
import styles from './page.module.css';

export default function PerformancePage() {
  const stats = [
    { label: 'Aulas Concluídas', value: '12', color: 'blue' },
    { label: 'Pontuação', value: '850/1000', color: 'indigo' },
    { label: 'Sequência', value: '7 dias', color: 'purple' },
    { label: 'Taxa de Acerto', value: '85%', color: 'green' },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.logo}>
              📊
            </div>
            <h1 className={styles.title}>Desempenho</h1>
          </div>
          <p className={styles.subtitle}>Acompanhe seu progresso de aprendizado</p>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className={styles.activitiesSection}>
          <h2 className={styles.activitiesTitle}>Últimas Atividades</h2>
          <div className={styles.activitiesList}>
            <div className={styles.activityItem}>
              <span className={styles.activityName}>Basic 1 - Lição 1</span>
              <span className={`${styles.activityStatus} ${styles.completed}`}>✓ Completo</span>
            </div>
            <div className={styles.activityItem}>
              <span className={styles.activityName}>Basic 1 - Quiz</span>
              <span className={`${styles.activityStatus} ${styles.completed}`}>✓ 90%</span>
            </div>
            <div className={styles.activityItem}>
              <span className={styles.activityName}>Basic 2 - Lição 1</span>
              <span className={`${styles.activityStatus} ${styles.inProgress}`}>⏳ Em Progresso</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
