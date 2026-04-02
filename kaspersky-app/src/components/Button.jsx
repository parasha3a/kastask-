import styles from './Button.module.css'

/**
 * Reusable Button component
 * @param {Object} props
 * @param {string} [props.variant='primary'] - 'primary', 'secondary', 'danger', 'success'
 * @param {string} [props.size='md'] - 'sm', 'md', 'lg'
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.loading=false]
 * @param {ReactNode} props.children
 * @param {Function} [props.onClick]
 * @returns {JSX.Element}
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className = '',
  onClick,
  ...props
}) {
  const variantClass = styles[`btn${variant.charAt(0).toUpperCase()}${variant.slice(1)}`]
  const sizeClass = styles[`btn${size.charAt(0).toUpperCase()}${size.slice(1)}`]
  const finalClassName = `${styles.btn} ${variantClass || ''} ${sizeClass || ''} ${disabled ? styles.disabled : ''} ${
    loading ? styles.loading : ''
  } ${className}`.trim()

  return (
    <button
      className={finalClassName}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={styles.label}>{children}</span>
    </button>
  )
}
