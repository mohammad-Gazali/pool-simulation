# Pool Simulation

Stack: React 19 + Vite 8 + TypeScript 6 + Three.js via `@react-three/fiber` + `@react-three/drei`.

## Commands

| Command | What it does |
|---------|-------------|
| `bun dev` | Dev server with HMR |
| `bun build` | `tsc -b && vite build` — run both **before considering PR-ready** |
| `bun lint` | ESLint on `.` |

## Architecture

- `src/constants/index.ts` — shared constants
- `src/models/` — individual 3D components
- `src/groups/` — composed scene objects
- `src/app.tsx` — root: Canvas, lighting, scene assembly

## Scene layout

- Table group at `y=-0.5`, felt surface at world `y=-0.44` (`-0.5 + 0.05 + 0.01`)
- Balls group at `y=-0.44`; cue ball at `[-1.0, BALL_RADIUS, 0]` local → `[-1.0, -0.40, 0]` world
- Cue at `[-1.75, -0.40, 0]`, tip points +X toward cue ball with 0.02 gap at ball center height; built along local Y axis with rotation `[0, 0, -PI/2]`

## Conventions

- 3D components use `group` wrappers, accept `position`/`rotation` props when reusable
- Use `meshStandardMaterial` (roughness, metalness, envMapIntensity) — see `Ball.tsx` for reference
- TypeScript: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly` — unused imports/exports are errors
