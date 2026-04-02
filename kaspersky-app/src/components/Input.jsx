import { useId } from 'react'
import styles from './Input.module.css'

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
  label,
  hint,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  disabled = false,
  className = '',
  id,
  startIcon: StartIcon,
  ...props
}) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`

  return (
    <div className={`${styles.inputWrapper} ${className}`.trim()}>
      {(label || hint) && (
        <div className={styles.inputMeta}>
          {label && (
            <label className={styles.inputLabel} htmlFor={inputId}>
              {label}
            </label>
          )}
          {hint && <span className={styles.inputHint}>{hint}</span>}
        </div>
      )}

      <div
        className={`${styles.inputField} ${error ? styles.inputFieldError : ''} ${
          disabled ? styles.inputFieldDisabled : ''
        }`}
      >
        {StartIcon && (
          <span className={styles.inputIcon} aria-hidden="true">
            <StartIcon size={18} />
          </span>
        )}
        <input
          id={inputId}
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          {...props}
        />
      </div>

      {hint && !error && (
        <span id={hintId} className={styles.inputHintText}>
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className={styles.inputErrorText}>
          {error}
        </span>
      )}
    </div>
  )
}
