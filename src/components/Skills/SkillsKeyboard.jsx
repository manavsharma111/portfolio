import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Html, ContactShadows, PresentationControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { skills } from './SkillData'
import StackIcon from 'tech-stack-icons'
import CustomTechIcon from '../Shared/CustomTechIcon'

const getWittyDescription = (name) => {
  const desc = {
    'JavaScript': "yeeting code into the DOM since '95, no cap!",
    'React 19': "Hooks, states, and maybe one too many re-renders.",
    'Vite': "Blink and you'll miss the build time.",
    'Tailwind CSS v4': "Utility classes go brrrrr.",
    'Framer Motion': "Making divs dance like nobody's watching.",
    'GSAP': "The final boss of web animations.",
    'Three.js / R3F': "Turning the browser into a GPU oven.",
    'Node.js': "JavaScript escaped the browser and chose violence.",
    'Express.js': "The 'I need a backend fast' reliable friend.",
    'MongoDB': "No SQL, no schema, no problems... right?",
    'Docker': "It works on my machine, so we shipped my machine.",
    'Git': "Commit early, push often, blame others.",
    'OpenAI': "Stochastic parrots writing my code.",
    'Python': "import antigravity",
    'C++': "Segmentation fault (core dumped)",
  }
  return desc[name] || `Mastering the art of ${name}.`
}

function Key({ skill, position, color, setActiveSkill }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const ref = useRef()

  const targetY = clicked ? -0.1 : hovered ? 0.1 : 0

  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, position[1] + targetY, delta * 15)
  })

  // Hacky way to render the icon
  const renderIcon = () => {
    const hasCustom = CustomTechIcon({ name: skill.name })
    if (hasCustom) {
      return <CustomTechIcon name={skill.name} className="w-8 h-8 pointer-events-none" />
    }
    if (skill.stackIcon) {
      return <StackIcon name={skill.stackIcon} style={{ width: 32, height: 32 }} className="pointer-events-none" />
    }
    return <span className="text-xl font-bold font-heading">{skill.name.charAt(0)}</span>
  }

  return (
    <group ref={ref} position={position}>
      <RoundedBox
        args={[0.85, 0.5, 0.85]}
        radius={0.15}
        smoothness={4}
        onPointerOver={() => { setHovered(true); setActiveSkill(skill); }}
        onPointerOut={() => { setHovered(false); setClicked(false); setActiveSkill(null); }}
        onPointerDown={() => setClicked(true)}
        onPointerUp={() => setClicked(false)}
      >
        <meshStandardMaterial 
          color={hovered ? color : '#1a1a24'} 
          roughness={hovered ? 0.2 : 0.4} 
          metalness={0.8} 
        />
      </RoundedBox>
      <Html
        transform
        position={[0, 0.26, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        style={{
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          color: hovered ? '#fff' : color,
          filter: hovered ? 'drop-shadow(0px 0px 5px rgba(255,255,255,0.8))' : 'none',
          transition: 'all 0.2s ease-out'
        }}
      >
        {renderIcon()}
      </Html>
    </group>
  )
}

export default function SkillsKeyboard() {
  const keyboardRef = useRef()
  const [activeSkill, setActiveSkill] = useState(null)
  
  // Arrange skills in a grid for the keyboard
  const cols = 7
  const rows = Math.ceil(skills.length / cols)
  
  return (
    <div className="w-full h-[60vh] md:h-[80vh] cursor-grab active:cursor-grabbing relative">
      
      {/* 2D Overlay for Text */}
      <div className="absolute top-10 left-10 md:left-20 z-10 pointer-events-none w-1/2 md:w-1/3">
        {activeSkill ? (
          <div className="transition-all duration-300">
            <h2 
              className="text-5xl md:text-7xl font-heading font-black mb-2 leading-none"
              style={{
                color: '#fff',
                textShadow: `4px 4px 0px ${activeSkill.color}, 8px 8px 15px rgba(0,0,0,0.5)`,
                transform: 'rotate(-5deg) translateY(-10px)',
                display: 'inline-block'
              }}
            >
              {activeSkill.name}
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-bold mt-4 drop-shadow-md">
              {getWittyDescription(activeSkill.name)}
            </p>
          </div>
        ) : (
          <div className="transition-all duration-300 opacity-50">
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-2 text-white/20">
              Tech Stack
            </h2>
            <p className="text-lg md:text-xl text-white/30 italic">
              (hint: hover a key)
            </p>
          </div>
        )}
      </div>

      <Canvas 
        camera={{ position: [0, 6, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: false }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <Environment preset="city" />
        
        <PresentationControls
          global
          rotation={[0.2, 0, 0]}
          polar={[-0.2, 0.4]}
          azimuth={[-0.4, 0.4]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <group ref={keyboardRef} position={[0, -0.5, 0]}>
            {/* Base of the keyboard */}
            <RoundedBox 
              args={[cols * 1.05 + 0.6, 0.6, rows * 1.05 + 0.6]} 
              radius={0.2} 
              position={[0, -0.3, 0]}
            >
              <meshStandardMaterial color="#0f0f15" roughness={0.9} />
            </RoundedBox>

            {/* Keys */}
            {skills.map((skill, index) => {
              const row = Math.floor(index / cols)
              const col = index % cols
              const x = (col - cols / 2 + 0.5) * 1.05
              const z = (row - rows / 2 + 0.5) * 1.05
              return (
                <Key 
                  key={skill.name} 
                  skill={skill} 
                  position={[x, 0.25, z]} 
                  color={skill.color || '#00d9ff'}
                  setActiveSkill={setActiveSkill}
                />
              )
            })}
          </group>
        </PresentationControls>
        
        <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={20} blur={2} far={4} />
      </Canvas>
    </div>
  )
}
