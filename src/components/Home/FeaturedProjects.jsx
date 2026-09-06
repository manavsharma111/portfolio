import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { useTexture, Text, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'framer-motion'
import RevealMask from '../Shared/RevealMask'
import TextScramble from '../Shared/TextScramble'
import GlitchText from '../Shared/GlitchText'

const projects = [
  { title: 'NexForge', slug: 'nexforge', color: '#00d9ff', image: '/project_image/Nexforge.png' },
  { title: 'Adaptive HLS', slug: 'anime-stream', color: '#ff006e', image: '/project_image/ABS_HLS_home.png' },
  { title: 'Crochella', slug: 'crochella', color: '#8b5cf6', image: '/project_image/Crochella.png' },
  { title: 'Wolf', slug: 'wolf', color: '#38b2ac', image: '/project_image/wolf.png' },
  { title: 'AI Finance', slug: 'ai-finance-dashboard', color: '#f97316', image: '/project_image/aifinance.png' }
]

const ProjectShader = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uVelocity: 0,
    uHover: 0,
    uProgress: 0,
    uOpacity: 1,
    uPointer: new THREE.Vector2(0.5, 0.5),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uVelocity;
    uniform float uProgress;
    uniform float uHover;
    uniform vec2 uPointer;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      
      // S-Shape Flowing Wave Effect (Inverted)
      // Anchoring the wave to worldPos.x makes the cards "swim" or flow through the wave as you drag them!
      float wave = -sin(worldPos.x * 0.6) * 0.8; 
      
      // Velocity Skew
      float skew = (uv.y - 0.5) * uVelocity * 2.0;
      
      // Fabric-like Mouse Interaction (Push cloth away)
      float dist = distance(uv, uPointer);
      float force = smoothstep(0.4, 0.0, dist) * uHover;
      
      pos.z += mix(wave, 0.0, uProgress); // Wave apply karo
      pos.z -= force * 0.8; // smooth push away
      pos.x += mix(skew, 0.0, uProgress);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uProgress;
    uniform float uOpacity;
    uniform float uVelocity;
    uniform vec2 uPointer;
    
    void main() {
      // Very subtle refraction around the pointer bulge
      float dist = distance(vUv, uPointer);
      float force = smoothstep(0.4, 0.0, dist) * uHover;
      vec2 distortedUv = vUv - vec2(force * 0.02);
      
      // Chromatic Aberration based on velocity
      float shift = abs(uVelocity) * 0.02;
      vec2 rUv = distortedUv + vec2(shift, 0.0);
      vec2 bUv = distortedUv - vec2(shift, 0.0);
      
      float r = texture2D(uTexture, rUv).r;
      float g = texture2D(uTexture, distortedUv).g;
      float b = texture2D(uTexture, bUv).b;
      float a = texture2D(uTexture, vUv).a;
      
      vec3 color = vec3(r, g, b);
      
      // Keep colors completely normal, no darkening
      gl_FragColor = vec4(color, a * uOpacity);
    }
  `
)
extend({ ProjectShader })

// Pre-allocate vectors to avoid GC thrashing in useFrame
const vPositionCard = new THREE.Vector3()
const vScaleCard = new THREE.Vector3()

function ProjectCard({ url, title, color, index, spacing, activeIndex, setActiveIndex, currentXRef, W }) {
  const groupRef = useRef()
  const materialRef = useRef()

  const [hovered, setHovered] = useState(false)
  const texture = useTexture(url)
  const navigate = useNavigate()
  const { viewport } = useThree()

  // Keep track of smoothed mouse coordinates for buttery transitions (Fabric style)
  const targetPointer = useRef(new THREE.Vector2(0.5, 0.5))
  const currentPointer = useRef(new THREE.Vector2(0.5, 0.5))

  const isActive = activeIndex === index
  const isAnyActive = activeIndex !== null

  const cardWidth = viewport.width * 0.65
  const cardHeight = viewport.height * 0.85
  const baseX = index * spacing

  useFrame(() => {
    if (!groupRef.current || !materialRef.current) return

    // Linear interpolation for smooth mouse trailing
    currentPointer.current.lerp(targetPointer.current, 0.1)
    materialRef.current.uPointer = currentPointer.current

    const currentProgress = materialRef.current.uProgress
    const targetProgress = isActive ? 1 : 0
    materialRef.current.uProgress = THREE.MathUtils.lerp(currentProgress, targetProgress, 0.06)
    materialRef.current.uHover = THREE.MathUtils.lerp(materialRef.current.uHover, hovered ? 1 : 0, 0.1)

    const targetOpacity = isAnyActive && !isActive ? 0 : 1
    materialRef.current.uOpacity = THREE.MathUtils.lerp(materialRef.current.uOpacity, targetOpacity, 0.1)

    if (isActive) {
      const screenScaleX = viewport.width / cardWidth
      const screenScaleY = viewport.height / cardHeight
      const maxScale = Math.max(screenScaleX, screenScaleY)

      vPositionCard.set(0, 0, 4)
      vScaleCard.set(maxScale, maxScale, 1)

      if (currentProgress > 0.99 && targetProgress === 1) {
        setActiveIndex(null)
        navigate(`/projects/${projects[index].slug}`)
      }
    } else {
      const targetScale = hovered && !isAnyActive ? 1.03 : 1
      
      // Infinite Wrap Logic
      let wrappedX = ((baseX + currentXRef.current) % W + W) % W
      if (wrappedX > W / 2) wrappedX -= W
      
      // Instantly teleport if it wraps bounds to avoid lerp flying across screen
      if (Math.abs(wrappedX - groupRef.current.position.x) > W / 2) {
        groupRef.current.position.x = wrappedX
      }

      vPositionCard.set(wrappedX, 0, 0)
      vScaleCard.set(targetScale, targetScale, 1)
    }

    groupRef.current.position.lerp(vPositionCard, 0.08)
    groupRef.current.scale.lerp(vScaleCard, 0.08)
  })

  return (
    <group
      ref={groupRef}
      onPointerOver={() => {
        if (!isAnyActive) {
          document.body.style.cursor = 'pointer'
          setHovered(true)
        }
      }}
      onPointerOut={() => {
        if (!isAnyActive) document.body.style.cursor = 'grab'
        setHovered(false)
        targetPointer.current.set(0.5, 0.5)
      }}
      onPointerMove={(e) => {
        if (hovered && !isAnyActive) {
          targetPointer.current.set(e.uv.x, e.uv.y)
        }
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        if (isAnyActive && !isActive) return
        setActiveIndex(isActive ? null : index)
        if (!isActive) document.body.style.cursor = 'auto'
      }}
    >
      <mesh>
        <planeGeometry args={[cardWidth, cardHeight, 64, 64]} />
        <projectShader
          ref={materialRef}
          uTexture={texture}
          transparent
        />
      </mesh>
    </group>
  )
}

function Carousel({ activeIndex, setActiveIndex }) {
  const groupRef = useRef()
  const { viewport } = useThree()

  const targetX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)
  const previousClientX = useRef(0)
  const velocity = useRef(0)

  const spacing = viewport.width * 0.72 // Tight overlapping spacing
  const W = spacing * projects.length

  const handlePointerDown = (e) => {
    if (activeIndex !== null) return
    isDragging.current = true
    previousClientX.current = e.clientX
    document.body.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current || activeIndex !== null) return
    const deltaX = e.clientX - previousClientX.current
    const sensitivity = viewport.width * 0.002

    targetX.current += deltaX * sensitivity
    velocity.current = deltaX * sensitivity

    previousClientX.current = e.clientX
  }

  const handlePointerUp = () => {
    isDragging.current = false
    if (activeIndex === null) document.body.style.cursor = 'grab'
  }

  const handleWheel = (e) => {
    if (activeIndex !== null) return
    targetX.current -= e.deltaY * 0.015
  }

  useFrame(() => {
    if (!groupRef.current) return

    if (!isDragging.current) {
      targetX.current += velocity.current
      velocity.current *= 0.92 // Smooth decay
    }

    // INFINITE SCROLL: No clamping!

    currentX.current = THREE.MathUtils.lerp(currentX.current, targetX.current, 0.08)
    
    // Group does NOT move anymore, cards move themselves
    // groupRef.current.position.x = currentX.current

    // Calculate global velocity purely from the pan delta, decoupled from camera/cards
    const globalVelocity = (targetX.current - currentX.current) * 0.1

    // Broadcast accurate scroll velocity to all shaders
    groupRef.current.children.forEach(child => {
      const mesh = child.children[0]
      if (mesh && mesh.material && mesh.material.uVelocity !== undefined) {
        mesh.material.uVelocity = globalVelocity
      }
    })
  })

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[W * 3, 20]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      <group ref={groupRef}>
        {projects.map((proj, i) => (
          <ProjectCard
            key={proj.slug}
            url={proj.image}
            title={proj.title}
            color={proj.color}
            index={i}
            spacing={spacing}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            currentXRef={currentX}
            W={W}
          />
        ))}
      </group>
    </group>
  )
}

class FeaturedErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center text-white">
          <p>WebGL Gallery failed to load.</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(null)
  const containerRef = useRef(null)
  
  // Unmount when far out of view to save massive GPU memory from 5 textures
  const isInView = useInView(containerRef, { margin: "500px 0px 500px 0px" })

  return (
    <section ref={containerRef} className="py-20 relative w-full h-screen overflow-hidden bg-[#020202]">
      <div
        className="absolute top-16 left-0 right-0 z-10 pointer-events-none transition-opacity duration-500"
        style={{ opacity: activeIndex !== null ? 0 : 1 }}
      >
        <RevealMask direction="top">
          <div className="flex justify-center items-center gap-3 md:gap-4 my-5 pointer-events-auto cursor-default">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white relative inline-block transition-transform duration-300 hover:scale-[1.02]"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
            >
              {"Featured".split('').map((char, i) => (
                <span key={i} className="inline-block"><TextScramble text={char} triggerOnView={true} /></span>
              ))}
            </h2>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple relative inline-block transition-transform duration-300 hover:scale-[1.02]"
              style={{ textShadow: '0 0 30px rgba(0,217,255,0.3)' }}
            >
              {"Work".split('').map((char, i) => (
                <span key={i} className="inline-block"><TextScramble text={char} triggerOnView={true} /></span>
              ))}
            </h2>
          </div>
        </RevealMask>
       
      </div>

      <FeaturedErrorBoundary>
        {/* The Camera is permanently fixed at [0,0,8] */}
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={1}
          gl={{ antialias: false, powerPreference: 'default' }}
          className={`w-full h-full mt-24 ${activeIndex === null ? 'cursor-grab active:cursor-grabbing' : ''}`}
        >
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <Carousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          </Suspense>
        </Canvas>
      </FeaturedErrorBoundary>
    </section>
  )
}
