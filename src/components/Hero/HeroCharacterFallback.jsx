import { motion } from 'framer-motion'

export default function HeroCharacterFallback() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      <motion.div
        className="w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full mix-blend-screen opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.8) 0%, rgba(139,92,246,0.3) 50%, transparent 70%)',
          filter: 'blur(30px)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px #00d9ff'
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.8, 0.1]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}
