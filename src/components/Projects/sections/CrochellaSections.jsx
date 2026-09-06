import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../../hooks/useGsap'
import RevealMask from '../../Shared/RevealMask'

const sections = [
  {
    title: '3D Product Experience',
    content: 'React Three Fiber powers interactive 3D fabric and product previews. GSAP and Framer Motion deliver cinematic scroll transitions across the landing page.',
  },
  {
    title: 'Multi-Vendor Architecture',
    content: 'Complete marketplace with seller registration, inventory management, admin moderation, delivery partner app, and Razorpay checkout with PDF invoicing.',
  },
  {
    title: 'AI & Real-Time Systems',
    content: 'OpenAI, Groq, and Google GenAI for smart recommendations. Socket.io live delivery tracking on Leaflet maps with OTP-verified handoffs.',
  },
]

export default function CrochellaSections() {
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
                <span className="text-[#8b5cf6] text-sm uppercase tracking-widest mb-4 block">
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
