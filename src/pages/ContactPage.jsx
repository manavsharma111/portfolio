import { useState, useEffect } from 'react'
import TextScramble from '../components/Shared/TextScramble'
import MagneticButton from '../components/Shared/MagneticButton'
import { Helmet } from 'react-helmet-async'

export default function ContactPage() {
  const [copied, setCopied] = useState(false)
  const [formStatus, setFormStatus] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText('manavsharma3825@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Message ready! Email me directly at manavsharma3825@gmail.com')
  }

  const [showScrollTop, setShowScrollTop] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.lenis ? window.lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="contact" className="w-full min-h-screen pt-32 flex flex-col justify-between">
      <div className="px-6 max-w-7xl mx-auto w-full">

        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold gradient-text mb-6">
            <TextScramble text="Let's Connect" triggerOnView={true} />
          </h1>
          <p className="text-xl text-textMuted max-w-2xl mx-auto">
            Open to SDE internships, collaborations, and interesting conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          {/* Contact Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MagneticButton className="w-full">
              <div onClick={handleCopy} className="glass p-8 rounded-2xl border border-white/5 hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all cursor-pointer h-full flex flex-col justify-center items-center text-center group">
                <img src="/gmail.svg" alt="Gmail" className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-white mb-1">Email</div>
                <div className="text-sm text-textMuted">{copied ? 'Copied!' : 'manavsharma3825@gmail.com'}</div>
              </div>
            </MagneticButton>

            <MagneticButton className="w-full">
              <a href="https://github.com/manavsharma111" target="_blank" rel="noreferrer" className="glass p-8 rounded-2xl border border-white/5 hover:border-purple/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all flex flex-col justify-center items-center text-center group h-full">
                <img src="/github.svg" alt="GitHub" className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-white mb-1">GitHub</div>
                <div className="text-sm text-textMuted">@manavsharma111</div>
              </a>
            </MagneticButton>

            <MagneticButton className="w-full">
              <a href="https://www.linkedin.com/in/manav-sharma-4a167b274/" target="_blank" rel="noreferrer" className="glass p-8 rounded-2xl border border-white/5 hover:border-[#0288D1]/50 hover:shadow-[0_0_20px_rgba(2,136,209,0.2)] transition-all flex flex-col justify-center items-center text-center group h-full">
                <img src="/linkedin.svg" alt="LinkedIn" className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-white mb-1">LinkedIn</div>
                <div className="text-sm text-textMuted">Connect with me</div>
              </a>
            </MagneticButton>

            <MagneticButton className="w-full">
              <a href="#" className="glass p-8 rounded-2xl border border-white/5 hover:border-[#dc7b4d]/50 hover:shadow-[0_0_20px_rgba(220,123,77,0.2)] transition-all flex flex-col justify-center items-center text-center group h-full">
                <img src="/leetcode.svg" alt="LeetCode" className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-white mb-1">LeetCode</div>
                <div className="text-sm text-textMuted">500+ Problems</div>
              </a>
            </MagneticButton>

            <MagneticButton className="w-full">
              <a href="https://www.npmjs.com/~manavsharma3825" target="_blank" rel="noreferrer" className="glass p-8 rounded-2xl border border-white/5 hover:border-[#d50000]/50 hover:shadow-[0_0_20px_rgba(213,0,0,0.2)] transition-all flex flex-col justify-center items-center text-center group h-full">
                <img src="/npm.svg" alt="NPM" className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-white mb-1">NPM</div>
                <div className="text-sm text-textMuted">Open Source Packages</div>
              </a>
            </MagneticButton>

            <MagneticButton className="w-full">
              <a href="#" className="glass p-8 rounded-2xl border border-white/5 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all flex flex-col justify-center items-center text-center group h-full">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📄</div>
                <div className="font-bold text-white mb-1">Resume</div>
                <div className="text-sm text-textMuted">Download CV</div>
              </a>
            </MagneticButton>
          </div>

          {/* Contact Form UI */}
          <div className="glass p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-heading font-bold mb-6 text-white">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan transition-colors" required />
              </div>
              <div>
                <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple transition-colors" required />
              </div>
              <div>
                <textarea placeholder="Your Message" rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink transition-colors resize-none" required></textarea>
              </div>
              
              {formStatus && (
                <div className="text-sm text-cyan bg-cyan/10 p-3 rounded-lg border border-cyan/20">
                  {formStatus}
                </div>
              )}

              <MagneticButton>
                <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan to-purple text-background font-bold shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-shadow">
                  Send Message
                </button>
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 text-center mt-auto">
        <p className="text-textMuted font-heading font-semibold">
          Designed & Built by <span className="text-cyan drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">Manav Sharma</span> © 2026
        </p>
      </footer>

      {/* Back to top */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-50 text-white"
        >
          ↑
        </button>
      )}
    </section>
  )
}
