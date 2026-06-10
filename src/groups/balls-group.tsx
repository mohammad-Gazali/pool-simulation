import { Ball } from "../models/ball"

const BALLS_CONFIG = [
  { number: 0, color: "#ffffff", isStripe: false },
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

const BALL_IDS = Array.from({ length: 16 }, (_, i) => i)

export const BallsGroup = () => (
  <group position={[0, -0.44, 0]}>
    {BALL_IDS.map((id) => (
      <Ball key={`ball-${id}`} id={id} config={BALLS_CONFIG[id]} />
    ))}
  </group>
)
