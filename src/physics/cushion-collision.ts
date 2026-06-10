import { BALL_RADIUS } from "../constants"
import { MU_SLIDING, E_BALL_CUSHION } from "./constants"

// ─── Table felt boundaries ───────────────────────────────────────────────
// Derived from billiard-table.tsx: TABLE_WIDTH=2.74, TABLE_HEIGHT=1.37, FELT_OFFSET=0.09
const FELT_EDGE_X = 1.28
const FELT_EDGE_Z = 0.595

// ─── Cushion face normals (pointing from cushion toward ball) ──────────
interface Cushion {
  axis: 0 | 2        // 0=x, 2=z
  sign: 1 | -1       // direction of the face normal
}

const CUSHIONS: Cushion[] = [
  { axis: 0, sign: 1 },   // right:  +x, normal (1,0,0)
  { axis: 0, sign: -1 },  // left:   -x, normal (-1,0,0)
  { axis: 2, sign: 1 },   // top:    +z, normal (0,0,1)
  { axis: 2, sign: -1 },  // bottom: -z, normal (0,0,-1)
]

interface CollisionResult {
  velocity: [number, number, number]
  angularVelocity: [number, number, number]
}

function reflectCushion(
  v: [number, number, number],
  ω: [number, number, number],
  normal: [number, number, number],
): CollisionResult {
  const [vx, vy, vz] = v
  let [wx, wy, wz] = ω
  const [nx, ny, nz] = normal

  // Normal component of velocity (into the cushion)
  const vn = vx * nx + vy * ny + vz * nz
  if (vn <= 0) return { velocity: v, angularVelocity: ω }

  // Tangential velocity vector (perpendicular to normal)
  const tx = vx - vn * nx
  const ty = vy - vn * ny
  const tz = vz - vn * nz
  const vtMag = Math.sqrt(tx * tx + ty * ty + tz * tz)

  // Reflect normal component with restitution
  const vnNew = -E_BALL_CUSHION * vn

  // Coulomb friction on the tangential component
  const maxFrictionImpulse = MU_SLIDING * (1 + E_BALL_CUSHION) * vn
  const vtScale = vtMag < 1e-9 ? 1 : Math.max(0, 1 - maxFrictionImpulse / vtMag)

  // New velocity = reflected normal + scaled tangential
  const newVx = vnNew * nx + tx * vtScale
  const newVy = vnNew * ny + ty * vtScale
  const newVz = vnNew * nz + tz * vtScale

  // Angular velocity change from the tangential friction impulse
  // Δv_tangential = (vtScale - 1) * (tx, ty, tz)
  const dvx = (vtScale - 1) * tx
  const dvy = (vtScale - 1) * ty
  const dvz = (vtScale - 1) * tz

  // Torque: τ = r × J_t where r = R·n̂ and J_t = m·Δv_t
  // Δω = τ / I = (5/(2·R)) · (n̂ × Δv_t)
  const crossX = ny * dvz - nz * dvy
  const crossY = nz * dvx - nx * dvz
  const crossZ = nx * dvy - ny * dvx
  const factor = 5 / (2 * BALL_RADIUS)
  wx += factor * crossX
  wy += factor * crossY
  wz += factor * crossZ

  return {
    velocity: [newVx, newVy, newVz],
    angularVelocity: [wx, wy, wz],
  }
}

interface BallData {
  position: [number, number, number]
  velocity: [number, number, number]
  angularVelocity: [number, number, number]
}

export function handleCushionCollisions(ball: BallData): BallData | null {
  const { position } = ball
  let { velocity, angularVelocity } = ball
  let [x, , z] = position

  let hit = false

  for (const { axis, sign } of CUSHIONS) {
    const boundary = axis === 0 ? sign * FELT_EDGE_X : sign * FELT_EDGE_Z
    const pos = axis === 0 ? x : z
    const vel = axis === 0 ? velocity[0] : velocity[2]

    // Check if ball center crossed the cushion boundary (minus ball radius)
    const limitPos = boundary - sign * BALL_RADIUS
    const pastEdge = sign * pos > sign * limitPos
    const movingToward = sign * vel > 0

    if (pastEdge && movingToward) {
      const normal: [number, number, number] =
        axis === 0 ? [sign, 0, 0] : [0, 0, sign]

      const result = reflectCushion(velocity, angularVelocity, normal)
      velocity = result.velocity
      angularVelocity = result.angularVelocity

      // Clamp position to boundary
      if (axis === 0) x = limitPos
      else z = limitPos

      hit = true
    }
  }

  if (!hit) return null

  return {
    position: [x, position[1], z],
    velocity,
    angularVelocity,
  }
}
