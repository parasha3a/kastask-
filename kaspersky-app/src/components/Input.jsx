import './Input.module.css'

/**
 * Reusable Input component
 * @param {Object} props
 * @param {string} [props.placeholder]
 * @param {string} [props.type='text']
 * @param {string} [props.value]
 * @param {Function} [props.onChange]
 * @param {string} [props.error]
 * @param {boolean} [props.disabled=false]
 * @returns {JSX.Element}
 */
export function Input({
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  disabled = false,
  ...props
}) {
  return (
    <div className="input-wrapper">
      <input
        className={`input ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  )
}
