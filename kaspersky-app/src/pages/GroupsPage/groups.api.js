/**
 * @typedef {Object} Group
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} color
 */

const API_BASE = 'http://localhost:3001'

/**
 * Fetch all groups from API
 * @returns {Promise<Group[]>}
 */
export async function fetchGroups() {
  const res = await fetch(`${API_BASE}/groups`)
  if (!res.ok) throw new Error(`Failed to fetch groups: ${res.statusText}`)
  return res.json()
}
