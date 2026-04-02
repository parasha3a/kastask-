import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Menu, ShieldCheck, X } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { useI18n } from '../i18n/LanguageProvider.jsx'
import { BrandMark } from './BrandMark.jsx'
import { LanguageSwitcher } from './LanguageSwitcher.jsx'
import styles from './Layout.module.css'

const MotionSpan = motion.span
const MotionDiv = motion.div

/**
 * Root layout with navigation
 * @returns {JSX.Element}
 */
export function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { messages, t } = useI18n()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 24, mass: 0.2 })

  const navItems = useMemo(
    () => [
      { to: '/', label: t('nav.links.home') },
      { to: '/users', label: t('nav.links.users') },
      { to: '/groups', label: t('nav.links.groups') },
    ],
    [t]
  )

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined
    }

    const originalOverflow = document.body.style.overflow
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  return (
    <div className={styles.layout}>
      <MotionSpan className={styles.progressBar} style={{ scaleX: progress }} />
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logoLink} aria-label={messages.meta.appName}>
            <BrandMark subtitle={messages.nav.productSuffix} />
          </Link>

          <nav className={styles.nav} aria-label={t('nav.primaryNavigation')}>
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <LanguageSwitcher />
            <Link to="/users" className={styles.headerCta}>
              {t('nav.cta')}
              <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
              onClick={() => setIsMobileMenuOpen(open => !open)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionDiv
            className={styles.mobileMenuLayer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              className={styles.mobileMenuBackdrop}
              aria-label={t('nav.menuClose')}
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <MotionDiv
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className={styles.mobileMenuInner}>
                <div className={styles.mobileMenuSummary}>
                  <span className={styles.mobileMenuEyebrow}>
                    <ShieldCheck size={14} />
                    {messages.nav.tagline}
                  </span>
                  <p>{messages.nav.mobileSummary}</p>
                </div>
                <nav className={styles.mobileNav} aria-label={t('nav.primaryNavigation')}>
                  {navItems.map(item => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <Link to="/users" className={styles.mobileCta} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.cta')}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>

      <main className={styles.main}>
        <AnimatePresence mode="wait" initial={false}>
          <MotionDiv
            key={location.pathname}
            className={styles.pageFrame}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Outlet />
          </MotionDiv>
        </AnimatePresence>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>{t('footer.minimalist')}</p>
        </div>
      </footer>
    </div>
  )
}
