'use client';

import Sidebar from '@/components/Sidebar';
import ChatLayout from '@/components/ChatLayout';
import styles from './page.module.css';

export default function Intermediary1Page() {
  const initialMessages = [
    {
      id: 'assistant-1',
      role: 'assistant',
      text: 'Nível intermediário pronto! Vamos discutir tempos verbais avançados e expressões idiomáticas.',
    },
    {
      id: 'assistant-2',
      role: 'assistant',
      text: 'Tente escrever uma frase em inglês e eu ajudarei a torná-la mais natural.',
    },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <ChatLayout
          title="Intermediary 1"
          subtitle="Nível intermediário - Tópicos avançados"
          initialMessages={initialMessages}
        />
      </main>
    </div>
  );
}
