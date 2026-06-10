export interface BallState {
  position: [number, number, number]
  velocity: [number, number, number]
  angularVelocity: [number, number, number]
  config: BallConfig
}

interface BallConfig {
  number: number
  color: string
  isStripe: boolean
}
