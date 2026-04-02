import { useCallback, useMemo, useState } from 'react'

/**
 * Hook for managing row selection with checkboxes
 * @param {Array} items - items to select from
 * @returns {Object} selected, toggleOne, toggleAll, isAllSelected, clearSelection, selectedIds
 */
export function useSelection(items) {
  const [selected, setSelected] = useState(new Set())
  const selectedInView = useMemo(() => {
    const validIds = new Set(items.map(item => item.id))
    return new Set([...selected].filter(id => validIds.has(id)))
  }, [items, selected])

  const toggleOne = useCallback((id) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const toggleAll = useCallback(() => {
    if (selectedInView.size === items.length) {
      setSelected(new Set())
    } else {
      const allIds = new Set(items.map(item => item.id))
      setSelected(allIds)
    }
  }, [items, selectedInView.size])

  const clearSelection = useCallback(() => {
    setSelected(new Set())
  }, [])

  const isAllSelected = selectedInView.size === items.length && items.length > 0

  return {
    selected: selectedInView,
    toggleOne,
    toggleAll,
    isAllSelected,
    clearSelection,
    selectedIds: Array.from(selectedInView),
  }
}
