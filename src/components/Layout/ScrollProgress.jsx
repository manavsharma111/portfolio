import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[1000]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #00d9ff, #8b5cf6, #ff006e)',
        boxShadow: '0 0 10px rgba(0,217,255,0.5)'
      }}
    />
  )
}
