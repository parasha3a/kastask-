/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations.js'

const STORAGE_KEY = 'kaspersky-ui-language'
const FALLBACK_LANGUAGE = 'en'

const LanguageContext = createContext(null)

function resolveMessage(messages, path) {
  return path.split('.').reduce((value, segment) => value?.[segment], messages)
}

function interpolate(message, params) {
  if (typeof message !== 'string' || !params) {
    return message
  }

  return message.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`))
}

function getInitialLanguage(initialLanguage) {
  if (initialLanguage) {
    return initialLanguage
  }

  if (typeof window === 'undefined') {
    return FALLBACK_LANGUAGE
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY)
  if (storedLanguage && translations[storedLanguage]) {
    return storedLanguage
  }

  const browserLanguage = window.navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en'
  return browserLanguage
}

export function LanguageProvider({ children, initialLanguage }) {
  const [language, setLanguage] = useState(() => getInitialLanguage(initialLanguage))

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }

    if (typeof window !== 'undefined' && !initialLanguage) {
      window.localStorage.setItem(STORAGE_KEY, language)
    }
  }, [initialLanguage, language])

  const value = useMemo(() => {
    const messages = translations[language] ?? translations[FALLBACK_LANGUAGE]

    return {
      language,
      messages,
      setLanguage,
      toggleLanguage: () => setLanguage(current => (current === 'en' ? 'ru' : 'en')),
      t: (path, params) => {
        const message = resolveMessage(messages, path)
        if (message == null) {
          return path
        }

        return interpolate(message, params)
      },
    }
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useI18n must be used within LanguageProvider')
  }

  return context
}
