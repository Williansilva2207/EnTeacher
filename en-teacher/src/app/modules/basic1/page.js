'use client';

import Sidebar from '@/components/Sidebar';
import ChatLayout from '@/components/ChatLayout';
import styles from './page.module.css';

export default function Basic1Page() {
  const initialMessages = [
    {
      id: 'assistant-1',
      role: 'assistant',
      text: 'Olá! Vamos praticar inglês básico usando este chat. Pergunte algo sobre saudações, cores ou família.',
    },
    {
      id: 'assistant-2',
      role: 'assistant',
      text: 'Dica: descreva a situação em inglês e eu ajudarei com frases e correções.',
    },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <ChatLayout
          title="Basic 1"
          subtitle="Aprenda os fundamentos do inglês"
          initialMessages={initialMessages}
        />
      </main>
    </div>
  );
}
