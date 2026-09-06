import { useEffect, useRef, memo } from 'react'
import { gsap, ScrollTrigger } from '../../hooks/useGsap'
import { useIsMobile } from '../../hooks/useMediaQuery'

function ParallaxLayer({ children, speed = 0.5, className = '' }) {
  const ref = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile || !ref.current) return

    const tween = gsap.to(ref.current, {
      y: () => speed * 100,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => tween.kill()
  }, [isMobile, speed])

  return (
    <div ref={ref} className={`gpu ${className}`}>
      {children}
    </div>
  )
}

export default memo(ParallaxLayer)
