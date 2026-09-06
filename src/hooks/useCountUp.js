import { useEffect, useRef, useState } from 'react'

export function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!startOnView) {
      animate()
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          animate()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()

    function animate() {
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * end))
        if (progress < 1) requestAnimationFrame(tick)
        else setCount(end)
      }
      requestAnimationFrame(tick)
    }
  }, [end, duration, startOnView])

  return { count, ref }
}
