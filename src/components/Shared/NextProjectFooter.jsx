import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function NextProjectFooter({ nextProject }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const active = isHovered || isMobile

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden border-t border-white/10 group cursor-pointer">
      
      {/* Mobile: always-visible background */}
      {isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={nextProject.image}
            alt={nextProject.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Desktop: hover reveal */}
      {!isMobile && (
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img 
                src={nextProject.image} 
                alt={nextProject.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Default Dark Background */}
      <div className="absolute inset-0 bg-[#020202] -z-10" />

      {/* Link Overlay */}
      <Link 
        to={`/projects/${nextProject.slug}`}
        viewTransition
        className="absolute inset-0 z-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Next Project: ${nextProject.name}`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none">
        <motion.span 
          animate={{ y: active ? -10 : 0, opacity: active ? 0.7 : 0.5 }}
          className="text-sm md:text-base text-textMuted uppercase tracking-[0.3em] mb-6 font-semibold"
        >
          Next Case Study
        </motion.span>
        
        <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-black leading-none tracking-tight text-transparent transition-all duration-700"
            style={{ 
              WebkitTextStroke: active ? `2px #fff` : `1px rgba(255,255,255,0.2)`,
              color: 'transparent',
              textShadow: active ? `0 0 40px ${nextProject.accentColor}` : 'none'
            }}
        >
          {nextProject.name}
        </h2>
        
        <motion.div 
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm"
        >
          <ArrowDown size={32} strokeWidth={1.5} className="text-white" />
        </motion.div>
      </div>

    </section>
  )
}
