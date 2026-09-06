import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

export default function CountUp({ end, duration = 2, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  
  // once: false allows the animation to replay every time it enters the viewport
  const isInView = useInView(ref, { once: false, margin: "0px 0px -10% 0px" })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => {
          setVal(Math.round(value))
        }
      })
      return () => controls.stop()
    } else {
      // Reset to 0 when out of view so it counts up again next time!
      setVal(0)
    }
  }, [isInView, end, duration])

  // Odometer effect via splitting into digits and animating them
  const digits = String(val).split('')

  return (
    <span ref={ref} className={`inline-flex items-center ${className}`}>
      {prefix && <span>{prefix}</span>}
      <span className="flex overflow-hidden relative">
        {digits.map((digit, i) => (
          <span key={i} className="inline-block transition-transform duration-100 text-glow">
            {digit}
          </span>
        ))}
      </span>
      {suffix && <span>{suffix}</span>}
    </span>
  )
}
