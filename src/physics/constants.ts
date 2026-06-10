// ─── Physics constants (application units) ──────────────────────────────────
// These are tuned to the 3D scene scale. BALL_RADIUS matches the visual
// sphere radius in Three.js units; all derived values use this as the unit.
export const BALL_RADIUS = 0.04
export const BALL_MASS = 0.17

export const MU_ROLLING = 0.01
export const MU_SLIDING = 0.2
export const MU_SPIN = 10
export const MU_BALL_BALL = 0.05
export const MU_TIP = 0.6

export const E_TIP = 0.73
export const E_BALL_BALL = 0.95
export const E_BALL_CUSHION = 0.75
export const E_BALL_SURFACE = 0.6

export const CUE_MASS_RATIO = 0.5

export const GRAVITY = 9.81

// ─── Cushion geometry ──────────────────────────────────────────────────────
export const CUSHION_ANGLE = Math.PI / 3
export const SIN_CUSHION = Math.sin(CUSHION_ANGLE)
export const COS_CUSHION = Math.cos(CUSHION_ANGLE)

export const CUSHION_CONTACT_HEIGHT = BALL_RADIUS * (1 + SIN_CUSHION)

// ─── Simulation thresholds ─────────────────────────────────────────────────
export const VELOCITY_THRESHOLD = 0.001
export const OMEGA_THRESHOLD = 0.01
export const MAX_CUE_SPEED = 5
