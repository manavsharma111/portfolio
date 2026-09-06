import { Link } from 'react-router-dom'
import SectionDivider from '../Shared/SectionDivider'
import TextScramble from '../Shared/TextScramble'
import MagneticButton from '../Shared/MagneticButton'

export default function CTA() {
  return (
    <section className="py-32 flex flex-col items-center justify-center text-center px-6">
      <SectionDivider />
      
      <div className="mt-20 max-w-2xl">
        <h2 className="text-5xl md:text-7xl font-heading font-bold mb-10 gradient-text">
          <TextScramble text="Want to see more?" triggerOnView={true} />
        </h2>
        
        <MagneticButton>
          <Link 
            to="/projects"
            className="px-10 py-5 rounded-full bg-gradient-to-r from-cyan to-purple text-background font-bold text-xl shadow-[0_0_30px_rgba(0,217,255,0.3)] hover:shadow-[0_0_50px_rgba(0,217,255,0.5)] transition-all hover:scale-105 inline-block"
          >
            Explore Portfolio
          </Link>
        </MagneticButton>
      </div>
    </section>
  )
}
