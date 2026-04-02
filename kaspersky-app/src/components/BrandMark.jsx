import styles from './BrandMark.module.css'

export function BrandMark({ title = 'Kaspersky', subtitle = 'Security Console', inverse = false }) {
  return (
    <div className={`${styles.brandMark} ${inverse ? styles.inverse : ''}`}>
      <span className={styles.brandIcon} aria-hidden="true">
        К
      </span>
      <span className={styles.brandText}>
        <span className={styles.brandTitle}>{title}</span>
        <span className={styles.brandSubtitle}>{subtitle}</span>
      </span>
    </div>
  )
}
