import { useState, useEffect } from 'react'
import { fetchUsers, createUser, deleteUser } from './users.api.js'

/**
 * Hook for managing users data with CRUD operations
 * @returns {Object} users, isLoading, error, retry, addUser, removeUser, removeUsers
 */
export function useUsers() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadUsers = async () => {
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
  }

  // Load users on mount
  useEffect(() => {
    loadUsers()
  }, [])

  const addUser = async (userData) => {
    try {
      const newUser = await createUser(userData)
      setUsers([...users, newUser])
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const removeUser = async (id) => {
    try {
      await deleteUser(id)
      setUsers(users.filter(u => u.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const removeUsers = async (ids) => {
    try {
      await Promise.all(ids.map(id => deleteUser(id)))
      setUsers(users.filter(u => !ids.includes(u.id)))
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
