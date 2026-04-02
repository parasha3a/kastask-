import { setupServer } from 'msw/node'
import { handlers } from './handlers.js'

/**
 * MSW server for testing
 * Used in vitest setup to intercept HTTP requests
 */
export const server = setupServer(...handlers)
