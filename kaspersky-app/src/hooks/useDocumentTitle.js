import { useEffect } from 'react'

/**
 * Hook to update document title
 * @param {string} title - new document title
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    return () => {
      document.title = previousTitle
    }
  }, [title])
}
