import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { useI18n } from '../i18n/LanguageProvider.jsx'
import styles from './Toast.module.css'

const MotionDiv = motion.div

/**
 * Toast/Notification component with auto-dismiss
 * @param {Object} props
 * @param {string} props.message - toast message
 * @param {string} [props.type='info'] - 'success', 'error', 'warning', 'info'
 * @param {number} [props.duration=3000] - auto-dismiss time in ms
 * @param {Function} [props.onClose] - callback when closing
 * @param {Function} [props.onUndo] - callback for undo action (5s default)
 * @returns {JSX.Element}
 */
export function Toast({ message, type = 'info', duration = 3000, onClose, onUndo }) {
  const { t } = useI18n()

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const Icon = {
    success: CheckCircle2,
    error: AlertTriangle,
    warning: AlertTriangle,
    info: Info,
  }[type]

  return (
    <MotionDiv
      className={`${styles.toast} ${styles[`toast${type.charAt(0).toUpperCase()}${type.slice(1)}`]}`}
      initial={{ opacity: 0, x: 36, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 36, y: 10 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      role="status"
    >
      <span className={styles.toastIcon} aria-hidden="true">
        <Icon size={18} />
      </span>
      <span className={styles.toastMessage}>{message}</span>
      {onUndo && (
        <button type="button" className={styles.toastUndo} onClick={onUndo}>
          {t('common.undo')}
        </button>
      )}
      <button
        type="button"
        className={styles.toastClose}
        onClick={onClose}
        aria-label={t('common.close')}
      >
        <X size={16} />
      </button>
    </MotionDiv>
  )
}

/**
 * Toast container to display multiple toasts
 * @param {Object} props
 * @param {Array} props.toasts - [{ id, message, type, onClose, onUndo }]
 * @returns {JSX.Element}
 */
export function ToastContainer({ toasts = [] }) {
  if (toasts.length === 0) return null

  return (
    <div className={styles.toastContainer}>
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={toast.onClose}
            onUndo={toast.onUndo}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
