import { Outlet, Link } from 'react-router'
import './Layout.module.css'

/**
 * Root layout with navigation
 * @returns {JSX.Element}
 */
export function RootLayout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Kaspersky Users App</h1>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/users" className="nav-link">Users</Link>
            <Link to="/groups" className="nav-link">Groups</Link>
          </nav>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2025 Kaspersky Test Assignment. All rights reserved.</p>
      </footer>
    </div>
  )
}
