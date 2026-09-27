import React from 'react'
import { motion } from 'framer-motion'

export default function TwistingTextHover({ text, className = "" }) {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className={`relative inline-flex overflow-hidden ${className}`}
    >
      <span className="sr-only">{text}</span>
      
      {/* Top Text (moves up and hides) */}
      <div aria-hidden="true" className="flex">
        {text.split('').map((char, index) => (
          <motion.span
            key={`top-${index}`}
            className="inline-block whitespace-pre"
            variants={{
              initial: { y: '0%', rotateX: 0 },
              hover: { y: '-100%', rotateX: 90 }
            }}
            transition={{
              duration: 0.4,
              ease: [0.33, 1, 0.68, 1],
              delay: index * 0.025,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      
      {/* Bottom Text (moves up into view) */}
      <div aria-hidden="true" className="absolute top-full left-0 flex">
        {text.split('').map((char, index) => (
          <motion.span
            key={`bottom-${index}`}
            className="inline-block whitespace-pre origin-bottom"
            variants={{
              initial: { y: '0%', rotateX: -90, opacity: 0 },
              hover: { y: '-100%', rotateX: 0, opacity: 1 }
            }}
            transition={{
              duration: 0.4,
              ease: [0.33, 1, 0.68, 1],
              delay: index * 0.025,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
