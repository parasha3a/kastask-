/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} fullName
 * @property {string} account
 * @property {string} email
 * @property {number|null} groupId
 * @property {string} phone
 */

const API_BASE = 'http://localhost:3001'

/**
 * Fetch all users from API
 * @returns {Promise<User[]>}
 */
export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`)
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.statusText}`)
  return res.json()
}

/**
 * Create new user
 * @param {Omit<User, 'id'>} userData
 * @returns {Promise<User>}
 */
export async function createUser(userData) {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  if (!res.ok) throw new Error(`Failed to create user: ${res.statusText}`)
  return res.json()
}

/**
 * Delete user by ID
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`Failed to delete user: ${res.statusText}`)
}
