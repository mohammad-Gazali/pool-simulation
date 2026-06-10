import { BALL_RADIUS, E_BALL_BALL } from "./constants"

interface BallData {
  position: [number, number, number]
  velocity: [number, number, number]
  angularVelocity: [number, number, number]
}

export function handleBallCollisions(
  balls: Record<number, BallData>,
): Map<number, Partial<BallData>> {
  const fixes = new Map<number, Partial<BallData>>()
  const ids = Object.keys(balls).map(Number)

  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const idA = ids[i], idB = ids[j]

      function getField(id: number, key: keyof BallData): [number, number, number] {
        return (fixes.get(id)?.[key] ?? balls[id][key]) as [number, number, number]
      }

      const posA = getField(idA, "position")
      const posB = getField(idB, "position")
      const velA = getField(idA, "velocity")
      const velB = getField(idB, "velocity")

      const dx = posA[0] - posB[0]
      const dz = posA[2] - posB[2]
      const distSq = dx * dx + dz * dz
      const minDist = 2 * BALL_RADIUS
      const minDistSq = minDist * minDist

      if (distSq >= minDistSq || distSq < 1e-10) continue

      const dist = Math.sqrt(distSq)
      const nx = dx / dist
      const nz = dz / dist

      const relVx = velA[0] - velB[0]
      const relVz = velA[2] - velB[2]
      const relVn = relVx * nx + relVz * nz

      const factor = relVn < 0 ? ((1 + E_BALL_BALL) / 2) * relVn : 0
      const overlap = minDist - dist
      const sep = overlap / 2

      // ── Build ball A update ──────────────────────────────────────────
      const newPosA: [number, number, number] = [posA[0] + sep * nx, posA[1], posA[2] + sep * nz]
      const newVelA: [number, number, number] = [velA[0] - factor * nx, 0, velA[2] - factor * nz]
      const newAngA: [number, number, number] = [...getField(idA, "angularVelocity")]

      fixes.set(idA, {
        position: newPosA,
        velocity: newVelA,
        angularVelocity: newAngA,
      })

      // ── Build ball B update ──────────────────────────────────────────
      const newPosB: [number, number, number] = [posB[0] - sep * nx, posB[1], posB[2] - sep * nz]
      const newVelB: [number, number, number] = [velB[0] + factor * nx, 0, velB[2] + factor * nz]
      const newAngB: [number, number, number] = [...getField(idB, "angularVelocity")]

      fixes.set(idB, {
        position: newPosB,
        velocity: newVelB,
        angularVelocity: newAngB,
      })
    }
  }

  return fixes
}
