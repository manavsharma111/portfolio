import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { projects } from './ProjectData'
import TextScramble from '../Shared/TextScramble'
import GlitchText from '../Shared/GlitchText'
import Marquee from '../Shared/Marquee'
import MagneticButton from '../Shared/MagneticButton'
import RevealMask from '../Shared/RevealMask'
import CountUp from '../Shared/CountUp'
import SectionDivider from '../Shared/SectionDivider'
import NexForgeCliDocs from './NexForgeCliDocs'
import CinematicTextReveal from '../Shared/CinematicTextReveal'
import TechStackSpotlight from '../Shared/TechStackSpotlight'
import NextProjectFooter from '../Shared/NextProjectFooter'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectPage({ project, projectIndex }) {
  const containerRef = useRef(null)
  const [showTopBtn, setShowTopBtn] = useState(false)
  const { scrollYProgress, scrollY } = useScroll()
  const navigate = useNavigate()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 600) {
      setShowTopBtn(true)
    } else {
      setShowTopBtn(false)
    }
  })

  const num = String(projectIndex + 1).padStart(2, '0')
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1]
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0]

  useEffect(() => {
    // Wait for a tick to ensure DOM is fully painted
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Background Parallax
        gsap.to('.parallax-bg', {
          y: (i, el) => -el.getBoundingClientRect().height * 0.3,
          ease: 'none',
          scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 }
        })
      }, containerRef)

      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timer)
  }, [project])

  return (
    <article ref={containerRef} className="w-full min-h-screen bg-background text-textMain pb-20 overflow-x-hidden">

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ scaleX: scrollYProgress, backgroundColor: project.accentColor, boxShadow: `0 0 10px ${project.accentColor}` }}
      />

      {/* 1. Hero Block - Full Bleed Image for Seamless Transition */}
      <section className="hero-section relative w-full h-screen min-h-[600px] flex flex-col justify-center px-6 pb-20 pt-32">

        {/* Ambient Parallax Background that bleeds down the page */}
        <div
          className="parallax-bg absolute inset-0 pointer-events-none opacity-30 z-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent 70%)`,
            height: '150%', top: '-25%'
          }}
        />

        {/* Scroll Down Arrow (Top Right) → goes to Let's Connect */}
        <motion.button
          onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
          className="absolute top-8 right-8 md:top-12 md:right-12 z-50 w-14 h-14 rounded-full glass border border-white/20 flex items-center justify-center hover:border-cyan/50 hover:bg-white/5 transition-all shadow-2xl group cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          aria-label="Go to Contact"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-white group-hover:text-cyan transition-colors"
          >
            ↓
          </motion.div>
        </motion.button>

        {/* Full Screen Background Image (Constrained) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
          {/* Gradients to ensure text readability and blend with the page below */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{ background: `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent 70%)` }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center mt-20">

          <div className="flex gap-6 justify-center mb-16">
            {project.github && (
              <MagneticButton>
                <a href={project.github} target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-colors text-white font-bold tracking-wide inline-block shadow-lg">
                  GitHub
                </a>
              </MagneticButton>
            )}
            <MagneticButton>
              {project.liveDemo ? (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-full bg-black/50 backdrop-blur-xl border transition-all hover:bg-black/70 font-bold tracking-wide inline-block shadow-lg"
                  style={{ borderColor: project.accentColor, color: project.accentColor, boxShadow: `0 0 20px ${project.accentColor}30` }}
                >
                  Live Demo
                </a>
              ) : (
                <button className="px-8 py-4 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-textMuted cursor-not-allowed shadow-lg">
                  Live Demo
                </button>
              )}
            </MagneticButton>
          </div>

          <RevealMask direction="top">
            <div className="relative w-full max-w-6xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden glass border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group mt-4">
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
            </div>
          </RevealMask>
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-background/50 backdrop-blur-md z-20">
          <Marquee items={project.tech} speed="30s" />
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <RevealMask direction="top">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-8 gradient-text">Overview</h2>
              <p className="text-lg text-textMuted leading-relaxed">
                {project.description}
              </p>
            </div>
          </RevealMask>

          <RevealMask direction="top">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.metrics.slice(0, 4).map((m, i) => (
                <div key={i} className="glass p-6 rounded-2xl border border-white/5">
                  <div className="text-3xl font-heading font-bold mb-2" style={{ color: project.accentColor }}>
                    <CountUp end={m.value} suffix={m.suffix} duration={2} />
                  </div>
                  <div className="text-sm text-textMuted uppercase tracking-wider">{m.label}</div>
                  {m.note && <div className="text-xs text-textMuted/50 mt-1">{m.note}</div>}
                </div>
              ))}
            </div>
          </RevealMask>
        </div>
      </section>

      {/* 3. Architecture Pipeline Section (Vertical Timeline) */}
      <section className="py-32 px-6 w-full bg-[#030308] relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.03] pointer-events-none"
          style={{ backgroundColor: project.accentColor }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealMask direction="top">
            <h2 className="text-4xl md:text-6xl font-heading font-bold gradient-text text-center mb-24">
              <TextScramble text="Architecture Workflow" triggerOnView={true} />
            </h2>
          </RevealMask>

          <div className="relative flex flex-col gap-12 md:gap-0">
            {/* Connecting Vertical Line (Desktop only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            {project.architecture.map((step, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 py-4 md:py-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Timeline Node (Desktop only) */}
                <RevealMask direction="top" className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-5 h-5 rounded-full bg-background border-[3px] shadow-[0_0_15px_rgba(0,0,0,0.5)] relative" style={{ borderColor: project.accentColor }}>
                    <div className="absolute inset-0 m-auto w-full h-full bg-current rounded-full animate-ping opacity-40" style={{ color: project.accentColor }} />
                  </div>
                </RevealMask>

                {/* Empty Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />

                {/* Card */}
                <RevealMask className="flex-1 w-full" direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="relative glass p-8 md:p-12 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white relative z-10 flex items-center gap-4">
                      <span className="text-sm font-mono tracking-widest opacity-50" style={{ color: project.accentColor }}>STEP {i + 1}</span>
                      <br className="md:hidden" />
                      {step.title}
                    </h3>
                    <p className="text-lg text-textMuted relative z-10 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </RevealMask>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Spotlight Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-12 text-center gradient-text">Technology Stack</h2>
        <TechStackSpotlight techList={project.tech} accentColor={project.accentColor} />
      </section>

      {/* 4. Key Metrics Section */}
      <section className="py-24 bg-background border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">Performance & Scale</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {project.metrics.map((m, i) => (
              <RevealMask key={i} direction="top">
                <div className="glass px-8 py-6 rounded-2xl text-center min-w-[250px] h-full">
                  <div className="text-4xl font-heading font-bold mb-2" style={{ color: project.accentColor, textShadow: `0 0 20px ${project.accentColor}40` }}>
                    <CountUp end={m.value} suffix={m.suffix} duration={2} />
                  </div>
                  <div className="text-textMuted text-sm uppercase">{m.label}</div>
                </div>
              </RevealMask>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Deep Dive Sections */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <SectionDivider />
        <div className="mt-20 space-y-20">
          {project.deepDive.map((section, i) => {
            if (section.customComponent === 'NexForgeCliDocs') {
              return (
                <RevealMask key={i} direction="top">
                  <NexForgeCliDocs />
                </RevealMask>
              )
            }
            return (
              <RevealMask key={i} direction="top">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/20 inline-block" />
                    <span style={{ color: project.accentColor }}>{section.title}</span>
                  </h3>
                  <div className="text-lg text-textMuted leading-relaxed space-y-4">
                    {section.content.split('\n').map((para, pIdx) => (
                      <CinematicTextReveal key={pIdx} text={para} />
                    ))}
                  </div>
                </div>
              </RevealMask>
            )
          })}
        </div>
      </section>

      {/* 6. Immersive Next Project Footer */}
      <NextProjectFooter nextProject={nextProject} />

    </article>
  )
}



