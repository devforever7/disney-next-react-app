/**
 * API configuration hub designed for multi-API support
 * Currently implements Disney API but structured for expansion
 *
 * Extension Pattern:
 * - Add new API configurations as needed
 * - Each API can have its own configuration structure
 * - Type-safe configuration objects
 *
 * Example future extension:
 * {
 *   disney: { baseUrl, headers },
 *   marvel: { baseUrl, headers, apiKey },
 *   custom: { baseUrl, headers, authStrategy }
 * }
 */

export const API_CONFIG = {
  disney: {
    baseUrl:
      process.env.NEXT_PUBLIC_DISNEY_API_URL || 'https://api.disneyapi.dev/',
    headers: {
      'Content-Type': 'application/json',
    },
  },
} as const;
