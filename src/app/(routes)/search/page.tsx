/**
 * Search page implementation with advanced features:
 * - Debounced search to prevent excessive API calls
 * - React Query for efficient data fetching and caching
 * - Skeleton loading states for better UX
 * - URL synchronization with search state
 * - Error boundary integration
 * @component
 */

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, Suspense } from 'react';
import { SearchBar } from '@/app/components/ui/SearchBar/SearchBar';
import { CharacterGrid } from '@/app/components/characters/CharacterGrid/CharacterGrid';
import { CardGridSkeleton } from '@/app/components/ui/CardSkeleton/CardSkeleton';
import { useDebounce } from '@/lib/hooks/utils/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { searchCharacters } from '@/lib/api/characters';
import QueryProvider from '@/app/providers/QueryProvider';
import styles from './page.module.css';

const SearchResultsWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.gridWrapper}>
      <h1 className={styles.searchResultsTitle}>{title}</h1>
      {children}
    </div>
  );
};

const SearchResults = ({ searchTerm }: { searchTerm: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['characters', searchTerm],
    queryFn: async () => {
      return searchTerm ? searchCharacters(searchTerm) : null;
    },
  });

  if (!searchTerm) return null;

  if (isLoading)
    return (
      <SearchResultsWrapper title="Loading Search Results">
        <CardGridSkeleton count={4} />
      </SearchResultsWrapper>
    );

  if (isError) throw new Error(`Failed to load characters: ${error.message}`);

  if (!response?.data?.length) {
    return (
      <SearchResultsWrapper title={`Search Results - ${searchTerm}`}>
        <p className={styles.noResults}>No characters found</p>
      </SearchResultsWrapper>
    );
  }

  return (
    <SearchResultsWrapper title={`Search Results - ${searchTerm}`}>
      <CharacterGrid characters={response.data} />
    </SearchResultsWrapper>
  );
};

const SearchPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQueryRef = useRef(searchParams.get('q') || '');
  const [searchTerm, setSearchTerm] = useState(initialQueryRef.current);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Update URL when search term changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) {
      params.set('q', debouncedSearchTerm);
    } else {
      params.delete('q');
    }
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [router, debouncedSearchTerm]);

  return (
    <>
      <SearchBar
        onSearch={setSearchTerm}
        initialValue={initialQueryRef.current}
      />
      <SearchResults searchTerm={debouncedSearchTerm} />
    </>
  );
};

export default function SearchPage() {
  return (
    <QueryProvider>
      <Suspense fallback={null}>
        <SearchPageContent />
      </Suspense>
    </QueryProvider>
  );
}
