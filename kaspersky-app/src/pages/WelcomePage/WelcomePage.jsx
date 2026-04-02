import { Link } from 'react-router'
import './WelcomePage.module.css'

/**
 * Welcome/Home page
 * @returns {JSX.Element}
 */
export function WelcomePage() {
  return (
    <div className="welcome">
      <div className="welcome-hero">
        <h1>Welcome to Kaspersky Users Management</h1>
        <p>A modern React application for managing users and groups</p>
      </div>

      <div className="welcome-features">
        <div className="feature">
          <h3>👥 Users Management</h3>
          <p>View, search, sort, and manage users with full CRUD operations and group assignments</p>
          <Link to="/users" className="feature-link">Go to Users →</Link>
        </div>

        <div className="feature">
          <h3>🏢 Groups Overview</h3>
          <p>Browse user groups with member counts and quick access to group details</p>
          <Link to="/groups" className="feature-link">Go to Groups →</Link>
        </div>
      </div>

      <div className="welcome-info">
        <h2>About This Project</h2>
        <p>
          This is a test assignment showcasing modern React patterns, including:
        </p>
        <ul>
          <li>Custom hooks for state management</li>
          <li>Semantic HTML and accessibility (a11y)</li>
          <li>Performance optimization with React Compiler</li>
          <li>Integration with json-server API</li>
          <li>Comprehensive testing with Vitest and MSW</li>
        </ul>
      </div>
    </div>
  )
}
