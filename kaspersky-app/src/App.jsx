import { createBrowserRouter } from 'react-router'
import { RootLayout } from './components/Layout.jsx'
import { WelcomePage } from './pages/WelcomePage/WelcomePage.jsx'
import { UsersPage } from './pages/UsersPage/UsersPage.jsx'

/**
 * Groups page - placeholder
 */
function GroupsPage() {
  return <div>Groups Page (coming next)</div>
}

/**
 * Not found page - 404
 */
function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/groups',
        element: <GroupsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
