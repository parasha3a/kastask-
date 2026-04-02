import { useMemo } from 'react'

/**
 * Hook for filtering data by search query
 * @param {Array} data - array to search in
 * @param {string} query - search query
 * @param {string[]} searchKeys - keys to search in each item
 * @returns {Array} filtered items
 */
export function useSearch(data, query, searchKeys) {
  return useMemo(() => {
    if (!query.trim()) {
      return data
    }

    const lowerQuery = query.toLowerCase()
    return data.filter(item =>
      searchKeys.some(key => {
        const value = item[key]
        return typeof value === 'string' && value.toLowerCase().includes(lowerQuery)
      })
    )
  }, [data, query, searchKeys])
}
