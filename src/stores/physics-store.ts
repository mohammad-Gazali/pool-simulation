import { create } from "zustand"
import { BALL_RADIUS } from "../constants"

export interface BallState {
  position: [number, number, number]
  velocity: [number, number, number]
  angularVelocity: [number, number, number]
}

interface PhysicsStore {
  balls: Record<number, BallState>
  cuePosition: [number, number, number]
  setBallState: (id: number, state: Partial<BallState>) => void
  setCuePosition: (position: [number, number, number]) => void
  reset: () => void
}

const buildInitialBalls = () => {
  const balls: Record<number, BallState> = {
    0: {
      position: [-1.0, BALL_RADIUS, 0],
      velocity: [0, 0, 0],
      angularVelocity: [0, 0, 0],
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

  reset: () =>
    set({
      balls: buildInitialBalls(),
      cuePosition: [-1.75, BALL_RADIUS, 0],
    }),
}))
