import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { projects } from '../components/Projects/ProjectData'
import { Helmet } from 'react-helmet-async'

function HorizontalShowcase() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(projects.length - 1) * 100}%`])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * projects.length + 0.1), projects.length - 1)
    setActiveIndex(idx)
  })

  const activeProject = projects[activeIndex]

  return (
    <section ref={containerRef} style={{ height: `${projects.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Segmented Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex h-[3px]">
          {projects.map((proj, i) => (
            <div key={proj.slug} className="flex-1 relative overflow-hidden bg-white/5">
              <motion.div
                className="absolute inset-0 origin-left"
                animate={{ scaleX: activeIndex > i ? 1 : activeIndex === i ? 1 : 0 }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  background: proj.accentColor,
                  boxShadow: `0 0 8px ${proj.accentColor}`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Full-bleed background */}
        {projects.map((proj, i) => (
          <motion.div
            key={proj.slug}
            className="absolute inset-0"
            animate={{ opacity: activeIndex === i ? 1 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            <div
              className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
              style={{ background: proj.accentColor }}
            />
          </motion.div>
        ))}

        {/* Sliding strip */}
        <motion.div style={{ x }} className="absolute inset-0 flex pointer-events-none opacity-0 will-change-transform">
          {projects.map(proj => (
            <div key={proj.slug} className="w-screen h-screen flex-shrink-0" />
          ))}
        </motion.div>

        {/* Content overlay — left panel */}
        <div className="relative z-10 h-full flex flex-col justify-between px-5 md:px-20 pt-24 pb-10 md:pb-16 max-w-3xl">
          
          {/* Top: counter + label */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
              {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <span className="w-8 md:w-12 h-px bg-white/20" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: activeProject.accentColor }}>
              Case Study
            </span>
          </div>

          {/* Middle: Project name + tagline */}
          <div>
            {projects.map((proj, i) => (
              <motion.div
                key={proj.slug}
                className={`absolute ${activeIndex === i ? 'pointer-events-auto' : 'pointer-events-none'}`}
                initial={false}
                animate={{ opacity: activeIndex === i ? 1 : 0, y: activeIndex === i ? 0 : 30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <h2
                  className="font-heading font-black leading-none mb-4"
                  style={{
                    fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                    color: proj.accentColor,
                    textShadow: `0 0 60px ${proj.accentColor}40`
                  }}
                >
                  {proj.name}
                </h2>
                <p className="text-white/70 text-sm md:text-xl max-w-sm md:max-w-lg leading-relaxed mb-5 md:mb-8">
                  {proj.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mb-6 md:mb-10">
                  {proj.tech.slice(0, 4).map(t => (
                    <span key={t} className="px-2 md:px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/50 backdrop-blur-sm font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/projects/${proj.slug}`}
                  viewTransition
                  className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-base text-background transition-all hover:scale-105 hover:shadow-2xl"
                  style={{ backgroundColor: proj.accentColor, boxShadow: `0 0 30px ${proj.accentColor}40` }}
                >
                  View Case Study
                  <span>→</span>
                </Link>
              </motion.div>
            ))}
            {/* spacer so layout doesn't collapse */}
            <div style={{ height: 'clamp(11rem, 25vh, 20rem)' }} />
          </div>

          {/* Bottom: progress dots + scroll hint */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex gap-2">
              {projects.map((proj, i) => (
                <motion.div
                  key={proj.slug}
                  className="h-[3px] rounded-full"
                  animate={{ width: activeIndex === i ? 32 : 8, opacity: activeIndex === i ? 1 : 0.3 }}
                  transition={{ duration: 0.3 }}
                  style={{ backgroundColor: activeIndex === i ? proj.accentColor : '#fff' }}
                />
              ))}
            </div>
            <span className="text-white/25 text-xs font-mono tracking-widest uppercase">Scroll to navigate</span>
          </div>
        </div>

        {/* Right side: floating metric badge — hidden on mobile */}
        <div className="hidden md:block">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.slug}
              className="absolute right-20 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              animate={{ opacity: activeIndex === i ? 1 : 0, x: activeIndex === i ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="glass border border-white/10 rounded-2xl p-6 backdrop-blur-xl text-center min-w-[160px]">
                <div className="text-4xl font-heading font-black mb-1" style={{ color: proj.accentColor }}>
                  {proj.metrics[0]?.value}{proj.metrics[0]?.suffix}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest">{proj.metrics[0]?.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default function ProjectsHubPage() {
  return (
    <main className="w-full min-h-screen">
      <Helmet>
        <title>Projects — Manav Sharma</title>
        <meta name="description" content="Four production-grade applications. Each one pushed a different boundary." />
      </Helmet>

      {/* Horizontal Scroll Showcase */}
      <HorizontalShowcase />
    </main>
  )
}
