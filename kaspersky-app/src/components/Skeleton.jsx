import './Skeleton.module.css'

/**
 * Skeleton loader component
 * @param {Object} props
 * @param {string} [props.variant='text'] - 'text', 'circle', 'rect'
 * @param {number} [props.width] - width in px
 * @param {number} [props.height] - height in px
 * @returns {JSX.Element}
 */
export function Skeleton({ variant = 'text', width, height }) {
  const style = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : undefined,
  }

  return <div className={`skeleton skeleton-${variant}`} style={style} />
}

/**
 * Table skeleton with multiple rows
 * @param {number} [rows=5] - number of rows
 * @param {number} [columns=5] - number of columns
 * @returns {JSX.Element}
 */
export function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="table-skeleton">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} width={100} height={20} />
          ))}
        </div>
      ))}
    </div>
  )
}
