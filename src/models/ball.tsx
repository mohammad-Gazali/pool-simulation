import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { usePhysicsStore } from "../stores/physics-store"
import { BALL_RADIUS } from "../constants"

interface BallProps {
  id: number
  config: {
    number: number
    color: string
    isStripe: boolean
  }
}

export const Ball = ({ id, config }: BallProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  const texture = useMemo(() => {
    if (config.number === 0) return undefined
    return createBallTexture(config)
  }, [config])

  useFrame((_, delta) => {
    const state = usePhysicsStore.getState().balls[id]
    if (!state) return
    const mesh = meshRef.current
    if (!mesh) return

    mesh.position.set(state.position[0], state.position[1], state.position[2])

    const [wx, wy, wz] = state.angularVelocity
    mesh.rotation.x += wx * delta
    mesh.rotation.y += wy * delta
    mesh.rotation.z += wz * delta
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      <sphereGeometry args={[BALL_RADIUS, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.25}
        metalness={0.1}
        envMapIntensity={0.5}
      />
    </mesh>
  )
}

const createBallTexture = (config: { number: number; color: string; isStripe: boolean }) => {
  const canvas = document.createElement("canvas")
  const size = 256
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!
  const cx = size / 2
  const cy = size / 2

  if (config.isStripe) {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    ctx.fillStyle = config.color
    ctx.fillRect(0, cy - 38, size, 76)
  } else {
    ctx.fillStyle = config.color
    ctx.fillRect(0, 0, size, size)
  }

  ctx.beginPath()
  ctx.arc(cx, cy, 26, 0, Math.PI * 2)
  ctx.fillStyle = "#ffffff"
  ctx.fill()

  ctx.fillStyle = "#000000"
  ctx.font = "bold 34px sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(String(config.number), cx, cy + 1)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
