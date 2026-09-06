import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function SectionDivider() {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end center"]
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="w-full py-12 flex justify-center">
      <svg 
        width="100%" 
        height="24" 
        viewBox="0 0 1000 24" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-cyan)" />
            <stop offset="50%" stopColor="var(--color-purple)" />
            <stop offset="100%" stopColor="var(--color-pink)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,12 Q250,24 500,12 T1000,12"
          stroke="url(#dividerGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
          initial={{ pathLength: 0 }}
        />
      </svg>
    </div>
  )
}
