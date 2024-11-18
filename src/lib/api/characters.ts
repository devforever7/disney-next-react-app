/**
 * Disney API client functions
 * Implements centralized API communication with type safety
 * @module
 */

import { fetchFromApi } from './client';
import { ICharacter, IPaginatedResponse } from './types';

/**
 * Fetches paginated character list
 * @param {number} page - Page number to fetch
 * @param {number} pageSize - Number of items per page
 */
export async function getCharacters(page = 1, pageSize = 8) {
  return fetchFromApi<IPaginatedResponse<ICharacter>>(
    `character?page=${page}&pageSize=${pageSize}`
  );
}

/**
 * Searches characters by name
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {number} pageSize - Results per page
 */
export async function searchCharacters(query: string, page = 1, pageSize = 8) {
  return fetchFromApi<IPaginatedResponse<ICharacter>>(
    `character?name=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
  );
}

/**
 * Fetches a specific character by their ID
 * @param {number} id - Character's unique identifier
 * @returns {Promise<{data: ICharacter}>} Character data
 */
export async function getCharacterById(id: number) {
  return fetchFromApi<{ data: ICharacter }>(`character/${id}`);
}
