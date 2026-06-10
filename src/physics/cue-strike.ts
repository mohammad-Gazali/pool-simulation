import { BALL_RADIUS } from "../constants"
import { BALL_MASS, CUE_MASS_RATIO, MAX_CUE_SPEED, E_TIP } from "./constants"

export interface CueStrikeResult {
  velocity: [number, number, number]
  angularVelocity: [number, number, number]
}

export function computeCueStrike(
  power: number,
  contactOffset: [number, number],
  aimAngle: number,
): CueStrikeResult {
  const [a, b] = contactOffset
  const vCue = power * MAX_CUE_SPEED

  const denom = 1 + 1 / CUE_MASS_RATIO + (5 / 2) * (a * a + b * b) / (BALL_RADIUS * BALL_RADIUS)
  const Jn = (1 + E_TIP) * BALL_MASS * vCue / denom

  const ux = Math.cos(aimAngle)
  const uz = Math.sin(aimAngle)
  const perpX = -Math.sin(aimAngle)
  const perpZ = Math.cos(aimAngle)

  const depth = Math.sqrt(Math.max(0, BALL_RADIUS * BALL_RADIUS - a * a - b * b))
  const rx = -ux * depth + perpX * a
  const ry = b
  const rz = -uz * depth + perpZ * a

  const vx = (Jn / BALL_MASS) * ux
  const vz = (Jn / BALL_MASS) * uz

  const crossX = ry * uz - rz * 0
  const crossY = rz * ux - rx * uz
  const crossZ = rx * 0 - ry * ux

  const factor = (5 * Jn) / (2 * BALL_MASS * BALL_RADIUS * BALL_RADIUS)
  const wx = factor * crossX
  const wy = factor * crossY
  const wz = factor * crossZ

  return {
    velocity: [vx, 0, vz],
    angularVelocity: [wx, wy, wz],
  }
}
