import { useState, useEffect } from 'react'
import { DndContext, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../components/Skills/SkillData'
import SkillIcon from '../components/Skills/SkillIcon'
import TextScramble from '../components/Shared/TextScramble'
import Marquee from '../components/Shared/Marquee'
import { Helmet } from 'react-helmet-async'
import StackIcon from 'tech-stack-icons'
import { needsInvert } from '../utils/techIconMap'
import CustomTechIcon from '../components/Shared/CustomTechIcon'
import { useUISounds } from '../hooks/useUISounds'
import NextPageFooter from '../components/Shared/NextPageFooter'

const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'Languages', 'Tools', 'AI/ML']
const categoryColors = {
  All: '#ffffff', Frontend: '#00d9ff', Backend: '#339933', 
  DevOps: '#f6821f', Languages: '#f7df1e', Tools: '#f05032', 'AI/ML': '#10a37f'
}

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeDrag, setActiveDrag] = useState(null)
  const [shuffleTrigger, setShuffleTrigger] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  
  const { playHover, playClick } = useUISounds()

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory)

  // Shake to shuffle on mobile
  useEffect(() => {
    let lastX, lastY, lastZ
    const handleMotion = (e) => {
      const { x, y, z } = e.accelerationIncludingGravity
      if (!lastX) { lastX = x; lastY = y; lastZ = z; return }
      const delta = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ)
      if (delta > 30) {
        setShuffleTrigger(prev => prev + 1)
      }
      lastX = x; lastY = y; lastZ = z
    }
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion)
    }
    return () => {
      if (window.DeviceMotionEvent) window.removeEventListener('devicemotion', handleMotion)
    }
  }, [])

  // Randomize array when shuffle triggered
  const displaySkills = shuffleTrigger > 0 ? [...filteredSkills].sort(() => Math.random() - 0.5) : filteredSkills

  const handleDragStart = (e) => {
    setActiveDrag(skills.find(s => s.name === e.active.id))
  }

  const handleDragEnd = () => {
    setActiveDrag(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.4' } } }),
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Helmet>
        <title>Skills & Tech Stack — Manav Sharma</title>
      </Helmet>

      <main className="relative w-full min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-x-hidden">
        {/* Scroll Down Arrow */}
        <motion.button
          onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
          className="absolute top-20 right-5 md:top-12 md:right-12 z-30 w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center hover:border-cyan/50 hover:bg-white/5 transition-all shadow-xl group cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          aria-label="Scroll Down"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="text-white group-hover:text-cyan transition-colors"
          >
            ↓
          </motion.div>
        </motion.button>

        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-8 gradient-text">
            <TextScramble text="Skills & Tech Stack" triggerOnView={true} />
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); playClick(); }}
                className={`relative px-6 py-2 rounded-full font-semibold transition-colors ${activeCategory === cat ? 'text-background' : 'text-textMuted hover:text-textMain'}`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ backgroundColor: categoryColors[cat], boxShadow: `0 0 20px ${categoryColors[cat]}80` }}
                    transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.15 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-20 relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {displaySkills.map((skill) => {
              const isDimmed = hoveredSkill && skill.name !== hoveredSkill.name && (!hoveredSkill.ecosystem || !hoveredSkill.ecosystem.includes(skill.name));
              const isHovered = hoveredSkill && hoveredSkill.name === skill.name;
              
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <SkillIcon 
                    skill={skill} 
                    isDimmed={isDimmed}
                    isHovered={isHovered}
                    setHoveredSkill={setHoveredSkill}
                    playHoverSound={playHover}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* <div className="mt-20 pt-10 border-t border-white/10 text-center relative z-10"> */}
        {/* <p className="text-textMuted mb-6">Interactive Legend: Hover to explore connections, drag to play.</p> */}
        {/* </div> */}

        <div className="w-full relative mt-10">
          <Marquee items={skills.map(s => s.name)} speed="60s" />
        </div>
      </main>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeDrag ? (
          <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center opacity-80" style={{ transform: 'scale(1.2) rotate(5deg)', borderColor: activeDrag.color, boxShadow: `0 0 20px ${activeDrag.color}60` }}>
            <div className={`mb-4 filter drop-shadow-xl flex items-center justify-center w-12 h-12 ${activeDrag.stackIcon && needsInvert(activeDrag.stackIcon) ? 'invert brightness-0' : ''}`}>
              <CustomTechIcon name={activeDrag.name} className="w-[44px] h-[44px]" />
              {!CustomTechIcon({ name: activeDrag.name }) && (
                activeDrag.stackIcon ? (
                  <StackIcon name={activeDrag.stackIcon} style={{ width: 44, height: 44 }} />
                ) : (
                  <span className="text-3xl font-bold" style={{ color: activeDrag.color }}>{activeDrag.name.charAt(0)}</span>
                )
              )}
            </div>
            <div className="font-heading font-semibold text-textMain text-center text-sm">{activeDrag.name}</div>
          </div>
        ) : null}
      </DragOverlay>

      <NextPageFooter
        title="Projects"
        subtitle="View My Work"
        url="/projects"
        accentColor="#8b5cf6"
        image="/page_images/project_2.png"
        mobileImage="/page_images/project_phone.png"
      />
    </DndContext>
  )
}
