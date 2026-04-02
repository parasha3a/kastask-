import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { useDocumentTitle } from '../../hooks/useDocumentTitle.js'
import { useI18n } from '../../i18n/LanguageProvider.jsx'
import styles from './WelcomePage.module.css'

const MotionDiv = motion.div

/**
 * Welcome/Home page - minimalist landing with Kaspersky design
 * @returns {JSX.Element}
 */
export function WelcomePage() {
  const { t } = useI18n()
  useDocumentTitle(t('titles.home'))

  return (
    <div className={styles.pageWrapper}>
      {/* Dark Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <MotionDiv
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h1 className={styles.heroTitle}>
              {t('welcome.hero.title').split(' ').slice(0, -3).join(' ')}
              {' '}
              <span className={styles.heroAccent}>
                {t('welcome.hero.title').split(' ').slice(-3).join(' ')}
              </span>
            </h1>
            <p className={styles.heroDescription}>{t('welcome.hero.description')}</p>

            <ul className={styles.heroBullets}>
              {t('welcome.hero.bullets').map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className={styles.heroActions}
          >
            <Link to="/users" className={`button-link primary ${styles.heroCta}`}>
              {t('welcome.hero.primaryCta')}
              <ArrowRight size={16} />
            </Link>
            <Link to="/groups" className={`button-link secondary ${styles.heroCta}`}>
              {t('welcome.hero.secondaryCta')}
              <ArrowRight size={16} />
            </Link>
          </MotionDiv>
        </div>
      </section>
    </div>
  )
}
