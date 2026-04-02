import './Button.module.css'

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
  onClick,
  ...props
}) {
  const className = `btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''} ${
    loading ? 'loading' : ''
  }`

  return (
    <button className={className} onClick={onClick} disabled={disabled || loading} {...props}>
      {loading ? '...' : children}
    </button>
  )
}
