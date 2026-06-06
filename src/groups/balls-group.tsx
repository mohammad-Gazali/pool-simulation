import { useMemo } from "react"
import { Ball } from "../models/ball"
import type { BallConfig } from "../models/ball"
import { BALL_RADIUS } from "../constants"

const BALLS_CONFIG: BallConfig[] = [
  { number: 1, color: "#f7c815", isStripe: false },
  { number: 2, color: "#1d3557", isStripe: false },
  { number: 3, color: "#e63946", isStripe: false },
  { number: 4, color: "#7b2d8e", isStripe: false },
  { number: 5, color: "#f4a261", isStripe: false },
  { number: 6, color: "#2a9d8f", isStripe: false },
  { number: 7, color: "#8b1a1a", isStripe: false },
  { number: 8, color: "#111111", isStripe: false },
  { number: 9, color: "#f7c815", isStripe: true },
  { number: 10, color: "#1d3557", isStripe: true },
  { number: 11, color: "#e63946", isStripe: true },
  { number: 12, color: "#7b2d8e", isStripe: true },
  { number: 13, color: "#f4a261", isStripe: true },
  { number: 14, color: "#2a9d8f", isStripe: true },
  { number: 15, color: "#8b1a1a", isStripe: true },
]

const CUE_BALL: BallConfig = { number: 0, color: "#ffffff", isStripe: false }

interface RackBall {
  position: [number, number, number]
  config: BallConfig
}

export const BallsGroup = () => {
  const rackBalls: RackBall[] = useMemo(() => {
    const balls: RackBall[] = []
    let idx = 0
    const dx = BALL_RADIUS * 2 * Math.cos(Math.PI / 6)
    const dz = BALL_RADIUS * 2

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col <= row; col++) {
        balls.push({
          position: [0.5 + row * dx, BALL_RADIUS, (col - row / 2) * dz],
          config: BALLS_CONFIG[idx++],
        })
      }
    }
    return balls
  }, [])

  return (
    <group position={[0, -0.44, 0]}>
      {rackBalls.map((b, i) => (
        <Ball
          key={`rack-${i}`}
          position={b.position}
          config={b.config}
          radius={BALL_RADIUS}
        />
      ))}
      <Ball
        position={[-1.0, BALL_RADIUS, 0]}
        config={CUE_BALL}
        radius={BALL_RADIUS}
      />
    </group>
  )
}
