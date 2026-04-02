import { beforeAll, afterEach, afterAll } from 'vitest'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { expect } from 'vitest'

// Extend vitest matchers with jest-axe
expect.extend(toHaveNoViolations)

// MSW setup
import { server } from './src/mocks/server.js'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' })
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
