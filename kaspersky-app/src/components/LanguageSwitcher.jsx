import { Languages } from 'lucide-react'
import { useI18n } from '../i18n/LanguageProvider.jsx'
import styles from './LanguageSwitcher.module.css'

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n()

  return (
    <div className={styles.languageSwitcher} aria-label={t('nav.languageLabel')}>
      <span className={styles.languageIcon} aria-hidden="true">
        <Languages size={16} />
      </span>
      {['en', 'ru'].map(item => (
        <button
          key={item}
          type="button"
          className={`${styles.languageButton} ${language === item ? styles.active : ''}`}
          onClick={() => setLanguage(item)}
          aria-pressed={language === item}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
