# Pool Simulation

Stack: React 19 + Vite 8 + TypeScript 6 + Tailwind CSS v4 + Three.js via `@react-three/fiber` + `@react-three/drei`.

## Commands

| Command | What it does |
|---------|-------------|
| `bun dev` | Dev server with HMR |
| `bun build` | `tsc -b && vite build` — run both **before considering PR-ready** |
| `bun lint` | ESLint on `.` |

## Architecture

- `src/types/ball-state.ts` — shared `BallState` interface (`position`, `velocity`, `angularVelocity`, `config`) and `BallConfig` (`number`, `color`, `isStripe`)
- `src/stores/physics-store.ts` — zustand store bridging physics → presentation: `Record<number, BallState>` (0=cue, 1–15=rack), `cuePosition`. Contains `BALLS_CONFIG` array + `buildInitialBalls()` for rack layout. Actions: `setBallState`, `setCuePosition`, `strike`, `reset`
- `src/stores/cue-control-store.ts` — separate zustand store for cue UI state: `power`, `contactOffsetX/Y`, `aimAngle`. Actions: `setPower`, `setContactOffsetX/Y`, `setAimAngle`
- `src/physics/` — simulation engine (equations, collision detection, motion integration).
  - `constants.ts` — all physics constants in a single scene-unit system (no conversion factors). `BALL_RADIUS=0.04`, `GRAVITY=9.81`, friction coefficients (μ_r=0.01, μ_s=0.2, μ_spin=10), restitution, cushion angle/trig, thresholds. `OMEGA_THRESHOLD = VELOCITY_THRESHOLD / BALL_RADIUS` for dimensional consistency with the rolling constraint (`ω = v/R`). `src/constants/index.ts` re-exports `BALL_RADIUS` and cushion trig for presentation code.
  - `cue-strike.ts` — `computeCueStrike()` implements the Section 6 J_n impulse formula: normal impulse from cue-ball contact, resulting linear and angular velocity
  - `simulation.ts` — `PhysicsLoop` component (useFrame + fixed-timestep 120 Hz accumulator) runs `stepBall()` per ball. State machine follows PHYSICS.md Section 3: rest → spinning (ω_y only) → rolling-with-slip (μ_s) → rolling-without-slip (μ_r). Contains a `STICTION_BAND` threshold — forward Euler in the slipping state creates a limit cycle when relSpeed < (7/2)·μ_s·g·dt because a single timestep overshoots zero; STICTION_BAND force-enters the rolling state when relSpeed enters this irresolvable band. Vector-based stopping check returns null (no store update) only when all of speed, |wx|, |wy|, |wz| are below thresholds. Uses `GRAVITY` directly (no conversion). Accesses zustand state via `store.getState()` to avoid hook subscription re-renders
- `src/models/` — individual 3D components. `Ball` takes `id` + `config` (not full state), reads position/angularVelocity from the store via `useFrame` each tick and updates mesh position + rotation imperatively, avoiding React re-renders on physics frames
- `src/groups/` — composed scene objects.
  - `CueControl` — takes no props, reads power/contactOffsets/aimAngle from `useCueControlStore`. Cue stick always visible, frozen at strike position when ball moves; aim line, contact ring, contact dot hidden while ball is moving
  - `BallsGroup` — static component (no store subscription), renders 16 `Ball` components from a local `BALLS_CONFIG` array. Ball visual configs (`BallConfig`, `BALLS_CONFIG`) live here
- `src/components/` — 2D React UI overlay components (contact-picker, power-gauge, aim-angle-slider, game-hud). GameHud controls are grouped in a single panel (semi-transparent box, right side of screen): ContactPicker (left) + PowerGauge (right) side-by-side, with an AimAngleSlider (horizontal, with degree readout) below, and a HIT button at the bottom. HIT button is disabled when `power <= 0`. Keyboard aim (←/→, Shift for fine step) handled inside GameHud. GameHud takes no props, reads/writes `useCueControlStore`. Uses `@radix-ui/react-slider` for all sliders. All styles use Tailwind CSS v4 utility classes via `@tailwindcss/vite` plugin; no custom CSS files.
- `src/app.tsx` — root: Canvas, lighting, scene assembly. `<CueControl />` and `<GameHud />` take no props; contains `<PhysicsLoop>`

## Scene layout

- Table group at `y=-0.5`, felt surface at world `y=-0.44` (`-0.5 + 0.05 + 0.01`)
- Balls group at `y=-0.44`; cue ball at `[-1.0, BALL_RADIUS, 0]` local → `[-1.0, -0.40, 0]` world
- Cue at `[-1.75, -0.40, 0]`, tip points +X toward cue ball with 0.02 gap at ball center height; built along local Y axis with rotation `[0, 0, -PI/2]`
- Camera: `OrbitControls` with `minDistance={0.5}`, `maxDistance={5}`, polar angle clamped 0.2–π/2.2; zoom enabled
- Cushions: right-trapezoid cross-section via `ExtrudeGeometry`, two 90° at outer face, 60° inner face (`CUSHION_ANGLE`). Each rail's inner edge bottom aligns with the felt boundary; rails extend to the adjacent cushion's outer edge so corners form a closed rectangle. Overlap per side = `CUSHION_BOTTOM_WIDTH = halfBottom + halfTop`. `CUSHION_ANGLE` imported directly from `physics/constants.ts` (not re-export path)
- Pockets: 4 corner + 2 side (along long edges), `cylinderGeometry` dark holes inset to 90% of felt edge. Corner radius 0.11, side radius 0.1, Y offset `+0.006` above surface to sit within carpet.

## Conventions

- 3D components use `group` wrappers, accept `position`/`rotation` props when reusable
- Use `meshStandardMaterial` (roughness, metalness, envMapIntensity) — see `Ball.tsx` for reference
- TypeScript: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly` — unused imports/exports are errors
- **All styling must use Tailwind CSS v4 utility classes.** No custom CSS files or `<style>` tags. The only exceptions are values that depend on JavaScript at runtime (e.g., dynamically computed `left`/`top` on the contact dot), which may use the `style` prop.

## Agent Behavior
- Update AGENTS.md with any meaningful architectural, UI, or behavioral changes you make — don't wait to be asked
- Keep the "Architecture" section synced with new components, props, and data flow
- Update "Scene layout" when 3D positioning or camera setup changes

## Important References
We use the file PHYSICS.md in the project root for references about the physics that we used inside this project
