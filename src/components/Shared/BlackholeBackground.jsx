import { useEffect, useRef } from 'react'

export default function BlackholeBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let particles = []
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }
    
    class Particle {
      constructor(cw, ch) {
        this.reset(cw, ch, true)
      }
      
      reset(cw, ch, randomRadius = false) {
        this.angle = Math.random() * Math.PI * 2
        // Spawn distance: if randomRadius is true, scatter them everywhere. Otherwise spawn at the edge.
        const maxRadius = Math.max(cw, ch) / 1.2
        const minRadius = 80 // Event horizon radius
        
        this.radius = randomRadius 
          ? minRadius + Math.random() * (maxRadius - minRadius)
          : maxRadius + Math.random() * 100
          
        this.size = Math.random() * 1.5 + 0.5
        this.speed = Math.random() * 0.015 + 0.005
        
        // Colors: Cyan to Purple to match theme
        const isCyan = Math.random() > 0.4
        this.color = isCyan ? `rgba(0, 217, 255, ${Math.random() * 0.8 + 0.2})` : `rgba(139, 92, 246, ${Math.random() * 0.8 + 0.2})`
      }
      
      update(cw, ch) {
        this.angle += this.speed
        this.radius -= this.speed * 12 // Spiral inwards
        
        if (this.radius < 75) { // Sucked into black hole
          this.reset(cw, ch, false)
        }
      }
      
      draw(ctx, cx, cy) {
        const x = cx + Math.cos(this.angle) * this.radius
        const y = cy + Math.sin(this.angle) * this.radius
        
        ctx.beginPath()
        ctx.arc(x, y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        
        // Glow
        ctx.shadowBlur = 8
        ctx.shadowColor = this.color
        ctx.fill()
      }
    }
    
    const initParticles = () => {
      particles = []
      const numParticles = Math.min(window.innerWidth, 1200) // Responsive amount, up to 1200 particles
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height))
      }
    }
    
    window.addEventListener('resize', resize)
    resize() // Initial setup
    
    const animate = () => {
      // Create trailing effect by drawing semi-transparent black background
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      
      // Draw Accretion Disk Glow
      const gradient = ctx.createRadialGradient(cx, cy, 70, cx, cy, 250)
      gradient.addColorStop(0, 'rgba(0, 217, 255, 0.15)')
      gradient.addColorStop(0.4, 'rgba(139, 92, 246, 0.05)')
      gradient.addColorStop(1, 'transparent')
      
      ctx.beginPath()
      ctx.arc(cx, cy, 250, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw Particles
      particles.forEach(p => {
        p.update(canvas.width, canvas.height)
        p.draw(ctx, cx, cy)
      })
      
      // Draw Black Hole (Event Horizon)
      ctx.beginPath()
      ctx.arc(cx, cy, 75, 0, Math.PI * 2)
      ctx.fillStyle = '#020202' // pitch black
      ctx.shadowBlur = 30
      ctx.shadowColor = 'rgba(0, 217, 255, 0.6)'
      ctx.fill()
      
      // Secondary inner black hole to cover up inner glow bleed
      ctx.beginPath()
      ctx.arc(cx, cy, 73, 0, Math.PI * 2)
      ctx.fillStyle = '#000000'
      ctx.shadowBlur = 0
      ctx.fill()
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-1]" 
    />
  )
}
