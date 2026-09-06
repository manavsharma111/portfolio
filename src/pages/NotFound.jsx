import { Link } from 'react-router-dom'
import GlitchText from '../components/Shared/GlitchText'
import MagneticButton from '../components/Shared/MagneticButton'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-background">
      <Helmet>
        <title>404 Not Found — Manav Sharma</title>
      </Helmet>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
      
      <div className="relative z-10">
        <h1 className="text-8xl md:text-[12rem] font-heading font-black mb-4 leading-none">
          <GlitchText text="404" className="text-textMain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
        </h1>
        
        <p className="text-2xl md:text-4xl font-bold text-pink drop-shadow-[0_0_15px_rgba(255,0,110,0.5)] mb-4">
          404 - Not Found
        </p>
        
        <p className="text-lg text-textMuted mb-12 max-w-md mx-auto">
          The page you are looking for is not available. Maybe it was an illusion.
        </p>
        
        <MagneticButton>
          <Link 
            to="/" 
            className="px-8 py-4 rounded-full bg-white text-background font-bold text-lg hover:bg-cyan hover:shadow-[0_0_20px_rgba(0,217,255,0.6)] transition-all inline-block"
          >
            Return to Home
          </Link>
        </MagneticButton>
      </div>
    </div>
  )
}
