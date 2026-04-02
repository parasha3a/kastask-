import { beforeAll, afterEach, afterAll } from 'vitest'
import '@testing-library/jest-dom'
import { server } from './src/mocks/server.js'

if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback
    }

    observe(target) {
      this.callback([{ isIntersecting: true, target }])
    }

    unobserve() {}

    disconnect() {}

    takeRecords() {
      return []
    }
  }
}

/**
 * Establish API mocking before all tests
 */
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

/**
 * Reset any request handlers that we may add during the tests
 */
afterEach(() => {
  server.resetHandlers()
})

/**
 * Clean up after the tests are finished
 */
afterAll(() => {
  server.close()
})
