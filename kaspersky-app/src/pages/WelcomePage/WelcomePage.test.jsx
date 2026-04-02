import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test/renderWithProviders.jsx'
import { WelcomePage } from './WelcomePage.jsx'

describe('WelcomePage', () => {
  it('should render welcome page with title', () => {
    renderWithProviders(<WelcomePage />)
    expect(screen.getByRole('heading', { name: /Protect every user touchpoint/i })).toBeInTheDocument()
  })

  it('should render feature links', () => {
    renderWithProviders(<WelcomePage />)
    expect(screen.getByText(/Review users/i)).toBeInTheDocument()
    expect(screen.getByText(/Inspect groups/i)).toBeInTheDocument()
  })

  it('should have navigation links', () => {
    renderWithProviders(<WelcomePage />)
    const usersLink = screen.getByRole('link', { name: /Review users/i })
    expect(usersLink).toHaveAttribute('href', '/users')
  })

  it('should mention key technologies', () => {
    renderWithProviders(<WelcomePage />)
    expect(screen.getByText(/Audit-friendly workflows/i)).toBeInTheDocument()
    expect(screen.getByText(/Immediate visibility into unmanaged identities/i)).toBeInTheDocument()
  })
})
