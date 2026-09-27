import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/Shared/CustomCursor'

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <RouterProvider router={router} />
    </SmoothScroll>
  )
}
