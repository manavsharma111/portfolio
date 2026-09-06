import HeroText from './HeroText'
import TerminalSimulator from './TerminalSimulator'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { motion } from 'framer-motion'

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section className="relative w-full min-h-[100svh] overflow-x-hidden flex flex-col">
      {/* Ambient background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(0,217,255,0.05), transparent 70%)'
        }}
      />
      
      {/* Main content area */}
      <div className={`flex-1 flex ${isMobile ? 'flex-col justify-center' : 'grid grid-cols-2 items-center'} w-full max-w-7xl mx-auto relative z-10 px-4 md:px-0`}>
        
        {/* Left Side: Text */}
        <div className="relative w-full flex items-center justify-start py-8 md:py-0">
          <HeroText />
        </div>

        {/* Right Side: Interactive Terminal — desktop only */}
        {!isMobile && (
          <div className="flex justify-center items-center">
            <TerminalSimulator />
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-cyan drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
