import HeroText from './HeroText'
import TerminalSimulator from './TerminalSimulator'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { motion } from 'framer-motion'

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(0,217,255,0.05), transparent 70%)'
        }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 items-center h-full w-full max-w-7xl mx-auto relative z-10 px-4 md:px-0">
        
        {/* Left Side: Text */}
        <div className="relative w-full h-full flex items-center justify-center">
          <HeroText />
        </div>

        {/* Right Side: Interactive Terminal */}
        <div className="hidden md:flex justify-center items-center">
          <TerminalSimulator />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
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
