import CountUp from '../Shared/CountUp'
import RevealMask from '../Shared/RevealMask'

const stats = [
  { label: 'LeetCode Problems', value: 500, suffix: '+', color: 'cyan' },
  { label: 'Weekly npm Downloads', value: 1076, suffix: '+', color: 'pink' },
  { label: 'Deployed Projects', value: 4, suffix: '', color: 'purple' },
  { label: 'Day Streak', value: 238, suffix: '', color: 'cyan' },
]

const colorMap = {
  cyan: {
    text: 'text-cyan',
    borderHover: 'hover:border-cyan/30',
    bgTo: 'to-cyan/10',
    shadow: 'drop-shadow-[0_0_15px_rgba(0,217,255,0.8)]'
  },
  pink: {
    text: 'text-pink',
    borderHover: 'hover:border-pink/30',
    bgTo: 'to-pink/10',
    shadow: 'drop-shadow-[0_0_15px_rgba(255,0,110,0.8)]'
  },
  purple: {
    text: 'text-purple',
    borderHover: 'hover:border-purple/30',
    bgTo: 'to-purple/10',
    shadow: 'drop-shadow-[0_0_15px_rgba(189,52,254,0.8)]'
  }
}

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const colors = colorMap[stat.color] || colorMap.cyan;
            return (
              <RevealMask key={i} direction="top">
                <div className={`glass rounded-2xl p-8 text-center border border-white/5 ${colors.borderHover} transition-colors group relative overflow-hidden`}>
                  
                  <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${colors.bgTo} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className={`text-4xl md:text-5xl font-heading font-bold mb-2 ${colors.text} ${colors.shadow}`}>
                      <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                    </div>
                    <div className="text-textMuted font-medium tracking-wide text-sm uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </RevealMask>
            )
          })}
        </div>
      </div>
    </section>
  )
}
