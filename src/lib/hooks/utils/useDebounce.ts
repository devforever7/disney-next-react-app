/**
 * A custom hook that delays updating a value until the user stops changing it.
 * Commonly used to prevent excessive API calls during user input.
 *
 * @template T Type of value being debounced
 * @param value The value to debounce
 * @param delay Milliseconds to wait before updating
 *
 * @example
 * const SearchComponent = () => {
 *   const [search, setSearch] = useState('');
 *   const debouncedSearch = useDebounce(search, 300);
 *
 *   useEffect(() => {
 *     // API call only happens 300ms after typing stops
 *     searchAPI(debouncedSearch);
 *   }, [debouncedSearch]);
 * };
 */
import { useState, useEffect, useRef } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};
