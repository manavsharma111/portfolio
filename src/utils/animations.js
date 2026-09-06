import gsap from 'gsap'

gsap.config({ nullTargetWarn: false })

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const pageTransition = {
  initial: { clipPath: 'inset(0 0 100% 0)' },
  animate: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
  exit: { clipPath: 'inset(100% 0 0 0)', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
}

export const gsapDefaults = {
  force3D: true,
  ease: 'power3.out',
}
