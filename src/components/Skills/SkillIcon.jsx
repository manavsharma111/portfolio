import { useRef, useEffect } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { gsap } from 'gsap'
import StackIcon from 'tech-stack-icons'
import { needsInvert } from '../../utils/techIconMap'
import CustomTechIcon from '../Shared/CustomTechIcon'

export default function SkillIcon({ skill, isDimmed, setHoveredSkill, isHovered, playHoverSound }) {
  const iconRef = useRef(null)
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: skill.name,
    data: skill
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 100 : (isHovered ? 50 : 1),
    opacity: isDragging ? 0 : (isDimmed ? 0.4 : 1),
    filter: isDimmed ? 'grayscale(100%)' : 'none',
    transition: isDragging ? 'none' : 'opacity 0.3s ease, filter 0.3s ease',
  }

  const handleMouseEnter = () => {
    if (isDragging) return
    setHoveredSkill(skill)
    if (playHoverSound) playHoverSound()
    
    if (iconRef.current) {
      gsap.timeline()
        .to(iconRef.current, { y: -20, scale: 1.3, duration: 0.15, ease: 'power2.out' })
        .to(iconRef.current, { y: 0, scale: 1, duration: 0.4, ease: 'bounce.out' })
    }
  }

  const handleMouseLeave = () => {
    setHoveredSkill(null)
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glass rounded-2xl p-6 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing border relative overflow-hidden group hover:border-transparent ${isHovered ? 'scale-105 shadow-2xl' : ''}`}
    >
      {/* Color glow border on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: `2px solid ${skill.color}`, borderRadius: '1rem', boxShadow: `inset 0 0 10px ${skill.color}40, 0 0 15px ${skill.color}60` }}
      />
      
      {/* Icon */}
      <div ref={iconRef} className={`mb-4 pointer-events-none filter drop-shadow-md group-hover:drop-shadow-xl transition-all flex items-center justify-center w-12 h-12 ${skill.stackIcon && needsInvert(skill.stackIcon) ? 'invert brightness-0' : ''}`}>
        <CustomTechIcon name={skill.name} className="w-[44px] h-[44px]" />
        {!CustomTechIcon({ name: skill.name }) && (
          skill.stackIcon ? (
            <StackIcon name={skill.stackIcon} style={{ width: 44, height: 44 }} />
          ) : (
            <span className="text-3xl font-bold" style={{ color: skill.color }}>{skill.name.charAt(0)}</span>
          )
        )}
      </div>
      
      {/* Name */}
      <div className="font-heading font-semibold text-textMain pointer-events-none z-10 text-center text-sm">
        {skill.name}
      </div>

      {/* Proficiency Bar */}
      <div className="w-full h-[3px] bg-white/10 rounded-full mt-4 overflow-hidden pointer-events-none relative z-10">
        <div 
          className="skill-bar h-full rounded-full"
          style={{ 
            backgroundColor: skill.color,
            boxShadow: `0 0 8px ${skill.color}80`,
            width: '0%',
            transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            '--target': `${skill.proficiency}%`
          }}
        />
      </div>
      <style>{`
        .group:hover .skill-bar {
          width: var(--target) !important;
        }
      `}</style>
    </div>
  )
}
