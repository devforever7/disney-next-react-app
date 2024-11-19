'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavMenu.module.css';
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search' },
  { href: '/profile', label: 'Profile' },
] as const;

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        className={styles.avatarButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="navigation-menu"
        aria-label="Open navigation menu"
      >
        <Image
          src="/search-avatar.svg"
          alt=""
          width={48}
          height={48}
          className={styles.avatar}
        />
      </button>

      {isOpen && (
        <nav
          id="navigation-menu"
          aria-label="Main navigation"
          className={styles.menuContainer}
          role="navigation"
        >
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <ul role="menu" className={styles.menu}>
            {MENU_ITEMS.map(({ href, label }) => {
              const isCurrentPath = pathname === href;

              return (
                <li key={href} role="none">
                  <Link
                    href={href}
                    className={`${styles.link} ${isCurrentPath ? styles.current : ''}`}
                    role="menuitem"
                    aria-current={isCurrentPath ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
