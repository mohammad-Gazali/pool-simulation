import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { usePhysicsStore } from "../stores/physics-store"
import type { BallState } from "../types/ball-state"
import { BALL_RADIUS } from "../constants"
import {
  MU_ROLLING,
  MU_SLIDING,
  MU_SPIN,
  GRAVITY,
  VELOCITY_THRESHOLD,
  OMEGA_THRESHOLD,
} from "./constants"

const MAX_DT = 1 / 30

function stepBall(ball: BallState, dt: number): Partial<BallState> | null {
  let [vx, , vz] = ball.velocity
  let [wx, wy, wz] = ball.angularVelocity

  const speed = Math.sqrt(vx * vx + vz * vz)

  if (
    speed < VELOCITY_THRESHOLD &&
    Math.abs(wx) < OMEGA_THRESHOLD &&
    Math.abs(wz) < OMEGA_THRESHOLD &&
    Math.abs(wy) < OMEGA_THRESHOLD
  ) {
    return null
  }

  if (speed < VELOCITY_THRESHOLD && (Math.abs(wx) >= OMEGA_THRESHOLD || Math.abs(wz) >= OMEGA_THRESHOLD)) {
    if (Math.abs(wz) >= OMEGA_THRESHOLD) {
      const spinDecel = Math.sign(wz) * MU_SPIN
      const newWz = wz - spinDecel * dt
      wz = wz * newWz > 0 ? newWz : 0
    }
    if (Math.abs(wx) >= OMEGA_THRESHOLD) {
      const spinDecel = Math.sign(wx) * MU_SPIN
      const newWx = wx - spinDecel * dt
      wx = wx * newWx > 0 ? newWx : 0
    }
  } else {
    const relVx = vx + BALL_RADIUS * wz
    const relVz = vz - BALL_RADIUS * wx
    const relSpeed = Math.sqrt(relVx * relVx + relVz * relVz)

    if (relSpeed < VELOCITY_THRESHOLD) {
      const accel = -MU_ROLLING * GRAVITY
      const vxHat = vx / speed
      const vzHat = vz / speed
      const dv = accel * dt
      const newVx = vx + dv * vxHat
      const newVz = vz + dv * vzHat

      if (newVx * vx <= 0 || newVz * vz <= 0) {
        vx = 0
        vz = 0
        wx = 0
        wz = 0
      } else {
        vx = newVx
        vz = newVz
        wx = vz / BALL_RADIUS
        wz = -vx / BALL_RADIUS
      }
    } else {
      const friction = -MU_SLIDING * GRAVITY
      const rvxHat = relVx / relSpeed
      const rvzHat = relVz / relSpeed

      vx += friction * rvxHat * dt
      vz += friction * rvzHat * dt

      const torqueFactor = (5 * MU_SLIDING * GRAVITY) / (2 * BALL_RADIUS)
      wx += torqueFactor * (relVz / relSpeed) * dt
      wz -= torqueFactor * (relVx / relSpeed) * dt
    }
  }

  if (Math.abs(wy) >= OMEGA_THRESHOLD) {
    const spinDecel = Math.sign(wy) * MU_SPIN
    const newWy = wy - spinDecel * dt
    wy = wy * newWy > 0 ? newWy : 0
  }

  const newSpeed = Math.sqrt(vx * vx + vz * vz)
  if (newSpeed < VELOCITY_THRESHOLD && Math.abs(wy) < OMEGA_THRESHOLD &&
      Math.abs(wx) < OMEGA_THRESHOLD && Math.abs(wz) < OMEGA_THRESHOLD) {
    return null
  }

  const newPos: [number, number, number] = [
    ball.position[0] + vx * dt,
    ball.position[1],
    ball.position[2] + vz * dt,
  ]

  return {
    position: newPos,
    velocity: [vx, 0, vz],
    angularVelocity: [wx, wy, wz],
  }
}

export const PhysicsLoop = () => {
  const store = usePhysicsStore
  const accumulatorRef = useRef(0)

  useFrame((_, delta) => {
    accumulatorRef.current += Math.min(delta, MAX_DT)
    const stepSize = 1 / 120

    while (accumulatorRef.current >= stepSize) {
      accumulatorRef.current -= stepSize
      const state = store.getState()
      const { balls } = state
      let anyMoving = false

      for (const idStr of Object.keys(balls)) {
        const id = Number(idStr)
        const result = stepBall(balls[id], stepSize)
        if (result) {
          anyMoving = true
          state.setBallState(id, result)
        }
      }

      if (!anyMoving) {
        accumulatorRef.current = 0
        break
      }
    }
  })

  return null
}
