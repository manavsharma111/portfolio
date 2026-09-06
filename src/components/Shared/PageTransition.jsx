import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [trigger, setTrigger] = useState(0)

  // Re-trigger the cinematic sweep on route change + scroll to top
  useEffect(() => {
    setTrigger(prev => prev + 1)
    // Always start at top of new page
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
  }, [location.pathname])

  return (
    <>
      {/* Cinematic arrival sweep / flare effect */}
      <motion.div
        key={trigger}
        className="fixed top-0 left-0 right-0 h-[1px] z-[9997] pointer-events-none"
        style={{ 
          background: 'linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.8), rgba(139, 92, 246, 0.8), transparent)',
          boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)'
        }}
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ y: ['100vh', '-10vh'], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
      {children}
    </>
  )
}
