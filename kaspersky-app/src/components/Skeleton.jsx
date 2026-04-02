import styles from './Skeleton.module.css'

/**
 * Skeleton loader component
 * @param {Object} props
 * @param {string} [props.variant='text'] - 'text', 'circle', 'rect'
 * @param {number} [props.width] - width in px
 * @param {number} [props.height] - height in px
 * @returns {JSX.Element}
 */
export function Skeleton({ variant = 'text', width, height, className }) {
  const style = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : undefined,
  }

  const variantClass = styles[`skeleton${variant.charAt(0).toUpperCase()}${variant.slice(1)}`]
  const finalClassName = className ? `${styles.skeleton} ${variantClass || ''} ${className}` : `${styles.skeleton} ${variantClass || ''}`

  return <div className={finalClassName} style={style} />
}

/**
 * Table skeleton with multiple rows
 * @param {number} [rows=5] - number of rows
 * @param {number} [columns=5] - number of columns
 * @returns {JSX.Element}
 */
export function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className={styles.tableSkeleton}>
      <div className={styles.tableHeaderSkeleton}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={`header-${index}`} width={120} height={18} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={styles.skeletonRow}>
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} width={100} height={20} />
          ))}
        </div>
      ))}
    </div>
  )
}
