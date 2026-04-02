import { useMemo, useState } from 'react'

/**
 * Hook for sorting data by a column
 * @param {Array} data - data to sort
 * @returns {Object} sorted, sortConfig, requestSort
 */
export function useSortableData(data) {
  const [sortConfig, setSortConfig] = useState(null)

  const sorted = useMemo(() => {
    if (!sortConfig) return data

    const { key, direction } = sortConfig
    const copy = [...data]

    copy.sort((a, b) => {
      const aVal = a[key]
      const bVal = b[key]

      if (aVal == null) return 1
      if (bVal == null) return -1

      // Handle strings with localeCompare
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      // Handle numbers and other types
      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })

    return copy
  }, [data, sortConfig])

  const requestSort = (key) => {
    setSortConfig(config => {
      if (!config || config.key !== key) {
        return { key, direction: 'asc' }
      }
      if (config.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      return null // Clear sort
    })
  }

  return { sorted, sortConfig, requestSort }
}
