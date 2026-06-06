import { useMemo, useEffect } from "react"
import { Line } from "@react-three/drei"
import * as THREE from "three"
import { Cue } from "../models/cue"
import { usePhysicsStore } from "../stores/physics-store"
import { BALL_RADIUS, CUE_TIP_OFFSET, CONTACT_RADIUS } from "../constants"

const CUE_BALL_GAP = 0.02
const AIM_LINE_LENGTH = 2
const POWER_PULL_BACK = 0.15

interface CueControlProps {
  power: number
  contactOffset: [number, number]
  aimAngle: number
}

export const CueControl = ({ power, contactOffset, aimAngle }: CueControlProps) => {
  const ball = usePhysicsStore((s) => s.balls[0])
  const setCuePosition = usePhysicsStore((s) => s.setCuePosition)

  const aimDir = useMemo(
    () => new THREE.Vector3(Math.cos(aimAngle), 0, Math.sin(aimAngle)),
    [aimAngle],
  )

  const perpDir = useMemo(
    () => new THREE.Vector3(-Math.sin(aimAngle), 0, Math.cos(aimAngle)),
    [aimAngle],
  )

  const [aRaw, bRaw] = contactOffset
  const maxSq = CONTACT_RADIUS * CONTACT_RADIUS
  const [a, b] = (() => {
    const sq = aRaw * aRaw + bRaw * bRaw
    if (sq <= maxSq) return [aRaw, bRaw]
    const scale = CONTACT_RADIUS / Math.sqrt(sq)
    return [aRaw * scale, bRaw * scale]
  })()
  const depth = Math.sqrt(Math.max(0, BALL_RADIUS * BALL_RADIUS - a * a - b * b))

  const pullBack = power * POWER_PULL_BACK
  const offset = BALL_RADIUS + CUE_BALL_GAP + CUE_TIP_OFFSET + pullBack

  const cuePos: [number, number, number] = useMemo(
    () => [
      ball.position[0] - aimDir.x * offset + perpDir.x * a,
      ball.position[1] + b,
      ball.position[2] - aimDir.z * offset + perpDir.z * a,
    ],
    [ball.position, aimDir, perpDir, offset, a, b],
  )

  useEffect(() => {
    setCuePosition(cuePos)
  }, [cuePos, setCuePosition])

  const contactPoint: [number, number, number] = useMemo(
    () => [
      ball.position[0] - aimDir.x * depth + perpDir.x * a,
      ball.position[1] + b,
      ball.position[2] - aimDir.z * depth + perpDir.z * a,
    ],
    [ball.position, aimDir, perpDir, depth, a, b],
  )

  const linePoints: [number, number, number][] = useMemo(
    () => [
      [ball.position[0], ball.position[1], ball.position[2]],
      [
        ball.position[0] + aimDir.x * AIM_LINE_LENGTH,
        ball.position[1],
        ball.position[2] + aimDir.z * AIM_LINE_LENGTH,
      ],
    ],
    [ball.position, aimDir],
  )

  return (
    <group position={[0, -0.44, 0]}>
      <Line
        points={linePoints}
        color="#ffffff"
        lineWidth={1}
        transparent
        opacity={0.15}
      />

      <mesh position={[ball.position[0], ball.position[1], ball.position[2]]}>
        <torusGeometry args={[CONTACT_RADIUS * 1.01, 0.002, 16, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>

      <mesh position={contactPoint}>
        <sphereGeometry args={[0.005, 8, 8]} />
        <meshBasicMaterial color="#ff4444" />
      </mesh>

      <group position={cuePos} rotation={[0, -aimAngle, 0]}>
        <Cue position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]} />
      </group>
    </group>
  )
}
