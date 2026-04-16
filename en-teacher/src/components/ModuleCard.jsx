'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './ModuleCard.module.css';

export default function ModuleCard({ title, color, icon, href, isCompleted }) {
  const [isHovered, setIsHovered] = useState(false);
  const colorClass = color.includes('blue') ? styles.blue : color.includes('indigo') ? styles.indigo : styles.purple;

  return (
    <Link href={href}>
      <div
        className={`${styles.card} ${colorClass} ${isHovered ? styles.hovered : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        <div className={styles.gradientOverlay}></div>

        
        <div className={styles.content}>
          
          <div className={styles.icon}>{icon}</div>

          {/* Title */}
          <div>
            <h3 className={styles.title}>{title}</h3>
            {isCompleted === "yes" ?
              <span className={styles.completedBadge}>
                ✓ Concluído
              </span>
              : isCompleted === "walking" ?
              <span className={styles.inProgressBadge}>
                ⏳ Em andamento
              </span>
              :
              <span className={styles.notStartedBadge}>
                Não iniciado
              </span>
            }
          </div>

          <div className={styles.arrow}>
            →
          </div>
        </div>
      </div>
    </Link>
  );
}
