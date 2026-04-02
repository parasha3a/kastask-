import { useState, useDeferredValue, useEffect } from 'react'
import { useUsers } from './useUsers.js'
import { useSearch } from './useSearch.js'
import { useSortableData } from './useSortableData.js'
import { useSelection } from './useSelection.js'
import { Button, Input, Modal, ToastContainer, TableSkeleton } from '../../components/index.js'
import { UsersTable } from './UsersTable.jsx'
import { AddUserForm } from './AddUserForm.jsx'
import './UsersPage.module.css'

/**
 * Users management page with search, sort, and CRUD operations
 * @returns {JSX.Element}
 */
export function UsersPage() {
  const { users, isLoading, error, retry, addUser, removeUser, removeUsers } = useUsers()
  const { query, setQuery, filtered } = useSearch(users, ['fullName', 'email', 'account'])
  const deferredQuery = useDeferredValue(query)
  const { sorted, sortConfig, requestSort } = useSortableData(
    filtered.filter(u => u.fullName.toLowerCase().includes(deferredQuery.toLowerCase()))
  )
  const { selected, toggleOne, toggleAll, isAllSelected, clearSelection, selectedIds } =
    useSelection(sorted)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [toasts, setToasts] = useState([])
  const [deletedUser, setDeletedUser] = useState(null)
  const [undoTimeout, setUndoTimeout] = useState(null)

  const showToast = (message, type = 'info', onUndo = null) => {
    const id = Date.now()
    const duration = onUndo ? 5000 : 3000
    setToasts([
      ...toasts,
      {
        id,
        message,
        type,
        duration,
        onClose: () => setToasts(toasts.filter(t => t.id !== id)),
        onUndo: onUndo
          ? () => {
              clearTimeout(undoTimeout)
              onUndo()
              setToasts(toasts.filter(t => t.id !== id))
            }
          : null,
      },
    ])
  }

  const handleDeleteClick = id => {
    setToDelete(id)
    setIsConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    setIsConfirmOpen(false)
    if (!toDelete) return

    const user = sorted.find(u => u.id === toDelete)
    setDeletedUser(user)
    setToDelete(null)

    // Delayed delete pattern
    const timeout = setTimeout(async () => {
      try {
        await removeUser(user.id)
        showToast('User deleted successfully', 'success')
        setDeletedUser(null)
      } catch (err) {
        showToast(`Failed to delete user: ${err.message}`, 'error')
        setDeletedUser(user)
      }
    }, 5000)

    setUndoTimeout(timeout)
    showToast('User will be deleted in 5 seconds', 'info', () => {
      clearTimeout(timeout)
      setDeletedUser(null)
    })
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return

    setIsConfirmOpen(false)
    try {
      await removeUsers(selectedIds)
      clearSelection()
      showToast(`${selectedIds.length} users deleted`, 'success')
    } catch (err) {
      showToast(`Failed to delete users: ${err.message}`, 'error')
    }
  }

  const handleAddUser = async userData => {
    try {
      await addUser(userData)
      setIsAddModalOpen(false)
      showToast('User added successfully', 'success')
    } catch (err) {
      showToast(`Failed to add user: ${err.message}`, 'error')
    }
  }

  if (error && !users.length) {
    return (
      <div className="users-error">
        <p>Error loading users: {error}</p>
        <Button onClick={retry}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Users Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>+ Add User</Button>
      </div>

      <div className="users-controls">
        <Input
          placeholder="Search by name, email, or account..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {selectedIds.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedIds.length} selected</span>
            <Button variant="danger" onClick={handleBulkDelete}>
              Delete Selected
            </Button>
            <Button variant="secondary" onClick={clearSelection}>
              Clear
            </Button>
          </div>
        )}
      </div>

      {isLoading ? (
        <TableSkeleton rows={8} columns={6} />
      ) : sorted.length === 0 ? (
        <div className="users-empty">
          <p>No users found</p>
          {query && (
            <Button variant="secondary" onClick={() => setQuery('')}>
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <UsersTable
          users={sorted}
          sortConfig={sortConfig}
          onSort={requestSort}
          selected={selected}
          onSelect={toggleOne}
          onSelectAll={toggleAll}
          isAllSelected={isAllSelected}
          onDelete={handleDeleteClick}
        />
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
        actions={[
          { label: 'Close', onClick: () => setIsAddModalOpen(false), variant: 'secondary' },
        ]}
      >
        <AddUserForm onSubmit={handleAddUser} />
      </Modal>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false)
          setToDelete(null)
        }}
        title="Confirm Delete"
        actions={[
          {
            label: 'Cancel',
            onClick: () => {
              setIsConfirmOpen(false)
              setToDelete(null)
            },
            variant: 'secondary',
          },
          { label: 'Delete', onClick: handleConfirmDelete, variant: 'danger' },
        ]}
      >
        <p>Are you sure you want to delete this user? This action cannot be undone immediately.</p>
        <p className="confirm-note">The user will be deleted in 5 seconds unless you undo.</p>
      </Modal>

      <ToastContainer toasts={toasts} />
    </div>
  )
}
