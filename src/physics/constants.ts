// ─── PHYSICS.MD constants (real-world values, SI units) ────────────────────
// Ball — Section 2
export const PHYSICS_BALL_DIAMETER = 0.05715  // 2.25 inches
export const PHYSICS_BALL_RADIUS = PHYSICS_BALL_DIAMETER / 2
export const BALL_MASS = 0.17  // 170 g

// Moment of inertia I = (2/5)·m·R² (Section 2)
export const BALL_MOI_FACTOR = 2 / 5

// Friction — Section 2
export const MU_ROLLING = 0.01       // μ_r: 0.005–0.015
export const MU_SLIDING = 0.2        // μ_s: normal conditions
export const MU_SPIN = 10            // spin deceleration (rad/s²), Section 3
export const MU_BALL_BALL = 0.05     // μ_bb: 0.03–0.08
export const MU_TIP = 0.6            // cue-tip to ball

// Restitution — Section 2
export const E_TIP = 0.73            // cue-tip: 0.71–0.75
export const E_BALL_BALL = 0.95      // ball-ball: 0.92–0.98
export const E_BALL_CUSHION = 0.75   // ball-cushion: 0.6–0.9
export const E_BALL_SURFACE = 0.6    // ball-surface: 0.5–0.7

// Cue — Section 2 / Section 6
export const CUE_MASS_RATIO = 0.5    // m_cue / m_ball

// Other
export const GRAVITY = 9.81          // m/s²

// ─── Scene geometry ────────────────────────────────────────────────────────
// The 3D scene uses slightly different dimensions for visual appeal.
// Ball is rendered at SCENE_BALL_RADIUS instead of the real PHYSICS_BALL_RADIUS.
// All scene positions, velocities, etc. use scene units.
export const SCENE_BALL_RADIUS = 0.04

export const PHYSICS_TO_SCENE = SCENE_BALL_RADIUS / PHYSICS_BALL_RADIUS
export const SCENE_TO_PHYSICS = PHYSICS_BALL_RADIUS / SCENE_BALL_RADIUS

// ─── Presentation constants (shared with cushions) ─────────────────────────
export const CUSHION_ANGLE = Math.PI / 3
export const SIN_CUSHION = Math.sin(CUSHION_ANGLE)
export const COS_CUSHION = Math.cos(CUSHION_ANGLE)

export const CUSHION_CONTACT_HEIGHT = PHYSICS_BALL_RADIUS * (1 + SIN_CUSHION)

// ─── Simulation thresholds ─────────────────────────────────────────────────
export const VELOCITY_THRESHOLD = 0.001
export const OMEGA_THRESHOLD = 0.01
export const MAX_CUE_SPEED = 5
