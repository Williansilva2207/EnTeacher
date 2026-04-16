'use client';

import Sidebar from '@/components/Sidebar';
import ChatLayout from '@/components/ChatLayout';
import styles from './page.module.css';

export default function Basic2Page() {
  const initialMessages = [
    {
      id: 'assistant-1',
      role: 'assistant',
      text: 'Bem-vindo ao Basic 2. Aqui podemos conversar sobre frases do dia a dia e verbos no presente.',
    },
    {
      id: 'assistant-2',
      role: 'assistant',
      text: 'Envie uma pergunta e eu responderei como se fosse seu parceiro de conversação.',
    },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <ChatLayout
          title="Basic 2"
          subtitle="Continue desenvolvendo suas habilidades"
          initialMessages={initialMessages}
        />
      </main>
    </div>
  );
}
