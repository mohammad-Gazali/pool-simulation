import { useMemo } from "react"
import * as THREE from "three"

export interface BallConfig {
  number: number
  color: string
  isStripe: boolean
}

interface BallProps {
  position: [number, number, number]
  config: BallConfig
  radius: number
}

const createBallTexture = (config: BallConfig) => {
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

export const Ball = ({ position, config, radius }: BallProps) => {
  const texture = useMemo(() => {
    if (config.number === 0) return undefined
    return createBallTexture(config)
  }, [config])

  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.25}
        metalness={0.1}
        envMapIntensity={0.5}
      />
    </mesh>
  )
}
