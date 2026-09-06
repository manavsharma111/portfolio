import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({ children, className = '', intensity = 15, accentColor = '#00d9ff' }) {
  const ref = useRef(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity])
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [100, 0])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [100, 0])
  const edgeGlow = useTransform(
    () => Math.max(Math.abs(rotateX.get()), Math.abs(rotateY.get())) / intensity
  )

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: 1000 }} className={`w-full h-full ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          boxShadow: useTransform(edgeGlow, v => `0 ${v * 20}px ${v * 40}px ${accentColor}${Math.round(v * 50).toString(16).padStart(2,'0')}`)
        }}
        className="relative will-change-transform w-full h-full"
      >
        <div style={{ transform: 'translateZ(0)', width: '100%', height: '100%' }}>
           {children}
        </div>
        
        {/* Moving Glare Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit z-50 mix-blend-overlay opacity-50 transition-opacity"
          style={{
            background: `radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.4) 0%, transparent 50%)`,
            '--gx': useTransform(glareX, v => `${v}%`),
            '--gy': useTransform(glareY, v => `${v}%`),
          }}
        />
      </motion.div>
    </div>
  )
}
