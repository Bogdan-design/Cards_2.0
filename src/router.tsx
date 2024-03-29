import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout, PersonalInformation, RecoverPassword, SignUpForm } from '@/component'
import { CheckEmail } from '@/component/auth/check.email'
import { Cards, Decks } from '@/pages'
import { Learn } from '@/pages/cards/learn/learn'
import { Login } from '@/pages/login'
import { useMeQuery } from '@/services/auth/auth.service'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <SignUpForm />,
  },
  {
    path: '/recovery',
    element: <RecoverPassword />,
  },
  {
    path: '/check',
    element: <CheckEmail />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/user',
    element: <PersonalInformation />,
  },
  {
    path: '/cards/:id',
    element: <Cards />,
  },
  {
    path: '/cards/:id/learn',
    element: <Learn />,
  },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
    ],
  },
  ...publicRoutes,
  {
    path: '*',
    element: <h1>404</h1>,
  },
])

export const Router = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()

  const isAuthenticated = !isError

  if (isLoading) return <div>Loading...</div>

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
