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
  const spinSpeed = Math.abs(wy)
  const rollSpeed = Math.sqrt(wx * wx + wz * wz)

  const atRest = speed < VELOCITY_THRESHOLD
  const noRoll = rollSpeed < OMEGA_THRESHOLD
  const noSpin = spinSpeed < OMEGA_THRESHOLD

  if (atRest && noRoll && noSpin) return null

  // ─── Spinning state (Section 3) — only ω_y active, ball stationary ──────
  if (atRest && noRoll) {
    if (!noSpin) {
      const decel = MU_SPIN
      const newWy = wy - Math.sign(wy) * decel * dt
      wy = wy * newWy > 0 ? newWy : 0
    }
    return {
      position: ball.position,
      velocity: [0, 0, 0],
      angularVelocity: [0, wy, 0],
    }
  }

  // ─── Relative velocity at contact point (Section 3) ──────────────────────
  const relVx = vx + BALL_RADIUS * wz
  const relVz = vz - BALL_RADIUS * wx
  const relSpeed = Math.sqrt(relVx * relVx + relVz * relVz)

  // ─── Stiction threshold ──────────────────────────────────────────────────
  // Forward Euler can't resolve relative velocities below this value per step,
  // creating a limit cycle. When relSpeed enters this band, force the no-slip
  // condition and enter the rolling state.
  const STICTION_BAND = (7 / 2) * MU_SLIDING * GRAVITY * dt

  // ─── Rolling without slipping (Section 3) ──────────────────────────────
  if (relSpeed < VELOCITY_THRESHOLD || relSpeed < STICTION_BAND) {
    const decel = MU_ROLLING * GRAVITY
    const dv = decel * dt

    if (dv >= speed) {
      vx = 0
      vz = 0
      wx = 0
      wz = 0
    } else {
      const ratio = (speed - dv) / speed
      vx *= ratio
      vz *= ratio
      wx = vz / BALL_RADIUS
      wz = -vx / BALL_RADIUS
    }

    if (!noSpin) {
      const decel = MU_SPIN
      const newWy = wy - Math.sign(wy) * decel * dt
      wy = wy * newWy > 0 ? newWy : 0
    }

    const newSpeed = Math.sqrt(vx * vx + vz * vz)
    if (newSpeed < VELOCITY_THRESHOLD &&
        Math.abs(wx) < OMEGA_THRESHOLD &&
        Math.abs(wy) < OMEGA_THRESHOLD &&
        Math.abs(wz) < OMEGA_THRESHOLD) {
      return null
    }

    return {
      position: [ball.position[0] + vx * dt, ball.position[1], ball.position[2] + vz * dt],
      velocity: [vx, 0, vz],
      angularVelocity: [wx, wy, wz],
    }
  }

  // ─── Rolling with slipping (Section 3) ─────────────────────────────────
  const rvxHat = relVx / relSpeed
  const rvzHat = relVz / relSpeed

  const slipDecel = MU_SLIDING * GRAVITY
  vx -= slipDecel * rvxHat * dt
  vz -= slipDecel * rvzHat * dt

  const torqueFactor = (5 * MU_SLIDING * GRAVITY) / (2 * BALL_RADIUS)
  wx += torqueFactor * rvzHat * dt
  wz -= torqueFactor * rvxHat * dt

  if (!noSpin) {
    const decel = MU_SPIN
    const newWy = wy - Math.sign(wy) * decel * dt
    wy = wy * newWy > 0 ? newWy : 0
  }

  const newSpeed = Math.sqrt(vx * vx + vz * vz)
  if (newSpeed < VELOCITY_THRESHOLD &&
      Math.abs(wx) < OMEGA_THRESHOLD &&
      Math.abs(wy) < OMEGA_THRESHOLD &&
      Math.abs(wz) < OMEGA_THRESHOLD) {
    return null
  }

  return {
    position: [ball.position[0] + vx * dt, ball.position[1], ball.position[2] + vz * dt],
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
