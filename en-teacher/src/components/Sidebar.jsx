'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Aulas', href: '/home' },
    { name: 'Dicionário', href: '/dictionary' },
    { name: 'Desempenho', href: '/performance' },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Logo/Header */}
      <div className={styles.header}>
        <h1 className={styles.logo}>EN</h1>
        <p className={styles.subtitle}>Teacher</p>
      </div>

      {/* Menu */}
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.menuItem} ${pathname === item.href ? styles.active : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <p>© 2026 EN Teacher</p>
      </div>
    </aside>
  );
}
