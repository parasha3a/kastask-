import { http, HttpResponse } from 'msw'

const API_BASE = 'http://localhost:3001'

/**
 * Mock API response data for testing
 */
const mockUsers = [
  {
    id: 1,
    fullName: 'John Doe',
    account: 'companydomain/johndoe',
    email: 'john.doe@example.com',
    groupId: 1,
    phone: '+1234567890',
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    account: 'companydomain/janesmith',
    email: 'jane.smith@example.com',
    groupId: 2,
    phone: '+1234567891',
  },
  {
    id: 3,
    fullName: 'Bob Johnson',
    account: 'companydomain/bobjohnson',
    email: 'bob.johnson@example.com',
    groupId: null,
    phone: '+1234567892',
  },
]

const mockGroups = [
  {
    id: 1,
    name: 'CDN/CEO',
    description: 'Chief Executive Officer',
    color: '#FF6B6B',
  },
  {
    id: 2,
    name: 'CDN/Managers',
    description: 'Management Team',
    color: '#4ECDC4',
  },
  {
    id: 3,
    name: 'CDN/Financials',
    description: 'Finance Department',
    color: '#45B7D1',
  },
]

/**
 * MSW v2 handlers for testing
 */
export const handlers = [
  // Get all users
  http.get(`${API_BASE}/users`, () => {
    return HttpResponse.json(mockUsers)
  }),

  // Get single user
  http.get(`${API_BASE}/users/:id`, ({ params }) => {
    const user = mockUsers.find(u => u.id === parseInt(params.id))
    if (!user) {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return HttpResponse.json(user)
  }),

  // Create user
  http.post(`${API_BASE}/users`, async ({ request }) => {
    const body = await request.json()
    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      ...body,
    }
    mockUsers.push(newUser)
    return HttpResponse.json(newUser, { status: 201 })
  }),

  // Delete user
  http.delete(`${API_BASE}/users/:id`, ({ params }) => {
    const index = mockUsers.findIndex(u => u.id === parseInt(params.id))
    if (index === -1) {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 })
    }
    mockUsers.splice(index, 1)
    return new HttpResponse(null, { status: 200 })
  }),

  // Get all groups
  http.get(`${API_BASE}/groups`, () => {
    return HttpResponse.json(mockGroups)
  }),

  // Get single group
  http.get(`${API_BASE}/groups/:id`, ({ params }) => {
    const group = mockGroups.find(g => g.id === parseInt(params.id))
    if (!group) {
      return HttpResponse.json({ error: 'Group not found' }, { status: 404 })
    }
    return HttpResponse.json(group)
  }),
]
