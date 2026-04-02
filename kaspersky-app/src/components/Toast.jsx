import { useEffect } from 'react'
import './Toast.module.css'

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
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-message">{message}</span>
      {onUndo && (
        <button className="toast-undo" onClick={onUndo}>
          Undo
        </button>
      )}
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
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
    <div className="toast-container">
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
    </div>
  )
}
