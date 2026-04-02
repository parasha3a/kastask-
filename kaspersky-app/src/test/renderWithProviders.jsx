import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { LanguageProvider } from '../i18n/LanguageProvider.jsx'

export function renderWithProviders(ui, { route = '/', language = 'en' } = {}) {
  return render(
    <LanguageProvider initialLanguage={language}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </LanguageProvider>
  )
}
