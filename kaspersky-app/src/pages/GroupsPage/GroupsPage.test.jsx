import { describe, it, expect } from 'vitest'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { renderWithProviders } from '../../test/renderWithProviders.jsx'
import { GroupsPage } from './GroupsPage.jsx'

describe('GroupsPage', () => {
  it('should render groups page title', async () => {
    renderWithProviders(<GroupsPage />)
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /See group structure, member density/i })).toBeInTheDocument()
    })
  })

  it('should display loading skeleton initially', () => {
    renderWithProviders(<GroupsPage />)
    // Skeleton should be present initially
    const skeletons = document.querySelectorAll('[class*="skeleton"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should render groups after loading', async () => {
    renderWithProviders(<GroupsPage />)
    await waitFor(() => {
      expect(screen.getByText(/CDN\/CEO/)).toBeInTheDocument()
    })
  })

  it('should display unmanaged users section', async () => {
    renderWithProviders(<GroupsPage />)
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Unmanaged users/i })).toBeInTheDocument()
    })
  })

  it('should have open buttons in group cards', async () => {
    renderWithProviders(<GroupsPage />)

    await waitFor(() => {
      expect(screen.getByText(/CDN\/CEO/)).toBeInTheDocument()
    })

    const openButtons = screen.queryAllByRole('button', { name: /open/i })
    expect(openButtons.length).toBeGreaterThan(0)
  })

  it('should display member count for groups', async () => {
    renderWithProviders(<GroupsPage />)
    await waitFor(() => {
      // Look for text like "X members"
      const memberTexts = screen.queryAllByText(/members/)
      expect(memberTexts.length).toBeGreaterThan(0)
    })
  })

  it('should open modal with group details', async () => {
    renderWithProviders(<GroupsPage />)

    const trigger = await screen.findByRole('button', { name: /open cdn\/ceo/i })
    fireEvent.click(trigger)

    const dialog = await screen.findByRole('dialog')

    await waitFor(() => {
      expect(dialog).toBeInTheDocument()
      expect(within(dialog).getByText(/Chief Executive Officer/i)).toBeInTheDocument()
      expect(within(dialog).getByText(/Group members/i)).toBeInTheDocument()
    })
  })
})
