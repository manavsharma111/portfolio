import { Cpu as FallbackIcon } from 'lucide-react'
import StackIcon from 'tech-stack-icons'
import { getTechIconName, needsInvert } from '../../utils/techIconMap'
import { Code, Database, Server, Cloud, Zap, Monitor, Layers, Box, Settings, ArrowRightLeft } from 'lucide-react'
import CustomTechIcon from './CustomTechIcon'

const getFallbackIcon = (name) => {
  if (!name) return <FallbackIcon />
  const n = name.toLowerCase()
  if (n.includes('react') || n.includes('next') || n.includes('vue')) return <Monitor />
  if (n.includes('node') || n.includes('express') || n.includes('python')) return <Server />
  if (n.includes('mongo') || n.includes('sql') || n.includes('redis') || n.includes('database')) return <Database />
  if (n.includes('cloud') || n.includes('aws') || n.includes('r2') || n.includes('cloudflare')) return <Cloud />
  if (n.includes('socket') || n.includes('real-time') || n.includes('bullmq') || n.includes('queue')) return <Zap />
  if (n.includes('tailwind') || n.includes('css') || n.includes('framer') || n.includes('gsap')) return <Layers />
  if (n.includes('api') || n.includes('rest') || n.includes('graphql')) return <ArrowRightLeft />
  if (n.includes('three') || n.includes('3d') || n.includes('canvas')) return <Box />
  if (n.includes('config') || n.includes('webpack') || n.includes('vite')) return <Settings />
  return <Code />
}

export default function Marquee({ items = [], direction = 'left', speed = '30s' }) {
  const content = (
    <div className="flex items-center space-x-8 shrink-0">
      {items.map((item, i) => {
        const iconName = getTechIconName(item)
        return (
          <div key={i} className="flex items-center space-x-8 group/item hover:text-cyan transition-colors duration-300">
            <div className={`flex items-center gap-3 ${iconName && needsInvert(iconName) ? 'invert brightness-0' : ''}`}>
              <CustomTechIcon name={item} className="w-6 h-6 flex-shrink-0" />
              {!CustomTechIcon({ name: item }) && (
                iconName ? (
                  <StackIcon name={iconName} style={{ width: 24, height: 24, flexShrink: 0 }} />
                ) : (
                  <div className="text-cyan/70 group-hover/item:text-cyan transition-colors">
                    {getFallbackIcon(item)}
                  </div>
                )
              )}
              <span className="text-2xl font-heading whitespace-nowrap">{item}</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-cyan glow-cyan" />
          </div>
        )
      })}
    </div>
  )

  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

  return (
    <div className="relative flex overflow-hidden py-4 w-full bg-black/20 border-y border-white/5 group">
      <div 
        className={`flex space-x-8 w-max ${animationClass} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: speed }}
      >
        {content}
        {content}
      </div>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
      `}</style>
    </div>
  )
}
