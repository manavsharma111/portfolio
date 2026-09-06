import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextScramble from '../components/Shared/TextScramble'
import CountUp from '../components/Shared/CountUp'
import RevealMask from '../components/Shared/RevealMask'
import { Helmet } from 'react-helmet-async'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  {
    title: 'LeetCode Problem Solver',
    metrics: [{ v: 500, suf: '+' }, { v: 1600, suf: '+' }, { v: 238, suf: '' }],
    desc: 'Solved 500+ problems (287+ Medium, 82+ Hard) with a 1,600+ contest rating and maintained a 238-day streak.',
  },
  {
    title: 'Open Source Contributor',
    metrics: [{ v: 1076, suf: '+' }],
    desc: 'Published nexforge-cli on npm achieving 1,076+ weekly organic downloads.',
  },
  {
    title: 'Robu Creato 3.0',
    metrics: [{ v: 3, suf: 'rd Prize' }],
    desc: 'Secured 3rd Prize at national-level robotics and technical competition with 100+ participating engineering teams.',
  },
  {
    title: 'Technical Executive',
    metrics: [],
    desc: 'Led project development teams, coordinated technical workshops, and mentored junior members at Evolve Club NIT Bhopal (March 2024 - Present).',
  }
]

export default function AchievementsPage() {
  const lineRef = useRef(null)

  useEffect(() => {
    if (!lineRef.current) return
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: true
        }
      }
    )
  }, [])

  return (
    <section id="achievements" className="w-full min-h-screen pt-32 pb-32 px-6 max-w-5xl mx-auto overflow-hidden">

      <div className="mb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-bold gradient-text">
          <TextScramble text="Achievements" triggerOnView={true} />
        </h1>
      </div>

      <div className="relative w-full">
        {/* Center glowing line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2 transform-origin-top" />
        <div 
          ref={lineRef} 
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-cyan shadow-[0_0_15px_#00d9ff] md:-translate-x-1/2 origin-top" 
        />

        <div className="flex flex-col gap-16 relative z-10">
          {achievements.map((ach, i) => (
            <RevealMask key={i} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className={`flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Desktop Spacer */}
                <div className="hidden md:block w-5/12" />

                {/* Center Node */}
                <div className="absolute left-6 md:left-1/2 w-6 h-6 rounded-full bg-background border-4 border-cyan z-20 md:-translate-x-1/2 -translate-x-[10px] shadow-[0_0_20px_#00d9ff]" />

                {/* Card */}
                <div className="w-full md:w-5/12 pl-16 md:pl-0">
                  <div className="glass p-8 rounded-2xl border border-white/10 hover:border-cyan/50 transition-colors">
                    <h3 className="text-2xl font-heading font-bold text-white mb-4">{ach.title}</h3>
                    <p className="text-textMuted mb-6">{ach.desc}</p>
                    
                    {ach.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-4">
                        {ach.metrics.map((m, idx) => (
                          <div key={idx} className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-cyan font-bold font-heading">
                            <CountUp end={m.v} suffix={m.suf} duration={2.5} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </RevealMask>
          ))}
        </div>
      </div>
    </section>
  )
}
