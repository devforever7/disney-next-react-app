'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { SearchBar } from '@/app/components/ui/SearchBar/SearchBar';
import { CharacterGrid } from '@/app/components/characters/CharacterGrid/CharacterGrid';
import { ICharacter } from '@/lib/api/types';
import styles from './ClientHomeContent.module.css';

/**
 * Client-side home page content with local search functionality
 * Features:
 * - Local filtering of preloaded characters
 * - Seamless transition to full search page
 * - Memoized character filtering for performance
 * - Responsive grid layout
 * @component
 * @param {Object} props
 * @param {ICharacter[]} props.initialCharacters - Server-side loaded initial characters
 */
export const ClientHomeContent = ({
  initialCharacters,
}: {
  initialCharacters: ICharacter[];
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCharacters = useMemo(() => {
    if (!searchTerm) return initialCharacters;

    return initialCharacters?.filter((char) =>
      char?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, initialCharacters]);

  return (
    <section className={styles.wrapper}>
      <SearchBar onSearch={setSearchTerm} />
      <div role="status">
        {filteredCharacters.length === 0 ? (
          <p className={styles.noResults}>
            {searchTerm ? (
              <>
                Characters matching{' '}
                <strong className={styles.searchTerm}>{searchTerm}</strong> not
                in preloaded list.{' '}
                <Link href={`/search?q=${searchTerm}`}>
                  Click here to search all characters.
                </Link>
              </>
            ) : (
              'No characters available.'
            )}
          </p>
        ) : (
          <div className={styles.gridWrapper}>
            <CharacterGrid characters={filteredCharacters} />
          </div>
        )}
      </div>
    </section>
  );
};
