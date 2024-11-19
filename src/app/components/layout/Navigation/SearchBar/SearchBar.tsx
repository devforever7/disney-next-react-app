'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from '@/app/components/layout/Navigation/SearchBar/SearchBar.module.css';
import { NavMenu } from '@/app/components/layout/Navigation/NavMenu/NavMenu';

interface ISearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: {
    mobile: string;
    desktop: string;
  };
  initialValue?: string;
}

/**
 * Unified search bar component
 * Features:
 * - Integrated navigation menu
 * - Responsive design with shorter placeholder on smaller screens
 * - Accessibility support
 * @component
 */

export function SearchBar({
  onSearch,
  placeholder = {
    mobile: 'Search...',
    desktop: 'Search Disney characters...',
  },
  initialValue = '',
}: ISearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(
    placeholder.desktop
  );

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onSearch(value);
  }, [value, onSearch]);

  useEffect(() => {
    const handleResize = () => {
      setCurrentPlaceholder(
        window.innerWidth < 500 ? placeholder.mobile : placeholder.desktop
      );
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [placeholder]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <Image
          src="/disney-logo.svg"
          alt="Disney Logo"
          width={100}
          height={40}
          className={styles.logo}
        />
        <div className={styles.inputWrapper}>
          <input
            type="search"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            placeholder={currentPlaceholder}
            className={styles.input}
          />
        </div>
        <NavMenu />
      </div>
    </div>
  );
}
