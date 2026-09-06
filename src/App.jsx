import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import SmoothScroll from './components/SmoothScroll'

export default function App() {
  return (
    <SmoothScroll>
      <RouterProvider router={router} />
    </SmoothScroll>
  )
}
