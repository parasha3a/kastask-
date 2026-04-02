import { useMemo, useState } from 'react'

/**
 * Hook for filtering data by search query
 * @param {Array} data - array to search in
 * @param {string[]} searchKeys - keys to search in each item
 * @returns {Object} query, setQuery, filtered
 */
export function useSearch(data, searchKeys) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return data

    const lowerQuery = query.toLowerCase()
    return data.filter(item =>
      searchKeys.some(key => {
        const value = item[key]
        return value && value.toLowerCase().includes(lowerQuery)
      })
    )
  }, [data, query, searchKeys])

  return { query, setQuery, filtered }
}
