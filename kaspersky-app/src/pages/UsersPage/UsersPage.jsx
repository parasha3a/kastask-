import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, DatabaseZap, Search, ShieldAlert, UserPlus } from 'lucide-react'
import { useUsers } from './useUsers.js'
import { useSearch } from './useSearch.js'
import { useSortableData } from './useSortableData.js'
import { useSelection } from './useSelection.js'
import { fetchGroups } from '../GroupsPage/groups.api.js'
import { useDocumentTitle } from '../../hooks/useDocumentTitle.js'
import { useI18n } from '../../i18n/LanguageProvider.jsx'
import { Button, Input, Modal, Reveal, ToastContainer, TableSkeleton } from '../../components/index.js'
import { UsersTable } from './UsersTable.jsx'
import { AddUserForm } from './AddUserForm.jsx'
import styles from './UsersPage.module.css'

/**
 * Users management page with search, sort, and CRUD operations
 * @returns {JSX.Element}
 */
export function UsersPage() {
  const { t } = useI18n()
  useDocumentTitle(t('titles.users'))

  const { users, isLoading, error, retry, addUser, removeUser, removeUsers } = useUsers()
  const [query, setQuery] = useState('')
  const [groups, setGroups] = useState([])
  const [groupsError, setGroupsError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toasts, setToasts] = useState([])
  const [pendingDeletionIds, setPendingDeletionIds] = useState(new Set())
  const deletionTimers = useRef(new Map())

  const deferredQuery = useDeferredValue(query)
  const filtered = useSearch(users, deferredQuery, ['fullName', 'email', 'account'])
  const { sorted, sortConfig, requestSort } = useSortableData(filtered)
  const visibleUsers = useMemo(
    () => sorted.filter(user => !pendingDeletionIds.has(user.id)),
    [pendingDeletionIds, sorted]
  )

  const { selected, toggleOne, toggleAll, isAllSelected, clearSelection, selectedIds } =
    useSelection(visibleUsers)

  const groupNames = useMemo(() => new Map(groups.map(group => [group.id, group.name])), [groups])
  const managedUsersCount = useMemo(() => users.filter(user => user.groupId).length, [users])
  const unmanagedUsersCount = users.length - managedUsersCount

  const loadGroups = useCallback(async () => {
    try {
      const data = await fetchGroups()
      setGroups(data)
      setGroupsError(null)
    } catch (err) {
      setGroupsError(err.message)
    }
  }, [])

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  useEffect(() => {
    const timers = deletionTimers.current
    return () => {
      timers.forEach(timeout => window.clearTimeout(timeout))
      timers.clear()
    }
  }, [])

  const removeToast = useCallback(id => {
    setToasts(current => current.filter(toast => toast.id !== id))
  }, [])

  const showToast = useCallback(
    ({ id, message, type = 'info', duration = 3000, onUndo }) => {
      const toastId = id ?? `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

      setToasts(current => [
        ...current,
        {
          id: toastId,
          message,
          type,
          duration,
          onClose: () => removeToast(toastId),
          onUndo: onUndo
            ? () => {
                onUndo()
                removeToast(toastId)
              }
            : null,
        },
      ])

      return toastId
    },
    [removeToast]
  )

  const hideUsers = ids => {
    setPendingDeletionIds(current => {
      const next = new Set(current)
      ids.forEach(id => next.add(id))
      return next
    })
  }

  const restoreUsers = ids => {
    setPendingDeletionIds(current => {
      const next = new Set(current)
      ids.forEach(id => next.delete(id))
      return next
    })
  }

  const scheduleDeletion = ids => {
    const toastId = `delete-${Date.now()}-${ids.join('-')}`
    hideUsers(ids)
    clearSelection()

    const timeout = window.setTimeout(async () => {
      try {
        if (ids.length === 1) {
          await removeUser(ids[0])
          showToast({ message: t('users.toasts.deletedSingle'), type: 'success' })
        } else {
          await removeUsers(ids)
          showToast({
            message: t('users.toasts.deletedBulk', { count: ids.length }),
            type: 'success',
          })
        }
      } catch (err) {
        showToast({
          message: t('users.toasts.deleteError', { error: err.message }),
          type: 'error',
        })
      } finally {
        restoreUsers(ids)
        deletionTimers.current.delete(toastId)
        removeToast(toastId)
      }
    }, 5000)

    deletionTimers.current.set(toastId, timeout)

    showToast({
      id: toastId,
      message:
        ids.length === 1
          ? t('users.toasts.pendingSingle')
          : t('users.toasts.pendingBulk', { count: ids.length }),
      type: 'warning',
      duration: 5000,
      onUndo: () => {
        const activeTimeout = deletionTimers.current.get(toastId)
        if (activeTimeout) {
          window.clearTimeout(activeTimeout)
          deletionTimers.current.delete(toastId)
        }
        restoreUsers(ids)
      },
    })
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget?.ids?.length) {
      setDeleteTarget(null)
      return
    }

    scheduleDeletion(deleteTarget.ids)
    setDeleteTarget(null)
  }

  const handleAddUser = async userData => {
    try {
      await addUser(userData)
      setIsAddModalOpen(false)
      showToast({ message: t('users.toasts.addSuccess'), type: 'success' })
    } catch (err) {
      showToast({
        message: t('users.toasts.addError', { error: err.message }),
        type: 'error',
      })
    }
  }

  const metrics = [
    { label: t('users.metrics.total'), value: users.length },
    { label: t('users.metrics.managed'), value: managedUsersCount },
    { label: t('users.metrics.unmanaged'), value: unmanagedUsersCount },
    { label: t('users.metrics.groups'), value: groups.length },
  ]

  return (
    <div className={styles.pageContainer}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t('users.hero.title')}</h1>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <Input
          placeholder={t('users.controls.searchPlaceholder')}
          value={query}
          onChange={event => setQuery(event.target.value)}
          startIcon={Search}
          className={styles.searchField}
        />

        <div className={styles.toolbarActions}>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus size={16} />
            {t('users.hero.primaryCta')}
          </Button>
          {selectedIds.length > 0 && (
            <div className={styles.bulkActions}>
              <span>{selectedIds.length} выбрано</span>
              <Button
                variant="danger"
                onClick={() =>
                  setDeleteTarget({ ids: selectedIds, count: selectedIds.length, mode: 'bulk' })
                }
              >
                {t('users.controls.deleteSelected')}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        {metrics.map(metric => (
          <div key={metric.label} className={styles.metricCard}>
            <span className={styles.metricLabel}>{metric.label}</span>
            <p className={styles.metricValue}>{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Warning */}
        {groupsError && (
          <div className={styles.inlineWarning}>
            <ShieldAlert size={16} />
            <p>{t('users.states.groupsWarning')}</p>
          </div>
        )}

        {/* Content */}
        {error && !users.length ? (
          <div className={styles.stateCard}>
            <h2>{t('users.states.errorTitle')}</h2>
            <p>{error}</p>
            <Button
              onClick={() => {
                retry()
                loadGroups()
              }}
            >
              {t('common.retry')}
            </Button>
          </div>
        ) : isLoading ? (
          <TableSkeleton rows={7} columns={6} />
        ) : visibleUsers.length === 0 ? (
          <div className={styles.stateCard}>
            <h2>{t('users.states.emptyTitle')}</h2>
            <p>{t('users.states.emptyDescription')}</p>
            {query && (
              <Button variant="secondary" onClick={() => setQuery('')}>
                {t('users.controls.clearSearch')}
              </Button>
            )}
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <UsersTable
              users={visibleUsers}
              sortConfig={sortConfig}
              onSort={requestSort}
              selected={selected}
              onSelect={toggleOne}
              onSelectAll={toggleAll}
              isAllSelected={isAllSelected}
              groupNames={groupNames}
              labels={{
                caption: t('users.table.caption'),
                selectAll: t('users.table.selectAll'),
                fullName: t('users.table.fullName'),
                account: t('users.table.account'),
                email: t('users.table.email'),
                group: t('users.table.group'),
                phone: t('users.table.phone'),
                actions: t('users.table.actions'),
                unmanaged: t('users.table.unmanaged'),
                deleteUser: t('users.table.deleteUser'),
                sortBy: t('users.table.sortBy'),
              }}
              onDelete={user => setDeleteTarget({ ids: [user.id], name: user.fullName, mode: 'single' })}
            />
          </div>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('users.form.title')}
        closeLabel={t('common.close')}
        actions={[
          { label: t('common.close'), onClick: () => setIsAddModalOpen(false), variant: 'secondary' },
        ]}
      >
        <AddUserForm onSubmit={handleAddUser} groups={groups} />
      </Modal>

      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title={t('users.confirmDelete.title')}
        closeLabel={t('common.close')}
        actions={[
          {
            label: t('common.cancel'),
            onClick: () => setDeleteTarget(null),
            variant: 'secondary',
          },
          {
            label: t('users.confirmDelete.confirm'),
            onClick: handleConfirmDelete,
            variant: 'danger',
          },
        ]}
      >
        <div className={styles.confirmContent}>
          <p className={styles.confirmTitle}>
            {deleteTarget?.mode === 'bulk'
              ? t('users.confirmDelete.bulk', { count: deleteTarget.count })
              : t('users.confirmDelete.single', { name: deleteTarget?.name ?? '' })}
          </p>
          <p className={styles.confirmNote}>{t('users.confirmDelete.description')}</p>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} />
    </div>
  )
}
