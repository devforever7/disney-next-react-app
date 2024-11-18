/**
 * Type definitions for Disney API responses
 * @module
 */

/**
 * Represents a Disney character with all available properties
 * @interface
 */
export interface ICharacter {
  _id: number;
  name: string;
  imageUrl: string;
  url: string;
  sourceUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  alignment: string;
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  updatedAt: string;
}

/**
 * Generic paginated response structure from the Disney API
 * @interface
 * @template T - The type of data being paginated
 */
export interface IPaginatedResponse<T> {
  data: T[];
  count: number;
  totalPages: number;
  nextPage: string | null;
  previousPage: string | null;
}
