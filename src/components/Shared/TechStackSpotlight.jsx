import { useRef } from 'react'
import StackIcon from 'tech-stack-icons'
import RevealMask from './RevealMask'
import { getTechIconName, needsInvert } from '../../utils/techIconMap'
import CustomTechIcon from './CustomTechIcon'

export default function TechStackSpotlight({ techList = [], accentColor = '#00d9ff' }) {
  const containerRef = useRef(null)
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.spotlight-card')
    for (const card of cards) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    }
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      {techList.map((tech, i) => {
        const iconName = getTechIconName(tech)
        return (
          <RevealMask key={i} direction="top">
            <div 
              className="spotlight-card relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden group flex flex-col items-center justify-center p-8 gap-4 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-default h-full"
            >
              {/* Outer Glow */}
              <div 
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{ background: `radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentColor}50, transparent 70%)` }}
              />
              <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-[#030308] z-0" />
              <div 
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 mix-blend-screen"
                style={{ background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentColor}15, transparent 80%)` }}
              />

              {/* Icon */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className={`w-10 h-10 flex items-center justify-center ${iconName && needsInvert(iconName) ? 'invert brightness-0' : ''}`}>
                  <CustomTechIcon name={tech} className="w-10 h-10" />
                  {!CustomTechIcon({ name: tech }) && (
                    iconName ? (
                      <StackIcon name={iconName} style={{ width: 40, height: 40 }} />
                    ) : (
                      <span className="text-2xl" style={{ color: accentColor }}>◈</span>
                    )
                  )}
                </div>
                <span className="text-sm md:text-base font-medium text-textMain tracking-wide text-center">
                  {tech}
                </span>
              </div>
            </div>
          </RevealMask>
        )
      })}
    </div>
  )
}
