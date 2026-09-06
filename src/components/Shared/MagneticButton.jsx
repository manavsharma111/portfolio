import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({ children, onClick, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Attract towards cursor by 30% of distance
    const distanceX = (e.clientX - centerX) * 0.3
    const distanceY = (e.clientY - centerY) * 0.3
    
    // Cap at max ~12px
    x.set(Math.max(-12, Math.min(12, distanceX)))
    y.set(Math.max(-12, Math.min(12, distanceY)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: xSpring, y: ySpring }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
