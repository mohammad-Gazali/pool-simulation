import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Cue } from "../models/cue"
import { usePhysicsStore } from "../stores/physics-store"
import { BALL_RADIUS, CUE_TIP_OFFSET, CONTACT_RADIUS } from "../constants"
import { useCueControlStore } from "../stores/cue-control-store"

const CUE_BALL_GAP = 0.02
const AIM_LINE_LENGTH = 2
const POWER_PULL_BACK = 0.15
const VELOCITY_EPSILON = 0.005

const aimLineGeom = (() => {
  const geom = new THREE.BufferGeometry()
  const pos = new Float32Array(6)
  geom.setAttribute("position", new THREE.BufferAttribute(pos, 3))
  return geom
})()

export const CueControl = () => {
  const cueGroupRef = useRef<THREE.Group>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const dotRef = useRef<THREE.Mesh>(null)
  const movingRef = useRef(false)

  const moving = usePhysicsStore(
    (s) => Math.sqrt(s.balls[0].velocity[0] ** 2 + s.balls[0].velocity[2] ** 2) > VELOCITY_EPSILON,
  )

  useEffect(() => {
    movingRef.current = moving
  }, [moving])

  useFrame(() => {
    const ball = usePhysicsStore.getState().balls[0]
    const { power, contactOffsetX, contactOffsetY, aimAngle } = useCueControlStore.getState()
    const isMoving = movingRef.current

    const aimDir = new THREE.Vector3(Math.cos(aimAngle), 0, Math.sin(aimAngle))
    const perpDir = new THREE.Vector3(-Math.sin(aimAngle), 0, Math.cos(aimAngle))

    const maxSq = CONTACT_RADIUS * CONTACT_RADIUS
    const sq = contactOffsetX * contactOffsetX + contactOffsetY * contactOffsetY
    let a: number, b: number
    if (sq <= maxSq) {
      a = contactOffsetX
      b = contactOffsetY
    } else {
      const scale = CONTACT_RADIUS / Math.sqrt(sq)
      a = contactOffsetX * scale
      b = contactOffsetY * scale
    }
    const depth = Math.sqrt(Math.max(0, BALL_RADIUS * BALL_RADIUS - a * a - b * b))
    const pullBack = power * POWER_PULL_BACK
    const offset = BALL_RADIUS + CUE_BALL_GAP + CUE_TIP_OFFSET + pullBack

    const cueX = ball.position[0] - aimDir.x * offset + perpDir.x * a
    const cueY = ball.position[1] + b
    const cueZ = ball.position[2] - aimDir.z * offset + perpDir.z * a

    if (!isMoving) {
      usePhysicsStore.getState().setCuePosition([cueX, cueY, cueZ])
    }

    const storedCuePos = usePhysicsStore.getState().cuePosition

    if (cueGroupRef.current) {
      cueGroupRef.current.position.set(storedCuePos[0], storedCuePos[1], storedCuePos[2])
      cueGroupRef.current.rotation.y = -aimAngle
    }

    if (lineRef.current) {
      lineRef.current.visible = !isMoving
    }
    const attr = aimLineGeom.attributes.position as THREE.BufferAttribute
    attr.setXYZ(0, ball.position[0], ball.position[1], ball.position[2])
    attr.setXYZ(
      1,
      ball.position[0] + aimDir.x * AIM_LINE_LENGTH,
      ball.position[1],
      ball.position[2] + aimDir.z * AIM_LINE_LENGTH,
    )
    attr.needsUpdate = true

    if (ringRef.current) {
      ringRef.current.visible = !isMoving
      ringRef.current.position.set(ball.position[0], ball.position[1], ball.position[2])
    }

    if (dotRef.current) {
      dotRef.current.visible = !isMoving
      dotRef.current.position.set(
        ball.position[0] - aimDir.x * depth + perpDir.x * a,
        ball.position[1] + b,
        ball.position[2] - aimDir.z * depth + perpDir.z * a,
      )
    }
  })

  return (
    <group position={[0, -0.44, 0]}>
      <lineSegments ref={lineRef} geometry={aimLineGeom}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </lineSegments>

      <mesh ref={ringRef}>
        <torusGeometry args={[CONTACT_RADIUS * 1.01, 0.002, 16, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>

      <mesh ref={dotRef}>
        <sphereGeometry args={[0.005, 8, 8]} />
        <meshBasicMaterial color="#ff4444" />
      </mesh>

      <group ref={cueGroupRef}>
        <Cue position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]} />
      </group>
    </group>
  )
}