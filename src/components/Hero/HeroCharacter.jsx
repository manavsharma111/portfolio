import { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, ContactShadows, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import * as THREE from 'three'
import gsap from 'gsap'
import HeroCharacterFallback from './HeroCharacterFallback'

function CharacterModel({ onClickTrigger }) {
  const { scene, animations } = useGLTF('/models/shiina_mahiru_-__angel_next_door.glb')
  const group = useRef(null)
  const head = useRef(null)
  const leftHand = useRef(null)
  const leftArm = useRef(null)
  const rightArm = useRef(null)
  const { mouse } = useThree()
  
  // Extract and prepare any baked-in skeletal animations
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Play the first available animation clip automatically
    if (animations && animations.length > 0) {
      const actionName = animations[0].name
      if (actions[actionName]) {
        actions[actionName].reset().fadeIn(0.5).play()
      }
    }
  }, [animations, actions])

  useEffect(() => {
    // Robust bone lookup for mouse tracking
    scene.traverse((obj) => {
      // Fix broken bounding boxes on anime models causing chopped limbs
      if (obj.isMesh) {
        obj.frustumCulled = false
      }
      
      if (obj.isBone || obj.type === 'Bone') {
        const name = obj.name.toLowerCase()
        if (name.includes('head')) head.current = obj
        if (name.includes('hand') && (name.includes('l_') || name.includes('left'))) leftHand.current = obj
        
        // Exact bone names from the GLB file for the shoulder joint (upperarm)
        if (name.includes('upperarm.l')) leftArm.current = obj
        if (name.includes('upperarm.r')) rightArm.current = obj
      }
    })

    // Drop arms from T-pose to I-pose
    if (leftArm.current) leftArm.current.rotation.z -= 1.3 // Drop left arm
    if (rightArm.current) rightArm.current.rotation.z += 1.3 // Drop right arm

  }, [scene])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    
    // Subtle breathing/floating around 0, letting the child primitive handle the actual offset
    group.current.position.y = Math.sin(t * 1.5) * 0.02
    
    // Gentle rotation based on mouse
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.1, 0.05)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.2, 0.05)

    // Extra head rotation towards cursor
    if (head.current) {
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, mouse.y * 0.2, 0.05)
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, mouse.x * 0.3, 0.05)
    }
  })

  useEffect(() => {
    if (onClickTrigger === 0) return
    if (leftHand.current) {
      // Waving animation
      gsap.to(leftHand.current.rotation, {
        z: leftHand.current.rotation.z - 1.0, 
        duration: 0.2, 
        yoyo: true, 
        repeat: 3, 
        ease: 'power1.inOut'
      })
    }
  }, [onClickTrigger])

  return (
    <group ref={group}>
      {/* 
        position ka pehla number X axis (Left/Right) hai. 
        -2.0 karne se model screen ke left side mein aa jayega.
        rotation Y ko 0.5 kiya hai taaki ye center ki taraf thoda face kare.
      */}
      <primitive object={scene} scale={1.2} position={[1, -1, 0]} rotation={[0, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/models/shiina_mahiru_-__angel_next_door.glb')

function CharacterScene({ onClickTrigger }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight position={[-3, 2, 2]} angle={0.6} intensity={2} color="#00d9ff" penumbra={0.5} />
      <spotLight position={[3, 1, 2]} angle={0.6} intensity={0.8} color="#ff006e" penumbra={0.5} />
      <directionalLight position={[0, 5, 3]} intensity={0.6} color="#ffffff" />
      <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={5} blur={2.5} far={3} color="#000000" />
      <Environment preset="night" />
      <Suspense fallback={null}>
        <CharacterModel onClickTrigger={onClickTrigger} />
      </Suspense>
    </>
  )
}

export default function HeroCharacter() {
  const [clickTrigger, setClickTrigger] = useState(0)
  const [showBubble, setShowBubble] = useState(false)
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef(null)
  
  // Only render the heavy Canvas when in view (or slightly before)
  const isInView = useInView(containerRef, { margin: "500px 0px 500px 0px" })

  const handleClick = () => {
    setClickTrigger(prev => prev + 1)
    setShowBubble(true)
    setTimeout(() => setShowBubble(false), 2000)
  }

  if (hasError) return <HeroCharacterFallback />

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 cursor-pointer hidden md:block" onClick={handleClick}>
      <ErrorBoundary fallback={<HeroCharacterFallback />} onError={() => setHasError(true)}>
        <Canvas dpr={1} camera={{ position: [0, 0.5, 4], fov: 35 }}
          gl={{ antialias: false, powerPreference: 'default' }}>
          <CharacterScene onClickTrigger={clickTrigger} />
        </Canvas>
      </ErrorBoundary>
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute', top: '30%', right: '20%',
              background: 'rgba(13, 17, 23, 0.9)', border: '1px solid rgba(0, 217, 255, 0.4)',
              borderRadius: '12px', padding: '8px 16px', color: '#00d9ff',
              textShadow: '0 0 10px rgba(0,217,255,0.5)',
              backdropFilter: 'blur(8px)', pointerEvents: 'none'
            }}
          >Yaho! Welcome to my portfolio!</motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import React from 'react'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error) {
    if (this.props.onError) this.props.onError(error)
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}