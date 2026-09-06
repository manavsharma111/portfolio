import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../../hooks/useGsap'
import RevealMask from '../../Shared/RevealMask'

const sections = [
  {
    title: 'Raycasting Engine',
    content: 'Classic DOOM-style raycasting renders pseudo-3D environments from a 2D map. Each column cast determines wall distance, height, and shading.',
  },
  {
    title: 'NPC Intelligence',
    content: 'Non-player characters use pathfinding algorithms to navigate the map, chase the player, and respond to line-of-sight detection.',
  },
  {
    title: 'Modular Architecture',
    content: 'Engine components — rendering, input, collision, AI, weapons — are separated into modules for easy expansion and feature additions.',
  },
]

export default function WolfSections() {
  const containerRef = useRef(null)

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll('.pin-section')
    if (!sections) return

    const triggers = []
    sections.forEach((section) => {
      const tween = gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=400',
          pin: true,
          pinSpacing: true,
        },
      })
      triggers.push(tween)
    })

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <div ref={containerRef} className="py-16">
      {sections.map((s, i) => (
        <div key={i} className="pin-section min-h-[60vh] flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <RevealMask>
              <div className="card glass rounded-2xl p-10 md:p-16">
                <span className="text-[#00d9ff] text-sm uppercase tracking-widest mb-4 block">
                  0{i + 1}
                </span>
                <h3 className="text-3xl font-bold mb-6 gradient-text" style={{ fontFamily: 'Space Grotesk' }}>
                  {s.title}
                </h3>
                <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl">{s.content}</p>
              </div>
            </RevealMask>
          </div>
        </div>
      ))}
    </div>
  )
}
