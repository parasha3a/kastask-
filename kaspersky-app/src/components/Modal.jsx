import { useEffect, useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import styles from './Modal.module.css'
import { Button } from './Button.jsx'

const MotionDiv = motion.div

/**
 * Modal/Dialog component
 * @param {Object} props
 * @param {boolean} props.isOpen - whether modal is open
 * @param {Function} props.onClose - callback when closing
 * @param {string} [props.title] - modal title
 * @param {ReactNode} props.children - modal content
 * @param {Object} [props.actions] - { label, onClick, variant }[]
 * @returns {JSX.Element|null}
 */
export function Modal({ isOpen, onClose, title, children, actions = [], closeLabel = 'Close' }) {
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={event => {
            if (event.target === event.currentTarget) {
              onClose()
            }
          }}
        >
          <MotionDiv
            className={styles.modalContent}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
          >
            <div className={styles.modalHeader}>
              {title ? (
                <h2 id={titleId} className={styles.modalTitle}>
                  {title}
                </h2>
              ) : (
                <span />
              )}
              <button type="button" className={styles.modalClose} onClick={onClose} aria-label={closeLabel}>
                <X size={18} />
              </button>
            </div>
            <div className={styles.modalBody}>{children}</div>
            {actions.length > 0 && (
              <div className={styles.modalFooter}>
                {actions.map(action => (
                  <Button
                    key={action.label}
                    variant={action.variant || 'primary'}
                    onClick={action.onClick}
                    type={action.type || 'button'}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}
