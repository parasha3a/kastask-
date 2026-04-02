import { createBrowserRouter } from 'react-router'
import { RootLayout } from './components/Layout.jsx'
import { WelcomePage } from './pages/WelcomePage/WelcomePage.jsx'
import { UsersPage } from './pages/UsersPage/UsersPage.jsx'
import { GroupsPage } from './pages/GroupsPage/GroupsPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'

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
