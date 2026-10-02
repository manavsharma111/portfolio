import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../components/Skills/SkillData'
import TextScramble from '../components/Shared/TextScramble'
import Marquee from '../components/Shared/Marquee'
import { Helmet } from 'react-helmet-async'
import StackIcon from 'tech-stack-icons'
import { needsInvert } from '../utils/techIconMap'
import CustomTechIcon from '../components/Shared/CustomTechIcon'
import NextPageFooter from '../components/Shared/NextPageFooter'

const categories = [
  { name: 'Frontend', color: '#00d9ff' },
  { name: 'Backend', color: '#339933' },
  { name: 'DevOps', color: '#f6821f' },
  { name: 'Languages', color: '#f7df1e' },
  { name: 'Tools', color: '#f05032' },
  { name: 'AI/ML', color: '#10a37f' }
]

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const getSymbol = (name) => {
    if (name === 'React 19') return 'Re'
    if (name === 'Vite') return 'Vi'
    if (name === 'Tailwind CSS v4') return 'Tw'
    if (name === 'Node.js') return 'No'
    if (name === 'Express.js') return 'Ex'
    if (name === 'MongoDB') return 'Mg'
    if (name === 'Three.js / R3F') return 'Th'
    if (name === 'Framer Motion') return 'Fr'
    if (name === 'GSAP') return 'Gs'
    if (name === 'JavaScript') return 'Js'
    if (name === 'Python') return 'Py'
    if (name === 'C++') return 'C+'
    return name.substring(0, 2).toUpperCase()
  }

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory)

  return (
    <>
      <Helmet>
        <title>Periodic Tech Stack</title>
      </Helmet>

      <main className="relative w-full min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Header */}
        <div className="mb-12 text-center z-20 relative">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 gradient-text">
            <TextScramble text="Periodic Table of Tech" triggerOnView={true} />
          </h1>
          <p className="text-lg md:text-xl text-textMuted max-w-2xl mx-auto">
            A scientifically organized overview of my technical elements.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-10">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeCategory === 'All' ? 'bg-white text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
          >
            All Elements
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-2`}
              style={{ 
                backgroundColor: activeCategory === cat.name ? cat.color : 'rgba(255,255,255,0.05)',
                color: activeCategory === cat.name ? '#000' : 'rgba(255,255,255,0.5)',
                border: `1px solid ${cat.color}40`
              }}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeCategory === cat.name ? '#000' : cat.color }}></span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Info Panel for Hovered Skill */}
        <div className="hidden md:flex w-full min-h-[140px] md:h-[120px] mb-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 md:p-6 items-center justify-center relative overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            {hoveredSkill ? (
              <motion.div 
                key={hoveredSkill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full max-w-4xl"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold font-heading shadow-[0_0_30px_rgba(255,255,255,0.1)] border"
                     style={{ backgroundColor: `${hoveredSkill.color}20`, borderColor: hoveredSkill.color, color: hoveredSkill.color }}>
                  {getSymbol(hoveredSkill.name)}
                </div>
                <div className="flex-1 w-full text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center md:items-end gap-2 md:gap-4 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{hoveredSkill.name}</h2>
                    <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full border" style={{ borderColor: hoveredSkill.color, color: hoveredSkill.color }}>
                      {hoveredSkill.category}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-3 md:mt-4 relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${hoveredSkill.proficiency}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: hoveredSkill.color }}
                    />
                  </div>
                </div>
                <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <CustomTechIcon name={hoveredSkill.name} className="w-6 h-6 md:w-8 md:h-8 pointer-events-none" />
                  {!CustomTechIcon({ name: hoveredSkill.name }) && (
                    hoveredSkill.stackIcon ? <StackIcon name={hoveredSkill.stackIcon} style={{ width: 32, height: 32 }} className="pointer-events-none" /> :
                    <span className="text-xl md:text-2xl font-bold font-heading pointer-events-none" style={{ color: hoveredSkill.color }}>{hoveredSkill.name.charAt(0)}</span>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-white/30 text-sm md:text-xl font-heading font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-center"
              >
                Hover over an element
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Periodic Table Grid Layout */}
        <div className="w-full pb-10">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-6 w-full">
            <AnimatePresence>
              {filteredSkills.map((skill, index) => {
                const symbol = getSymbol(skill.name)
                const isDimmed = activeCategory !== 'All' && skill.category !== activeCategory
                
                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isDimmed ? 0.3 : 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    // Removed 'glass' class to prevent severe backdrop-filter lag on mobile devices.
                    className="relative aspect-square bg-white/5 rounded-2xl border border-white/10 cursor-pointer overflow-hidden group hover:z-10 transition-transform duration-200 hover:scale-105 md:hover:scale-110"
                    style={{
                      borderLeft: `4px solid ${skill.color}`
                    }}
                  >
                    {/* Hover Glow (Lighter for performance) */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: `${skill.color}20` }}
                    />
                    
                    {/* Atomic Number (Mock index) */}
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 text-[10px] md:text-xs text-white/50 font-mono font-bold">
                      {index + 1}
                    </div>

                    {/* Weight (Proficiency) */}
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 text-[10px] md:text-xs text-white/50 font-mono font-bold">
                      {skill.proficiency}.0
                    </div>

                    {/* Element Symbol */}
                    <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl md:text-5xl font-black font-heading transition-transform duration-300 group-hover:-translate-y-4 md:group-hover:-translate-y-8"
                         style={{ color: skill.color }}>
                      {symbol}
                    </div>

                    {/* Element Name */}
                    <div className="absolute bottom-2 md:bottom-3 left-0 w-full text-center text-[10px] sm:text-xs text-white/80 font-bold truncate px-1 md:px-2 transition-transform duration-300 group-hover:translate-y-6 md:group-hover:translate-y-10">
                      {skill.name}
                    </div>

                    {/* Real Icon on Hover */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-[-10%] md:scale-150">
                      <CustomTechIcon name={skill.name} className="w-8 h-8 md:w-10 md:h-10 pointer-events-none" />
                      {!CustomTechIcon({ name: skill.name }) && (
                        skill.stackIcon ? <StackIcon name={skill.stackIcon} style={{ width: 32, height: 32 }} className="pointer-events-none" /> :
                        null
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Marquee Footer */}
        <div className="w-full relative mt-10 rounded-3xl overflow-hidden glass py-4 border border-white/5">
          <Marquee items={skills.map(s => s.name)} speed="40s" />
        </div>
      </main>

      <NextPageFooter
        title="Projects"
        subtitle="View My Work"
        url="/projects"
        accentColor="#8b5cf6"
        image="/page_images/project_2.png"
        mobileImage="/page_images/project_phone.png"
      />
    </>
  )
}
