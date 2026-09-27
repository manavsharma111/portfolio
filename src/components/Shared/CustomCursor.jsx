import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Smooth springing physics for the trailing circle
  const springX = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 })
  const springY = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const onMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      springX.set(e.clientX)
      springY.set(e.clientY)
    }
    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    // Check for interactive elements
    const onMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        window.getComputedStyle(e.target).cursor === 'pointer'
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mouseover', onMouseOver)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [springX, springY])

  if (isMobile) return null

  return (
    <>
      {/* Tiny solid dot that instantly follows mouse */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-pink rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{ x: mousePos.x - 6, y: mousePos.y - 6 }}
        animate={{ scale: isClicking ? 0.8 : isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Larger transparent trailing circle */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border rounded-full pointer-events-none z-[9998] mix-blend-screen"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(255, 0, 110, 0.1)' : 'rgba(0, 217, 255, 0.1)',
          borderColor: isHovering ? 'rgba(255, 0, 110, 0.5)' : 'rgba(0, 217, 255, 0.5)'
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
