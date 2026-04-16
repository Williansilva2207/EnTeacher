'use client';

import { useState, useEffect } from 'react';
import styles from './ChatLayout.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatLayout({ title, subtitle, initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('conversation_id');
    if (storedId) {
      setConversationId(storedId);
      loadConversation(storedId);
    }
  }, []);

  const loadConversation = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8001/conversation/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          localStorage.removeItem('conversation_id');
          setConversationId(null);
          console.warn('Conversa não encontrada no Back4App. Iniciando nova conversa.');
          return;
        }
        throw new Error('Falha ao carregar conversa');
      }
      const data = await response.json();
      if (data.messages?.length) {
        setMessages(data.messages.map((message, index) => ({
          id: `${message.role}-${index}`,
          role: message.role,
          text: message.content,
        })));
      }
    } catch (error) {
      console.warn('Não foi possível recuperar o histórico da conversa.', error);
      localStorage.removeItem('conversation_id');
      setConversationId(null);
    }
  };

  const handleSend = async (event) => {
    event?.preventDefault();
  

    const trimmedText = draft.trim();
    if (!trimmedText) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmedText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setDraft('');
    setSending(true);

    try {
      const response = await fetch('http://127.0.0.1:8001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedText,
          conversation_id: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }

      const data = await response.json();
      if (data.conversation_id) {
        setConversationId(data.conversation_id);
        localStorage.setItem('conversation_id', data.conversation_id);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: data.response,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: `Erro: ${error.message}`,
        },
      ]);
    } finally {
      setSending(false);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !sending) {
      event.preventDefault();
      handleSend(event); // mais consistente
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <p className={styles.sectionLabel}>Chat de aprendizagem</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.status}>Pronto para integrar IA</div>
      </div>

      <div className={styles.chatCard}>
        <div className={styles.chatMessages}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${
                message.role === 'user' ? styles.userMessage : styles.assistantMessage
              }`}
            >
              <div className={styles.messageLabel}>
                {message.role === 'user' ? 'Você' : 'Assistente'}
              </div>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
            </div>
          ))}
          <div className={styles.scrollAnchor} />
        </div>

        <form onSubmit={handleSend} className={styles.inputArea}>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown} 
            placeholder="Escreva sua mensagem para a IA..."
            className={styles.input}
          />
          <button type="submit" disabled={sending || !draft.trim()} className={styles.sendButton}>
            {sending ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}
