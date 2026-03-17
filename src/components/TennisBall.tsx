import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingBall() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.10
    meshRef.current.rotation.x = t * 0.03
    meshRef.current.position.y = Math.sin(t * 0.45) * 0.12
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#E8DFD0"
        roughness={0.88}
        metalness={0.0}
        transparent
        opacity={0.22}
      />
    </mesh>
  )
}

interface TennisBallProps {
  className?: string
}

export default function TennisBall({ className }: TennisBallProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight position={[4, 6, 4]} intensity={1.4} color="#f5f0e8" />
        <directionalLight position={[-3, -2, -4]} intensity={0.25} color="#c8dfc8" />
        <Suspense fallback={null}>
          <FloatingBall />
        </Suspense>
      </Canvas>
    </div>
  )
}
