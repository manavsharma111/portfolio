import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)
gsap.config({ nullTargetWarn: false })
gsap.defaults({ ease: 'power3.out' })
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: ['visibilitychange']
})

export { gsap, ScrollTrigger, useGSAP }
