import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function NextPageFooter({ title, subtitle, url, image, accentColor }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden border-t border-white/10 group cursor-pointer">
      
      {/* Background Image Reveal */}
      <AnimatePresence>
        {isHovered && image && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default Dark Background */}
      <div className="absolute inset-0 bg-[#020202] -z-10" />

      {/* Link Overlay */}
      <Link 
        to={url}
        viewTransition
        className="absolute inset-0 z-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Next: ${title}`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none">
        <motion.span 
          animate={{ y: isHovered ? -10 : 0, opacity: isHovered ? 0.7 : 0.5 }}
          className="text-sm md:text-base text-textMuted uppercase tracking-[0.3em] mb-6 font-semibold"
        >
          {subtitle || 'Next Step'}
        </motion.span>
        
        <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-black leading-none tracking-tight text-transparent transition-all duration-700"
            style={{ 
              WebkitTextStroke: isHovered ? `2px #fff` : `1px rgba(255,255,255,0.2)`,
              color: isHovered ? 'transparent' : 'transparent',
              textShadow: isHovered ? `0 0 40px ${accentColor || '#ffffff'}` : 'none'
            }}
        >
          {title}
        </h2>
        
        {/* Subtle arrow indicator */}
        <motion.div 
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm"
        >
          <ArrowDown size={32} strokeWidth={1.5} className="text-white" />
        </motion.div>
      </div>

    </section>
  )
}
