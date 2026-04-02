import { Link } from 'react-router'
import { ArrowLeft, ShieldAlert } from 'lucide-react'
import { useI18n } from '../i18n/LanguageProvider.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import styles from './NotFoundPage.module.css'

/**
 * 404 Not Found page
 * @returns {JSX.Element}
 */
export function NotFoundPage() {
  const { t } = useI18n()
  useDocumentTitle(t('titles.notFound'))

  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundContent}>
        <span className="eyebrow">
          <ShieldAlert size={14} />
          {t('notFound.eyebrow')}
        </span>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>{t('notFound.title')}</h2>
        <p className={styles.errorDescription}>{t('notFound.description')}</p>
        <Link to="/" className={styles.homeLink}>
          <ArrowLeft size={16} />
          {t('notFound.action')}
        </Link>
      </div>
    </div>
  )
}
