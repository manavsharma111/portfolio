import { Link } from 'react-router-dom'
import { memo } from 'react'
import TiltCard from '../Shared/TiltCard'
import GlitchText from '../Shared/GlitchText'

function ProjectCard({ project }) {
  return (
    <TiltCard>
      <Link
        to={`/projects/${project.slug}`}
        className="block card glass rounded-2xl overflow-hidden group hover-lift"
      >
        <div
          className="h-48 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}22, rgba(13,17,23,0.8))`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
              {project.slug === 'nexforge' && '☁️'}
              {project.slug === 'anime-stream' && '🎬'}
              {project.slug === 'crochella' && '🛍️'}
              {project.slug === 'wolf' && '🎮'}
            </span>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-1 gpu"
            style={{ background: project.color, transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }}
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            <GlitchText>{project.title}</GlitchText>
          </h3>
          <p className="text-sm text-[#8b949e] mb-4 line-clamp-2">{project.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-full border border-white/10 text-[#8b949e]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </TiltCard>
  )
}

export default memo(ProjectCard)
