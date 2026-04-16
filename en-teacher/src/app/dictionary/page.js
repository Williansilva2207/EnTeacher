'use client';

import Sidebar from '@/components/Sidebar';
import styles from './page.module.css';

export default function DictionaryPage() {
  const words = [
    { english: 'Hello', portuguese: 'Olá', pronunciation: '/həˈloʊ/' },
    { english: 'Thank you', portuguese: 'Obrigado', pronunciation: '/θæŋk ˈjuː/' },
    { english: 'Please', portuguese: 'Por favor', pronunciation: '/pliːz/' },
    { english: 'Goodbye', portuguese: 'Adeus', pronunciation: '/ɡʊdˈbaɪ/' },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.logo}>
              📖
            </div>
            <h1 className={styles.title}>Dicionário</h1>
          </div>
          <p className={styles.subtitle}>Aprenda novas palavras e expressões</p>
        </div>

        <div className={styles.wordsGrid}>
          {words.map((word, index) => (
            <div key={index} className={styles.wordCard}>
              <h3 className={styles.wordEnglish}>{word.english}</h3>
              <p className={styles.wordPronunciation}>{word.pronunciation}</p>
              <p className={styles.wordPortuguese}>
                <strong>Português:</strong> {word.portuguese}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
