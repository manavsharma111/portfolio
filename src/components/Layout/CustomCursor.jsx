import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [variant, setVariant] = useState('default')
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Main cursor: fast spring
  const x = useSpring(cursorX, { stiffness: 700, damping: 25 })
  const y = useSpring(cursorY, { stiffness: 700, damping: 25 })
  // Trailing circle: slow spring (comet tail)
  const trailX = useSpring(cursorX, { stiffness: 150, damping: 20 })
  const trailY = useSpring(cursorY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 8)
      cursorY.set(e.clientY - 8)
    }
    const enterLink = () => setVariant('hover')
    const leaveLink = () => setVariant('default')

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-hover], input, textarea').forEach(el => {
      el.addEventListener('mouseenter', enterLink)
      el.addEventListener('mouseleave', leaveLink)
    })
    
    // Setup observer for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          document.querySelectorAll('a, button, [data-hover], input, textarea').forEach(el => {
            el.removeEventListener('mouseenter', enterLink)
            el.removeEventListener('mouseleave', leaveLink)
            el.addEventListener('mouseenter', enterLink)
            el.addEventListener('mouseleave', leaveLink)
          })
        }
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [cursorX, cursorY])

  // DISABLE on touch devices
  const isTouch = window.matchMedia('(hover: none)').matches
  if (isTouch) return null

  return (
    <>
      {/* Trailing circle (comet tail) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full"
        style={{
          x: trailX, y: trailY,
          width: variant === 'hover' ? 40 : 24,
          height: variant === 'hover' ? 40 : 24,
          background: variant === 'hover' ? 'rgba(255,0,110,0.15)' : 'rgba(0,217,255,0.1)',
          border: '1px solid rgba(0,217,255,0.3)',
          transition: 'width 0.2s, height 0.2s, background 0.2s',
          translateX: variant === 'hover' ? '-12px' : '-4px',
          translateY: variant === 'hover' ? '-12px' : '-4px',
        }}
      />
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x, y,
          width: variant === 'hover' ? 16 : 8,
          height: variant === 'hover' ? 16 : 8,
          background: variant === 'hover' ? '#ff006e' : '#00d9ff',
          boxShadow: variant === 'hover'
            ? '0 0 20px rgba(255,0,110,0.6)'
            : '0 0 15px rgba(0,217,255,0.5)',
          translateX: variant === 'hover' ? '0px' : '4px',
          translateY: variant === 'hover' ? '0px' : '4px',
        }}
      />
    </>
  )
}
