import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import DialerNavbar from './DialerNavbar'
import CustomCursor from './CustomCursor'
import CursorSparks from './CursorSparks'
import ScrollProgress from './ScrollProgress'
import BlackholeBackground from '../Shared/BlackholeBackground'
import PageTransition from '../Shared/PageTransition'
import Loader from './Loader'
import KeyboardShortcutToast from './KeyboardShortcutToast'

const PAGE_GLOW = {
  '/':        'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,217,255,0.03), transparent)',
  '/skills':  'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,217,255,0.05), transparent)',
  '/projects':'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(139,92,246,0.05), transparent)',
}

export default function RootLayout() {
  const location = useLocation()
  const glow = PAGE_GLOW[location.pathname] || PAGE_GLOW['/']

  return (
    <>
      <Loader />
      <BlackholeBackground />
      {/* Per-page subtle ambient glow */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: glow }}
      />
      <CursorSparks />
      <CustomCursor />
      <ScrollProgress />
      <DialerNavbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <KeyboardShortcutToast />
    </>
  )
}
