import { useMemo } from "react"
import * as THREE from "three"
import type { BallState } from "../types/ball-state"
import { BALL_RADIUS } from "../constants"

export const Ball = ({ state }: { state: BallState }) => {
  const texture = useMemo(() => {
    if (state.config.number === 0) return undefined
    return createBallTexture(state.config)
  }, [state])

  return (
    <mesh position={state.position} castShadow>
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

const createBallTexture = (config: BallState["config"]) => {
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
