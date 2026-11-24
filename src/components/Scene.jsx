import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { scrollState } from '../scrollState'

const chrome = { color: '#C7CBD4', metalness: 1, roughness: 0.08, envMapIntensity: 1.6 }

function Rig() {
  useFrame(({ camera, pointer }, dt) => {
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -scrollState.p * 30, 3, dt)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 1.2, 3, dt)
    camera.lookAt(0, camera.position.y, 0)
  })
  return null
}
function Spin({ speed = 0.2, children, ...p }) {
  const r = useRef()
  useFrame(({ pointer }, dt) => {
    r.current.rotation.y += dt * speed
    r.current.rotation.x = THREE.MathUtils.damp(r.current.rotation.x, pointer.y * 0.5, 3, dt)
  })
  return <group ref={r} {...p}>{children}</group>
}
export default function Scene() {
  return (
    <div className="canvas-wrap" aria-hidden>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <fog attach="fog" args={['#050507', 9, 28]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[4, 3, 4]} color="#FF2D95" intensity={60} />
        <pointLight position={[-5, -2, 3]} color="#8B5CF6" intensity={50} />
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="rect" intensity={4} position={[0, 5, -5]} scale={[10, 10, 1]} color="#FF2D95" />
            <Lightformer form="ring" intensity={3} position={[-5, 1, -1]} scale={4} color="#8B5CF6" />
            <Lightformer form="rect" intensity={3} position={[5, -1, 2]} scale={[6, 2, 1]} color="#F5F5F5" />
          </group>
        </Environment>
        <Rig />
        <Sparkles count={90} scale={[18, 34, 10]} position={[0, -15, 0]} size={2.5} speed={0.3} color="#C7CBD4" />
        <Sparkles count={40} scale={[14, 34, 8]} position={[0, -15, -2]} size={5} speed={0.2} color="#FF2D95" />
        {/* hero: liquid chrome */}
        <Float speed={1.5} floatIntensity={1.2}><mesh position={[3.2, 0, 0]}><icosahedronGeometry args={[1.9, 24]} /><MeshDistortMaterial {...chrome} distort={0.45} speed={1.6} /></mesh></Float>
        {/* interactive rings */}
        <Spin position={[-2.5, -7, 0]} speed={0.4}>{[1.6, 2.2, 2.8].map((r, i) => <mesh key={r} rotation={[i * 0.6, i * 0.9, 0]}><torusGeometry args={[r, 0.07, 24, 120]} /><meshStandardMaterial {...chrome} /></mesh>)}</Spin>
        {/* glass spheres */}
        {[[2.8, -13, 0, 1.3], [-3, -15, -1, 0.8], [0.5, -14, 1, 0.5]].map(([x, y, z, s], i) => (
          <Float key={i} speed={1 + i * 0.4}><mesh position={[x, y, z]} scale={s}><sphereGeometry args={[1, 48, 48]} /><meshPhysicalMaterial transmission={1} thickness={1.4} roughness={0.05} ior={1.5} color="#e8d8ff" envMapIntensity={2} /></mesh></Float>
        ))}
        {/* chrome knot */}
        <Spin position={[-3, -21, 0]} speed={0.3}><mesh><torusKnotGeometry args={[1.2, 0.38, 160, 24]} /><meshStandardMaterial {...chrome} /></mesh></Spin>
        {/* contact portal */}
        <Spin position={[0, -29, -1]} speed={0.15}>{[2.6, 2.0, 1.4].map((r, i) => <mesh key={r}><torusGeometry args={[r, 0.09, 24, 140]} /><meshStandardMaterial color="#FF2D95" emissive="#FF2D95" emissiveIntensity={1.2 + i} metalness={0.6} roughness={0.2} /></mesh>)}</Spin>
      </Canvas>
    </div>
  )
}
