import Marquee from '../Shared/Marquee'

const row1 = ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Three.js']
const row2 = ['GSAP', 'Framer Motion', 'Tailwind', 'Socket.io', 'FFmpeg', 'Cloudflare R2', 'BullMQ', 'Docker']

export default function TechMarquee() {
  return (
    <section className="py-20 bg-background/50 border-y border-white/5 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      
      <div className="flex flex-col gap-6">
        <Marquee items={row1} speed="40s" direction="left" />
        <Marquee items={row2} speed="40s" direction="right" />
      </div>
    </section>
  )
}
