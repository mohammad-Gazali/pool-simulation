import { create } from "zustand"
import { BALL_RADIUS } from "../constants"
import type { BallState } from "../types/ball-state"

interface PhysicsState {
  balls: Record<number, BallState>
  cuePosition: [number, number, number]
}

interface PhysicsActions {
  setBallState: (id: number, state: Partial<BallState>) => void
  setCuePosition: (position: PhysicsState["cuePosition"]) => void
  strikeCueBall: (velocity: [number, number, number], angularVelocity: [number, number, number]) => void
  reset: () => void
}

type PhysicsStore = PhysicsState & PhysicsActions;

const BALLS_CONFIG: BallState["config"][] = [
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

const buildInitialBalls = () => {
  const balls: Record<number, BallState> = {
    0: {
      position: [-1.0, BALL_RADIUS, 0],
      velocity: [0, 0, 0],
      angularVelocity: [0, 0, 0],
      config: BALLS_CONFIG[0],
    },
  }

  let idx = 1
  const dx = BALL_RADIUS * 2 * Math.cos(Math.PI / 6)
  const dz = BALL_RADIUS * 2

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col <= row; col++) {
      balls[idx] = {
        position: [0.5 + row * dx, BALL_RADIUS, (col - row / 2) * dz],
        velocity: [0, 0, 0],
        angularVelocity: [0, 0, 0],
        config: BALLS_CONFIG[idx],
      }
      idx++
    }
  }

  return balls
}

export const usePhysicsStore = create<PhysicsStore>((set) => ({
  balls: buildInitialBalls(),
  cuePosition: [-1.75, BALL_RADIUS, 0],

  setBallState: (id, state) =>
    set((prev) => ({
      balls: {
        ...prev.balls,
        [id]: { ...prev.balls[id], ...state },
      },
    })),

  setCuePosition: (position) => set({ cuePosition: position }),

  strikeCueBall: (velocity, angularVelocity) =>
    set((prev) => ({
      balls: {
        ...prev.balls,
        0: { ...prev.balls[0], velocity, angularVelocity },
      },
    })),

  reset: () =>
    set({
      balls: buildInitialBalls(),
      cuePosition: [-1.75, BALL_RADIUS, 0],
    }),
}))
