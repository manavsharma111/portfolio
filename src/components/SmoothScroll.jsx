import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })
    const lenis = new Lenis({
      lerp: 0.05, wheelMultiplier: 1, smoothWheel: true,
      syncTouch: false, smoothTouch: false,
    })
    window.lenis = lenis
    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
