import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CinematicTextReveal({ text, className = '', splitBy = 'word', once = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "0px 0px -15% 0px" })
  const textRef = useRef(null)

  useEffect(() => {
    if (splitBy !== 'letter') return
    if (!textRef.current) return

    if (!isInView) {
      textRef.current.textContent = ""
      return
    }

    let start = performance.now()
    let animationFrame
    
    const animate = (time) => {
      const elapsed = time - start
      // 10ms per character
      const charsToShow = Math.floor(elapsed / 10)
      
      if (charsToShow <= text.length) {
        textRef.current.textContent = text.slice(0, charsToShow)
        animationFrame = requestAnimationFrame(animate)
      } else {
        textRef.current.textContent = text
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, text, splitBy])

  const elements = splitBy === 'letter' ? text.split("") : text.split(" ")

  // For absolute zero-lag letter-by-letter reveal (bypasses React render cycle entirely)
  if (splitBy === 'letter') {
    return (
      <div ref={ref} className={`relative ${className}`}>
        {/* Invisible full text to maintain precise height and line wrapping */}
        <p className="opacity-0 pointer-events-none select-none" aria-hidden="true">
          {text}
        </p>
        {/* Visible typing text positioned perfectly over the hidden one */}
        <p className="absolute top-0 left-0 w-full h-full" ref={textRef}></p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.1 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.p
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap ${className}`}
    >
      {elements.map((el, index) => (
        <span key={index} className="overflow-hidden inline-flex mr-1 sm:mr-[0.25rem] mb-1">
          <motion.span variants={child} className="inline-block">
            {el}
          </motion.span>
        </span>
      ))}
    </motion.p>
  )
}
