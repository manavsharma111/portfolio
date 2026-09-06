import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '../Shared/MagneticButton'

const links = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/about', label: 'About' },
  { path: '/achievements', label: 'Achievements' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 glass border-b-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-heading font-bold neon-text">
            MS
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
              return (
                <MagneticButton key={link.path}>
                  <Link 
                    to={link.path}
                    className={`relative text-sm font-medium transition-colors hover:text-cyan
                      ${isActive ? 'text-cyan' : 'text-textMuted'}
                    `}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-cyan to-purple"
                      />
                    )}
                  </Link>
                </MagneticButton>
              )
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 text-textMain"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-transform origin-left ${isOpen ? 'rotate-45 translate-x-1' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-transform origin-left ${isOpen ? '-rotate-45 translate-x-1' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 glass bg-background/90 flex flex-col items-center justify-center space-y-8"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-heading font-bold ${
                    location.pathname === link.path ? 'gradient-text' : 'text-textMain'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
