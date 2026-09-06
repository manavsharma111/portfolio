import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function RevealMask({ children, className = '', direction = 'left' }) {
  const ref = useRef(null)
  // margin "-15%" means it triggers when element is 15% from the bottom (similar to top 85%)
  // once: false means it triggers repeatedly (bidirectional)
  const isInView = useInView(ref, { once: false, margin: "0px 0px -15% 0px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  let x = 0
  let y = 0
  if (direction === 'right') x = -100
  else if (direction === 'left') x = 100
  else if (direction === 'top') y = 100
  else if (direction === 'bottom') y = -100

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x, y },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
      }}
    >
      {children}
    </motion.div>
  )
}
