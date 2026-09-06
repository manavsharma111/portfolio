import { useState, useEffect, useRef } from 'react'

const chars = '!<>-_\\/[]{}—=+*^?#________'

export default function TextScramble({ text, triggerOnView = true }) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const containerRef = useRef(null)

  const scramble = (duration = 1000) => {
    if (isScrambling) return
    setIsScrambling(true)
    let frame = 0
    const length = text.length
    // scale queue to duration (approx 60fps)
    const maxFrames = Math.max(10, Math.floor(duration / 16))
    
    const queue = Array.from({ length }, (_, i) => ({
      from: chars[Math.floor(Math.random() * chars.length)],
      to: text[i],
      start: Math.floor(Math.random() * (maxFrames * 0.3)),
      end: Math.floor(Math.random() * (maxFrames * 0.7)) + Math.floor(maxFrames * 0.3),
    }))

    const update = () => {
      let output = ''
      let complete = 0
      for (let i = 0, n = queue.length; i < n; i++) {
        let { from, to, start, end } = queue[i]
        if (frame >= end) {
          complete++
          output += to
        } else if (frame >= start) {
          output += `<span class="text-cyan glow-cyan opacity-80">${chars[Math.floor(Math.random() * chars.length)]}</span>`
        } else {
          output += from
        }
      }
      setDisplayText(output)
      if (complete === queue.length) {
        setIsScrambling(false)
        setDisplayText(text)
      } else {
        frame++
        requestAnimationFrame(update)
      }
    }
    update()
  }

  useEffect(() => {
    if (!triggerOnView) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          scramble(1000) // 1s on scroll into view
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [text, triggerOnView])

  const handleMouseEnter = () => {
    scramble(300) // 0.3s brief flicker on hover
  }

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      dangerouslySetInnerHTML={{ __html: isScrambling ? displayText : text }}
    />
  )
}
