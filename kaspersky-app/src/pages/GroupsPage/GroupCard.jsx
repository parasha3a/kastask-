import { ArrowUpRight, UsersRound } from 'lucide-react'
import styles from './GroupCard.module.css'

/**
 * Compact group card that opens details in a modal.
 * @param {Object} props
 * @param {Object} props.group - Group data
 * @param {number} props.userCount - Number of users in group
 * @param {string} props.color - Hex color for group badge
 * @param {Object} props.labels - translated strings
 * @param {Function} props.onOpen - Callback to open modal
 * @returns {JSX.Element}
 */
export function GroupCard({ group, userCount, color, labels, onOpen }) {
  return (
    <article className={styles.groupCard} style={{ '--group-accent': color }}>
      <button
        type="button"
        className={styles.cardButton}
        onClick={onOpen}
        aria-label={labels.open.replace('{name}', group.name)}
      >
        <div className={styles.cardHeader}>
          <div className={styles.groupInfo}>
            <span className={styles.colorBadge} aria-hidden="true" />
            <div className={styles.groupDetails}>
              <h3 className={styles.groupName}>{group.name}</h3>
              <p className={styles.groupDescription}>{group.description}</p>
            </div>
          </div>

          <div className={styles.cardMeta}>
            <span className={styles.memberCount}>
              <UsersRound size={14} />
              {labels.members.replace('{count}', userCount)}
            </span>
            <span className={styles.openIcon} aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>

        <span className={styles.cardAction}>{labels.action}</span>
      </button>
    </article>
  )
}
