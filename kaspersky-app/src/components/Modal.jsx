import './Modal.module.css'
import { Button } from './Button.jsx'

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
export function Modal({ isOpen, onClose, title, children, actions = [] }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
        )}
        <div className="modal-body">{children}</div>
        {actions.length > 0 && (
          <div className="modal-footer">
            {actions.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant || 'primary'}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
