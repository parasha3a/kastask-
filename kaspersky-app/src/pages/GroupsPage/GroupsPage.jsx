import { useMemo, useState } from 'react'
import { Mail, ShieldCheck, UsersRound } from 'lucide-react'
import { GroupCard } from './GroupCard.jsx'
import { useGroups } from './useGroups.js'
import { useDocumentTitle } from '../../hooks/useDocumentTitle.js'
import { useI18n } from '../../i18n/LanguageProvider.jsx'
import { Button, Modal, Reveal, Skeleton } from '../../components/index.js'
import styles from './GroupsPage.module.css'

/**
 * Groups management page with modal-driven detail view.
 * @returns {JSX.Element}
 */
export function GroupsPage() {
  const { t } = useI18n()
  useDocumentTitle(t('titles.groups'))

  const { groups, users, isLoading, error, retry, getUsersInGroup, getUnmanagedUsers } = useGroups()
  const [selectedGroupId, setSelectedGroupId] = useState(null)

  const unmanagedUsers = useMemo(() => getUnmanagedUsers(), [getUnmanagedUsers])
  const activeGroups = useMemo(
    () => groups.filter(group => getUsersInGroup(group.id).length > 0).length,
    [getUsersInGroup, groups]
  )

  const selectedGroup = useMemo(
    () => groups.find(group => group.id === selectedGroupId) ?? null,
    [groups, selectedGroupId]
  )
  const selectedGroupUsers = useMemo(
    () => (selectedGroup ? getUsersInGroup(selectedGroup.id) : []),
    [getUsersInGroup, selectedGroup]
  )

  const metrics = [
    { label: t('groups.metrics.groups'), value: groups.length },
    { label: t('groups.metrics.members'), value: users.filter(user => user.groupId).length },
    { label: t('groups.metrics.unmanaged'), value: unmanagedUsers.length },
    { label: t('groups.metrics.active'), value: activeGroups },
  ]

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t('groups.hero.title')}</h1>
      </div>

      <div className={styles.metricsGrid}>
        {metrics.map(metric => (
          <div key={metric.label} className={styles.metricCard}>
            <span className={styles.metricLabel}>{metric.label}</span>
            <p className={styles.metricValue}>{metric.value}</p>
          </div>
        ))}
      </div>

      <main className={styles.mainContent}>
        {error && !groups.length ? (
          <div className={styles.stateCard}>
            <h2>{t('groups.states.errorTitle')}</h2>
            <p>{error}</p>
            <Button onClick={retry}>{t('groups.states.retry')}</Button>
          </div>
        ) : isLoading ? (
          <div className={styles.groupsGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} variant="rect" className={styles.groupSkeleton} />
            ))}
          </div>
        ) : (
          <div className={styles.groupsGrid}>
            {groups.map((group, index) => {
              const groupUsers = getUsersInGroup(group.id)

              return (
                <Reveal key={group.id} delay={index * 0.04}>
                  <GroupCard
                    group={group}
                    userCount={groupUsers.length}
                    color={group.color}
                    labels={{
                      members: t('groups.card.members'),
                      open: t('groups.card.open'),
                      action: t('groups.card.action'),
                    }}
                    onOpen={() => setSelectedGroupId(group.id)}
                  />
                </Reveal>
              )
            })}
          </div>
        )}

        {unmanagedUsers.length > 0 && (
          <div className={styles.unmanagedSection}>
            <h2 className={styles.unmanagedTitle}>{t('groups.sections.unmanagedTitle')}</h2>
            <div className={styles.unmanagedList}>
              {unmanagedUsers.map((user, index) => (
                <Reveal key={user.id} className={styles.unmanagedUser} delay={index * 0.03}>
                  <div className={styles.userInfo}>
                    <p className={styles.userName}>{user.fullName}</p>
                    <p className={styles.userEmail}>{user.email}</p>
                  </div>
                  <span className={styles.userAccount}>{user.account}</span>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </main>

      <Modal
        isOpen={Boolean(selectedGroup)}
        onClose={() => setSelectedGroupId(null)}
        title={selectedGroup?.name ?? t('groups.card.modalTitle')}
        closeLabel={t('common.close')}
        actions={[
          {
            label: t('common.close'),
            onClick: () => setSelectedGroupId(null),
            variant: 'secondary',
          },
        ]}
      >
        {selectedGroup && (
          <div className={styles.modalContent}>
            <div className={styles.modalIntro}>
              <div className={styles.modalIdentity}>
                <span
                  className={styles.modalBadge}
                  style={{ '--group-accent': selectedGroup.color }}
                  aria-hidden="true"
                />
                <div className={styles.modalMeta}>
                  <span className={styles.modalCaption}>{t('groups.card.modalTitle')}</span>
                  <h3>{selectedGroup.name}</h3>
                </div>
              </div>

              <div className={styles.modalStats}>
                <span className={styles.modalStat}>
                  <UsersRound size={14} />
                  {t('groups.card.members', { count: selectedGroupUsers.length })}
                </span>
                <span className={styles.modalStat}>
                  <ShieldCheck size={14} />
                  {t('groups.card.descriptionLabel')}
                </span>
              </div>
            </div>

            <div className={styles.modalDescription}>
              <p>{selectedGroup.description}</p>
            </div>

            <div className={styles.modalMembers}>
              <h4>{t('groups.card.memberListTitle')}</h4>
              {selectedGroupUsers.length > 0 ? (
                <ul className={styles.memberList}>
                  {selectedGroupUsers.map(user => (
                    <li key={user.id} className={styles.memberItem}>
                      <div className={styles.memberPrimary}>
                        <strong>{user.fullName}</strong>
                        <span>{user.phone}</span>
                      </div>
                      <div className={styles.memberSecondary}>
                        <span className={styles.memberEmail}>
                          <Mail size={14} />
                          {user.email}
                        </span>
                        <span className={styles.memberAccount}>
                          {t('groups.card.accountLabel')}: {user.account}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.emptyMembers}>{t('groups.card.empty')}</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
