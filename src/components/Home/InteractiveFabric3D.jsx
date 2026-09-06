import React, { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

const FabricShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTexture: { value: null },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Base gentle wind ripple
      float noise = sin(pos.x * 4.0 + uTime) * 0.15 + cos(pos.y * 3.0 + uTime) * 0.15;
      
      // Mouse interaction (push cloth away)
      float dist = distance(uv, uMouse);
      float force = smoothstep(0.3, 0.0, dist);
      
      // Apply deformation
      pos.z += noise;
      pos.z -= force * 0.8;
      
      vElevation = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      
      // Add artificial shadows based on depth (elevation)
      float shadow = smoothstep(-0.5, 0.5, vElevation);
      texColor.rgb *= (0.7 + shadow * 0.5); // Darken deep areas
      
      gl_FragColor = texColor;
    }
  `,
}

const FabricMesh = () => {
  const meshRef = useRef()
  const materialRef = useRef()
  const texture = useTexture(
    "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
  ) // Handloom texture

  // Keep track of smoothed mouse coordinates for buttery transitions
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5))
  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5))

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTexture: { value: texture },
    }),
    [texture],
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime

      // Linear interpolation for smooth mouse trailing
      currentMouse.current.lerp(targetMouse.current, 0.1)
      materialRef.current.uniforms.uMouse.value.copy(currentMouse.current)
    }
  })

  const handlePointerMove = (e) => {
    targetMouse.current.x = e.uv.x
    targetMouse.current.y = e.uv.y
  }

  const handlePointerLeave = () => {
    // Reset to center when mouse leaves
    targetMouse.current.x = 0.5
    targetMouse.current.y = 0.5
  }

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <planeGeometry args={[16, 9, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={FabricShaderMaterial.vertexShader}
        fragmentShader={FabricShaderMaterial.fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  )
}

const InteractiveFabric3D = () => {
  return (
    <section className="relative w-full h-[80vh] bg-[#020202] flex items-center justify-center overflow-hidden cursor-none">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[12vw] font-serif font-black text-[#ff007f]/5 whitespace-nowrap">
          TOUCH THE LOOM
        </h2>
      </div>

      {/* WebGL Canvas */}
      <div
        className="relative z-10 w-full h-full max-w-7xl mx-auto"
        data-cursor-text="DRAG"
      >
        <Canvas dpr={1} gl={{ antialias: false, powerPreference: 'default' }} camera={{ position: [0, 0, 4.5], fov: 75 }}>
          <ambientLight intensity={1} />
          <FabricMesh />
        </Canvas>
      </div>

      <div className="absolute bottom-10 text-center w-full z-20 pointer-events-none">
        <p className="text-[#FAF9F6] tracking-widest text-sm uppercase opacity-50">
          Interact with the digital weave
        </p>
      </div>
    </section>
  )
}

export default InteractiveFabric3D
