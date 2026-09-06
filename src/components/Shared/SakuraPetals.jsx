export default function SakuraPetals({ count = 10 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 10
        const duration = 10 + Math.random() * 10
        const scale = 0.5 + Math.random() * 0.5
        
        return (
          <div
            key={i}
            className="absolute top-[-10%] w-3 h-3 bg-pink rounded-full opacity-40 blur-[1px] mix-blend-screen animate-sakura"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `scale(${scale})`,
            }}
          />
        )
      })}
      
      <style>{`
        @keyframes sakura {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(var(--scale, 1));
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translate3d(${Math.random() > 0.5 ? '100px' : '-100px'}, 120vh, 0) rotate(720deg) scale(var(--scale, 1));
            opacity: 0;
          }
        }
        .animate-sakura {
          animation-name: sakura;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  )
}
