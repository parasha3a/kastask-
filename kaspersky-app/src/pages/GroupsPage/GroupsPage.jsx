import { useState, useEffect } from 'react'
import { fetchGroups } from './groups.api.js'
import { GroupCard } from './GroupCard.jsx'
import { Skeleton } from '../../components/index.js'
import './GroupsPage.module.css'

/**
 * Groups management page with card layout
 * Shows all groups and unmanaged users
 * @returns {JSX.Element}
 */
export function GroupsPage() {
  const [groups, setGroups] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedGroupId, setExpandedGroupId] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const groupsData = await fetchGroups()
        const usersResponse = await fetch('http://localhost:3001/users')
        const usersData = await usersResponse.json()

        setGroups(groupsData)
        setUsers(usersData)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const getUsersInGroup = (groupId) => {
    return users.filter(u => u.groupId === groupId)
  }

  const getUnmanagedUsers = () => {
    return users.filter(u => !u.groupId || u.groupId === null)
  }

  const unmanagedUsers = getUnmanagedUsers()
  const groupColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']

  if (error) {
    return (
      <div className="groups-error">
        <p>Error loading groups: {error}</p>
      </div>
    )
  }

  return (
    <div className="groups-page">
      <h1>Groups Management</h1>

      <div className="groups-container">
        <div className="groups-grid">
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => <Skeleton key={i} className="group-skeleton" />)
          ) : (
            groups.map((group, index) => {
              const groupUsers = getUsersInGroup(group.id)
              const color = groupColors[index % groupColors.length]
              const isExpanded = expandedGroupId === group.id

              return (
                <GroupCard
                  key={group.id}
                  group={group}
                  userCount={groupUsers.length}
                  users={groupUsers}
                  color={color}
                  isExpanded={isExpanded}
                  onToggleExpand={() =>
                    setExpandedGroupId(isExpanded ? null : group.id)
                  }
                />
              )
            })
          )}
        </div>

        {unmanagedUsers.length > 0 && (
          <div className="unmanaged-section">
            <h2>Unmanaged Users</h2>
            <div className="unmanaged-list">
              {unmanagedUsers.map(user => (
                <div key={user.id} className="unmanaged-user">
                  <div className="user-info">
                    <p className="user-name">{user.fullName}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
