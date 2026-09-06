export default function GlitchText({ text, className = '' }) {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      
      <span 
        className="absolute top-0 left-0 -translate-x-[2px] opacity-0 text-pink mix-blend-screen 
                   group-hover:opacity-100 group-hover:animate-glitch-1 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {text}
      </span>
      
      <span 
        className="absolute top-0 left-0 translate-x-[2px] opacity-0 text-cyan mix-blend-screen 
                   group-hover:opacity-100 group-hover:animate-glitch-2 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {text}
      </span>

      <style>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translateX(-2px); opacity: 0.8; }
          20% { transform: translateX(2px); opacity: 0.5; }
          40% { transform: translateX(-2px); opacity: 0.9; }
          60% { transform: translateX(2px); opacity: 0.4; }
          80% { transform: translateX(-2px); opacity: 1; }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translateX(2px); opacity: 0.8; }
          20% { transform: translateX(-2px); opacity: 0.9; }
          40% { transform: translateX(2px); opacity: 0.4; }
          60% { transform: translateX(-2px); opacity: 1; }
          80% { transform: translateX(2px); opacity: 0.5; }
        }
        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite alternate;
        }
        .animate-glitch-2 {
          animation: glitch-2 0.3s infinite alternate;
        }
      `}</style>
    </div>
  )
}
