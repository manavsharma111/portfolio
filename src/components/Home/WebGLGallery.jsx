import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, useScroll, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'

const projects = [
  { title: 'NexForge', slug: 'nexforge', color: '#00d9ff', image: '/assets/projects/nexforge.jpg' },
  { title: 'Adaptive HLS', slug: 'adaptive-hls', color: '#ff006e', image: '/assets/projects/adaptive-hls.jpg' },
  { title: 'Crochella', slug: 'crochella', color: '#8b5cf6', image: '/assets/projects/crochella.jpg' },
  { title: 'Wolf', slug: 'wolf', color: '#38b2ac', image: '/assets/projects/wolf.jpg' },
  { title: 'AI Finance', slug: 'ai-finance-dashboard', color: '#f97316', image: '/assets/projects/ai-finance.jpg' }
]

function CurvedCard({ url, title, color, index, total, radius = 4.5, onCardClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  
  // Calculate polar coordinates for the cylinder layout
  const angle = (index / total) * Math.PI * 2
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    // Smooth hover scale
    const targetScale = hovered ? 1.05 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <group 
      rotation={[0, -angle, 0]} 
      position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
    >
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onCardClick(url, index)}
      >
        {/* We use a cylinder geometry segment to physically curve the image plane! */}
        <cylinderGeometry args={[radius, radius, 3, 32, 1, true, -0.4, 0.8]} />
        <meshBasicMaterial side={THREE.DoubleSide}>
          {/* Apply image as texture */}
        </meshBasicMaterial>
      </mesh>
    </group>
  )
}

function Carousel({ radius = 4.5 }) {
  const scroll = useScroll()
  const groupRef = useRef()
  
  useFrame((state, delta) => {
    // scroll.offset goes from 0 to 1 based on the drag
    // We multiply by Math.PI * 2 to rotate the entire cylinder ring smoothly
    const targetRotation = scroll.offset * Math.PI * 2
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, 
      targetRotation, 
      0.1
    )
  })

  return (
    <group ref={groupRef}>
      {projects.map((proj, i) => (
        <CurvedCard 
          key={proj.slug}
          url={proj.image}
          title={proj.title}
          color={proj.color}
          index={i}
          total={projects.length}
          radius={radius}
          onCardClick={(url) => console.log('Clicked', url)}
        />
      ))}
    </group>
  )
}

export default function WebGLGallery() {
  return (
    <div className="w-full h-screen bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <ScrollControls pages={4} infinite horizontal damping={0.1}>
          <Carousel />
        </ScrollControls>
      </Canvas>
    </div>
  )
}
