import { useEffect, useRef } from 'react';

export default function CursorSparks() {
  const canvasRef = useRef(null);
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  useEffect(() => {
    // Completely disable on touch/mobile devices
    if (isTouch) return
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let mouse = { x: null, y: null };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1; // 1 to 4 px radius
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.life = 1.0;
        this.decay = Math.random() * 0.02 + 0.015; // fade out rate
        
        // Beautiful glowing orange/gold/red colors
        const hues = [15, 30, 45, 10]; 
        const hue = hues[Math.floor(Math.random() * hues.length)];
        this.color = `hsl(${hue}, 100%, 65%)`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        
        // Subtle gravity pulling the sparks down
        this.speedY += 0.08; 
      }
      
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Removed heavy shadowBlur, using simulated glow for 10x better performance
        ctx.fillStyle = '#ffffff'; // White core
        ctx.fill();
        
        // Outer colored glow (simulated)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.life * 0.3);
        ctx.fill();
        
        ctx.restore();
      }
    }
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Spawn 1 particle per mouse move event to prevent overwhelming the CPU
      particles.push(new Particle(mouse.x, mouse.y));
      if (Math.random() > 0.5) {
        particles.push(new Particle(mouse.x, mouse.y)); // occasionally spawn a second one
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  if (isTouch) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9999]" 
    />
  );
}
