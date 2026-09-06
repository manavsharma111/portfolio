import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import TextScramble from '../Shared/TextScramble'
import GlitchText from '../Shared/GlitchText'
import MagneticButton from '../Shared/MagneticButton'

export default function HeroText() {
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const btnsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    // Name lines entrance
    const nameLines = nameRef.current.querySelectorAll('h1')
    tl.fromTo(nameLines, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    )

    // Subtitle fade in
    tl.fromTo(subtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=0.2"
    )

    // Buttons slide up
    tl.fromTo(btnsRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
      "-=0.5"
    )
  }, [])

  return (
    <div className="relative z-10 flex flex-col justify-center h-full max-w-4xl px-4 md:pl-20 pt-16 md:pt-0 text-left">
      <div className="mb-1 text-textMuted font-heading text-sm md:text-lg tracking-widest uppercase">
        Hi, I'm
      </div>
      
      <div ref={nameRef} className="flex flex-col leading-[0.85] mb-2 cursor-crosshair">
        <h1 
          className="font-heading font-black text-white relative inline-block"
          style={{ 
            fontSize: 'clamp(3rem, 13vw, 8rem)', 
            textShadow: '0 0 40px rgba(255,255,255,0.2)' 
          }}
        >
          {"MANAV".split('').map((char, i) => (
            <span key={i} className="inline-block"><TextScramble text={char} /></span>
          ))}
        </h1>
        
        <h1 
          className="font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple relative inline-block ml-1 lg:ml-2"
          style={{ 
            fontSize: 'clamp(3rem, 13vw, 8rem)',
          }}
        >
          {"SHARMA".split('').map((char, i) => (
            <span key={i} className="inline-block"><TextScramble text={char} /></span>
          ))}
        </h1>
      </div>

      <div ref={subtitleRef} className="mt-3 text-base md:text-2xl text-cyan opacity-0 font-medium tracking-wide">
        <GlitchText text="Backend Engineer · System Design" />
      </div>

      {/* Open to Work Badge */}
      <a
        href="#contact"
        onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
        className="mt-4 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all duration-300 group w-fit"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="text-xs md:text-sm font-semibold text-emerald-400 tracking-wide group-hover:text-emerald-300 transition-colors">
          Open to Opportunities
        </span>
      </a>

      <div ref={btnsRef} className="mt-6 flex flex-wrap gap-3 md:gap-6 opacity-0">
        <MagneticButton>
          <Link 
            to="/projects" 
            className="px-5 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-cyan to-purple text-background font-bold text-sm md:text-lg shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all hover:scale-105 inline-block"
          >
            View Projects
          </Link>
        </MagneticButton>

        <MagneticButton>
          <Link 
            to="/contact" 
            className="px-5 md:px-8 py-3 md:py-4 rounded-full glass border border-pink text-pink font-bold text-sm md:text-lg shadow-[0_0_15px_rgba(255,0,110,0.2)] transition-all hover:scale-105 inline-block"
          >
            Get in Touch
          </Link>
        </MagneticButton>
      </div>
    </div>
  )
}
