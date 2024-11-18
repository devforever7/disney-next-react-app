import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavMenu.module.css';

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

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
            <li role="none">
              <Link href="/" className={styles.link} role="menuitem">
                Home
              </Link>
            </li>
            <li role="none">
              <Link href="/search" className={styles.link} role="menuitem">
                Search
              </Link>
            </li>
            <li role="none">
              <Link href="/profile" className={styles.link} role="menuitem">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
