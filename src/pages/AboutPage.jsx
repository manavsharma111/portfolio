import { Link } from 'react-router-dom'
import TextScramble from '../components/Shared/TextScramble'
import RevealMask from '../components/Shared/RevealMask'
import CountUp from '../components/Shared/CountUp'
import SectionDivider from '../components/Shared/SectionDivider'
import MagneticButton from '../components/Shared/MagneticButton'
import CinematicTextReveal from '../components/Shared/CinematicTextReveal'
import { Helmet } from 'react-helmet-async'

export default function AboutPage() {
  return (
    <section id="about" className="w-full min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">

      <div className="mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-bold gradient-text">
          <TextScramble text="About Me" triggerOnView={true} />
        </h1>
      </div>

      {/* Bio Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <RevealMask direction="top">
          <div className="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center">
            <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-cyan via-purple to-pink rounded-full mix-blend-screen opacity-20 filter blur-[40px] animate-blob-1" />
            <div className="relative z-10 glass w-full h-full rounded-[2rem] border border-white/10 flex items-center justify-center overflow-hidden">
               <img src="/manav.jpeg" alt="Manav Sharma" className="w-full h-full object-cover object-top relative z-10" />
            </div>
          </div>
        </RevealMask>

          <div className="text-lg md:text-xl text-textMuted leading-relaxed pt-10 md:pt-0">
            <CinematicTextReveal 
              splitBy="letter"
              once={false}
              text="4th-year ECE student at NIT Bhopal focused on backend engineering and system design. Built and deployed four production-grade applications — a self-hosted PaaS with a published npm CLI (1,076+ weekly downloads), an adaptive  HLS streaming platform with a custom FFmpeg pipeline cutting processing time by 45%, a multi-vendor 3D e-commerce platform, and a real-time social media app. Active competitive programmer with 500+ LeetCode problems and a 238-day streak. Seeking SDE Job to build systems that solve real problems at scale. Passionate about pushing the boundaries of web performance, crafting responsive UIs  with  GSAP and WebGL, and architecting robust cloud-native    backends using Node.js, Redis, and BullMQ." 
            />
          </div>
      </div>

      <SectionDivider />

      {/* Stats Section */}
      <div className="my-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { v: 500, label: 'LeetCode Problems', suf: '+' },
          { v: 1076, label: 'Weekly npm Downloads', suf: '+' },
          { v: 4, label: 'Deployed Projects', suf: '' },
          { v: 238, label: 'Day Streak', suf: '' }
        ].map((stat, i) => (
          <RevealMask key={i} direction="top">
            <div className="glass p-8 rounded-2xl border border-white/5 text-center hover:border-cyan/30 transition-colors">
              <div className="text-4xl font-heading font-bold text-cyan mb-2">
                <CountUp end={stat.v} suffix={stat.suf} duration={2} />
              </div>
              <div className="text-sm text-textMuted uppercase">{stat.label}</div>
            </div>
          </RevealMask>
        ))}
      </div>



      <div className="mt-32 flex flex-col sm:flex-row items-center justify-center gap-6">
        <MagneticButton>
          <a href="/Manav_Sharma_Resume.pdf" download="Manav_Sharma_Resume.pdf" className="px-10 py-5 rounded-full glass border border-white/20 text-white font-bold text-xl hover:bg-white/10 hover:border-white/40 transition-colors inline-block text-center">
            📄 Download Resume
          </a>
        </MagneticButton>
        <MagneticButton>
          <Link to="/projects" className="px-10 py-5 rounded-full bg-gradient-to-r from-cyan to-purple text-background font-bold text-xl shadow-[0_0_30px_rgba(0,217,255,0.3)] hover:scale-105 transition-transform inline-block text-center">
            Check out my work
          </Link>
        </MagneticButton>
      </div>
    </section>
  )
}
