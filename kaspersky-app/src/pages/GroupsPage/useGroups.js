import { useCallback, useEffect, useState } from 'react'
import { fetchGroups } from './groups.api.js'

/**
 * Hook for managing groups data and user assignments
 * Fetches groups and users, computes group membership
 *
 * @returns {Object} { groups, users, isLoading, error, retry, getUsersInGroup, getUnmanagedUsers }
 */
export function useGroups() {
  const [groups, setGroups] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const groupsData = await fetchGroups()
      const usersResponse = await fetch('http://localhost:3001/users')
      if (!usersResponse.ok) {
        throw new Error(`HTTP ${usersResponse.status}`)
      }
      const usersData = await usersResponse.json()

      setGroups(groupsData)
      setUsers(usersData)
    } catch (err) {
      setError(err.message || 'Failed to load groups')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  /**
   * Get all users belonging to a specific group
   * @param {number} groupId
   * @returns {Array} Array of user objects
   */
  const getUsersInGroup = (groupId) => {
    return users.filter(u => u.groupId === groupId)
  }

  /**
   * Get all users not assigned to any group
   * @returns {Array} Array of unmanaged user objects
   */
  const getUnmanagedUsers = () => {
    return users.filter(u => !u.groupId || u.groupId === null)
  }

  return {
    groups,
    users,
    isLoading,
    error,
    retry: loadData,
    getUsersInGroup,
    getUnmanagedUsers,
  }
}
