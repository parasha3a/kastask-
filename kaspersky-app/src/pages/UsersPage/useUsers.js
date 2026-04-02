import { useCallback, useEffect, useState } from 'react'
import { fetchUsers, createUser, deleteUser } from './users.api.js'

/**
 * Hook for managing users data with CRUD operations
 * @returns {Object} users, isLoading, error, retry, addUser, removeUser, removeUsers
 */
export function useUsers() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Load users on mount
  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const addUser = async (userData) => {
    try {
      const newUser = await createUser(userData)
      setUsers(previous => [...previous, newUser])
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const removeUser = async (id) => {
    try {
      await deleteUser(id)
      setUsers(previous => previous.filter(user => user.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const removeUsers = async (ids) => {
    try {
      await Promise.all(ids.map(id => deleteUser(id)))
      setUsers(previous => previous.filter(user => !ids.includes(user.id)))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    users,
    isLoading,
    error,
    retry: loadUsers,
    addUser,
    removeUser,
    removeUsers,
  }
}
