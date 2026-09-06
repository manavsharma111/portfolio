import { motion } from 'framer-motion'

export default function GravitationalLens() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden">
      {/* 
        The Gravitational Lens Distortion Field 
        This uses CSS backdrop-filter to warp, blur, and distort the light (pixels) 
        of anything that passes directly behind the black hole's event horizon.
        We use a radial-gradient mask to shape the distortion like an Einstein Ring.
      */}
      <motion.div 
        className="w-[600px] h-[600px] rounded-full mix-blend-hard-light"
        animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1] 
        }}
        transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          // The visual distortion
          backdropFilter: 'blur(10px) contrast(150%) brightness(1.5) hue-rotate(15deg)',
          WebkitBackdropFilter: 'blur(10px) contrast(150%) brightness(1.5) hue-rotate(15deg)',
          
          // Cut out the center (event horizon) and fade out the edges to make a ring
          maskImage: 'radial-gradient(circle, transparent 20%, black 35%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 20%, black 35%, transparent 60%)',
          
          // Slight color tint to the lens
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)'
        }}
      />
    </div>
  )
}
