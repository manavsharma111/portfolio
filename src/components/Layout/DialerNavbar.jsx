import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Briefcase, Code2, Mail, Menu, X } from 'lucide-react'

// Links configuration
const links = [
  { path: '/', label: 'Home', icon: Home, hash: '' },
  { path: '/projects', label: 'Projects', icon: Briefcase, hash: '' },
  { path: '/skills', label: 'Skills', icon: Code2, hash: '' },
  { path: '/', label: 'Contact', icon: Mail, hash: '#contact' }, 
]

export default function DialerNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  // Track active index based on route or hash
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    // Basic active index logic based on path
    if (location.pathname.startsWith('/projects')) {
      setActiveIndex(1)
    } else if (location.pathname.startsWith('/skills')) {
      setActiveIndex(2)
    } else {
      setActiveIndex(0) // Default to Home if on / or other routes
    }
  }, [location.pathname])

  const handleLinkClick = (link, idx, e, navigate) => {
    setIsOpen(false)
    if (link.hash) {
      setActiveIndex(idx)
      if (location.pathname !== '/') {
        // On a different page — navigate home with scrollTo state
        e.preventDefault()
        navigate('/', { state: { scrollTo: 'contact' } })
      } else {
        // Already on home — just scroll
        e.preventDefault()
        setTimeout(() => {
          const el = document.querySelector(link.hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    } else if (link.path === '/' && location.pathname === '/') {
        setActiveIndex(0)
        if (window.lenis) {
          window.lenis.scrollTo(0)
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
  }

  // Angles: Top (-90), Right (0), Bottom (90), Left (180)
  const angles = [-90, 0, 90, 180]
  
  return (
    <>
      {/* FAB - Bottom Right */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            layoutId="dialer-container"
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
             <Menu size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Dialer - Center Screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              layoutId="dialer-container"
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="relative w-80 h-80 rounded-full glass border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(0,217,255,0.1)] bg-background/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Center Hub */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute w-24 h-24 bg-background border-2 border-white/5 rounded-full flex items-center justify-center text-white z-20 hover:bg-white/5 transition-colors shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group"
              >
                <X size={32} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
              
              {/* Glowing Pointer */}
              <motion.div 
                className="absolute w-full h-full pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ rotate: angles[activeIndex], opacity: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-1 h-6 bg-cyan rounded-full shadow-[0_0_15px_#00d9ff]" />
              </motion.div>

              {/* Dial Items */}
              {links.map((link, i) => {
                const angle = angles[i]
                const radius = 110 // Distance from center
                const rad = angle * (Math.PI / 180)
                const x = Math.cos(rad) * radius
                const y = Math.sin(rad) * radius

                const Icon = link.icon
                const isActive = activeIndex === i

                return (
                  <motion.div
                    key={link.label}
                    className="absolute z-30"
                    style={{ x, y }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={link.path + (link.hash || '')}
                      onClick={(e) => {
                         if (link.hash) {
                             handleLinkClick(link, i, e, navigate)
                         } else {
                             handleLinkClick(link, i, e, navigate)
                         }
                      }}
                      className="group relative flex flex-col items-center justify-center w-14 h-14 rounded-full bg-background border border-white/10 transition-all hover:bg-white/5 hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)]"
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <Icon size={22} className={isActive ? 'text-cyan drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]' : 'text-textMuted group-hover:text-white transition-colors'} />
                      
                      {/* Tooltip (Hidden on mobile, hover on desktop) */}
                      <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-textMain whitespace-nowrap bg-background/90 px-2 py-1 rounded border border-white/10 pointer-events-none hidden md:block">
                         {link.label}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
