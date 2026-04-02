import { ArrowDown, ArrowUp, ArrowUpDown, ShieldAlert, Trash2 } from 'lucide-react'
import styles from './UsersTable.module.css'

/**
 * Semantic table component with sorting and selection
 * @param {Array} users - users data
 * @param {Object} sortConfig - current sort config
 * @param {Function} onSort - callback for sort
 * @param {Set} selected - selected user IDs
 * @param {Function} onSelect - callback to select one
 * @param {Function} onSelectAll - callback to select all
 * @param {boolean} isAllSelected - whether all are selected
 * @param {Map<number, string>} groupNames - group names by ID
 * @param {Object} labels - translated labels
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
  groupNames,
  labels,
  onDelete,
}) {
  const getSortIcon = key => {
    if (sortConfig?.key !== key) {
      return <ArrowUpDown size={16} />
    }

    return sortConfig.direction === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
  }

  const getSortAria = key => {
    if (sortConfig?.key !== key) return 'none'
    return sortConfig.direction === 'asc' ? 'ascending' : 'descending'
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.usersTable}>
        <caption className="visually-hidden">{labels.caption}</caption>
        <thead>
          <tr>
            <th scope="col" className={styles.checkboxCell}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
                aria-label={labels.selectAll}
              />
            </th>
            {[
              ['fullName', labels.fullName],
              ['account', labels.account],
              ['email', labels.email],
              ['groupId', labels.group],
            ].map(([key, label]) => (
              <th key={key} scope="col" aria-sort={getSortAria(key)}>
                <button
                  type="button"
                  className={styles.sortButton}
                  onClick={() => onSort(key)}
                  aria-label={labels.sortBy.replace('{label}', label)}
                >
                  <span>{label}</span>
                  {getSortIcon(key)}
                </button>
              </th>
            ))}
            <th scope="col">{labels.phone}</th>
            <th scope="col" className={styles.actionsHeading}>
              {labels.actions}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className={selected.has(user.id) ? styles.selected : ''}>
              <td className={styles.checkboxCell}>
                <input
                  type="checkbox"
                  checked={selected.has(user.id)}
                  onChange={() => onSelect(user.id)}
                  aria-label={user.fullName}
                />
              </td>
              <td>
                <div className={styles.primaryCell}>
                  <span className={styles.primaryValue}>{user.fullName}</span>
                  <span className={styles.secondaryValue}>{user.account}</span>
                </div>
              </td>
              <td className={styles.accountCell}>{user.account}</td>
              <td>
                <a href={`mailto:${user.email}`} className={styles.inlineLink}>
                  {user.email}
                </a>
              </td>
              <td>
                <span className={`${styles.groupBadge} ${!user.groupId ? styles.groupBadgeMuted : ''}`}>
                  {!user.groupId && <ShieldAlert size={14} />}
                  {user.groupId ? groupNames.get(user.groupId) ?? labels.unmanaged : labels.unmanaged}
                </span>
              </td>
              <td>{user.phone}</td>
              <td className={styles.actionsCell}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => onDelete(user)}
                  aria-label={labels.deleteUser.replace('{name}', user.fullName)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
