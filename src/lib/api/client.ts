import { API_CONFIG } from './config';

/**
 * Generic API client designed for extensibility and type safety
 * Currently configured for Disney API but structured for multi-API support
 *
 * @template T - Expected response type, allowing type-safe API responses
 * @param {string} path - API endpoint path
 * @param {RequestInit} [options] - Fetch options that can be extended per endpoint
 * @returns {Promise<T>} Typed API response
 * @throws {Error} API-specific error with status information
 */

export async function fetchFromApi<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_CONFIG.disney.baseUrl}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...API_CONFIG.disney.headers,
      ...options?.headers,
    },
  });

  if (response.ok) {
    return response.json();
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
