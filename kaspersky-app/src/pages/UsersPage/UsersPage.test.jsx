import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../test/renderWithProviders.jsx'
import { UsersPage } from './UsersPage.jsx'

describe('UsersPage', () => {
  it('should render users page title', async () => {
    renderWithProviders(<UsersPage />)
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /User directory built for fast review/i })).toBeInTheDocument()
    })
  })

  it('should display loading skeleton initially', () => {
    renderWithProviders(<UsersPage />)
    // Skeleton should be present initially
    const skeletons = document.querySelectorAll('[class*="skeleton"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should render users table after loading', async () => {
    renderWithProviders(<UsersPage />)
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
  })

  it('should have add user button', async () => {
    renderWithProviders(<UsersPage />)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Add user/i })).toBeInTheDocument()
    })
  })

  it('should display search input', async () => {
    renderWithProviders(<UsersPage />)
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/Search by full name, email or account/i)
      ).toBeInTheDocument()
    })
  })

  it('should have sortable column headers', async () => {
    renderWithProviders(<UsersPage />)
    await waitFor(() => {
      expect(screen.getByText(/Full name/)).toBeInTheDocument()
      expect(screen.getByText(/Email/)).toBeInTheDocument()
      expect(screen.getByText(/Account/)).toBeInTheDocument()
    })
  })

  it('should have select all checkbox', async () => {
    renderWithProviders(<UsersPage />)
    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)
    })
  })
})
