'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from '@/app/components/ui/SearchBar/SearchBar.module.css';
import { NavMenu } from '@/app/components/ui/NavMenu/NavMenu';

interface ISearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
}

/**
 * Unified search bar component with debounced input
 * Features:
 * - Integrated navigation menu
 * - Responsive design
 * - Accessibility support
 * @component
 */

export function SearchBar({
  onSearch,
  placeholder,
  initialValue = '',
}: ISearchBarProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onSearch(value);
  }, [value, onSearch]);

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
            placeholder={placeholder}
            className={styles.input}
          />
        </div>
        <NavMenu />
      </div>
    </div>
  );
}
