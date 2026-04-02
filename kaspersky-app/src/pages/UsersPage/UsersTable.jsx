import './UsersTable.module.css'

/**
 * Semantic table component with sorting and selection
 * @param {Array} users - users data
 * @param {Object} sortConfig - current sort config
 * @param {Function} onSort - callback for sort
 * @param {Set} selected - selected user IDs
 * @param {Function} onSelect - callback to select one
 * @param {Function} onSelectAll - callback to select all
 * @param {boolean} isAllSelected - whether all are selected
 * @param {Function} onDelete - callback for delete
 * @returns {JSX.Element}
 */
export function UsersTable({
  users,
  sortConfig,
  onSort,
  selected,
  onSelect,
  onSelectAll,
  isAllSelected,
  onDelete,
}) {
  const getSortArrow = key => {
    if (sortConfig?.key !== key) return ' ▼'
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼'
  }

  const getSortAria = key => {
    if (sortConfig?.key !== key) return 'none'
    return sortConfig.direction === 'asc' ? 'ascending' : 'descending'
  }

  return (
    <table className="users-table">
      <thead>
        <tr>
          <th className="checkbox-cell">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={onSelectAll}
              title="Select all users"
            />
          </th>
          <th onClick={() => onSort('fullName')} aria-sort={getSortAria('fullName')}>
            Name {getSortArrow('fullName')}
          </th>
          <th onClick={() => onSort('account')} aria-sort={getSortAria('account')}>
            Account {getSortArrow('account')}
          </th>
          <th onClick={() => onSort('email')} aria-sort={getSortAria('email')}>
            Email {getSortArrow('email')}
          </th>
          <th onClick={() => onSort('groupId')} aria-sort={getSortAria('groupId')}>
            Group {getSortArrow('groupId')}
          </th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className={selected.has(user.id) ? 'selected' : ''}>
            <td className="checkbox-cell">
              <input
                type="checkbox"
                checked={selected.has(user.id)}
                onChange={() => onSelect(user.id)}
                title={`Select ${user.fullName}`}
              />
            </td>
            <td>{user.fullName}</td>
            <td>{user.account}</td>
            <td className="email-cell">{user.email}</td>
            <td>{user.groupId ? `Group #${user.groupId}` : 'Unmanaged'}</td>
            <td>{user.phone}</td>
            <td className="actions-cell">
              <button className="delete-btn" onClick={() => onDelete(user.id)} title="Delete">
                🗑
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
