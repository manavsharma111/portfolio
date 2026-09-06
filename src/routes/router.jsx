import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RootLayout from '../components/Layout/RootLayout'

const Home = lazy(() => import('../pages/Home'))
const ProjectsHubPage = lazy(() => import('../pages/ProjectsHubPage'))
const ProjectDetailPage = lazy(() => import('../pages/ProjectDetailPage'))
const SkillsPage = lazy(() => import('../pages/SkillsPage'))
const NotFound = lazy(() => import('../pages/NotFound'))

const withSuspense = (el) => <Suspense fallback={null}>{el}</Suspense>

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: 'projects', element: withSuspense(<ProjectsHubPage />) },
      { path: 'projects/:slug', element: withSuspense(<ProjectDetailPage />) },
      { path: 'skills', element: withSuspense(<SkillsPage />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
])
