import { Ball } from "../models/ball"
import { usePhysicsStore } from "../stores/physics-store"

export const BallsGroup = () => {
  const balls = usePhysicsStore(s => s.balls);

  return (
    <group position={[0, -0.44, 0]}>
      {Object.values(balls).map((state) => (
        <Ball
          key={`rack-${state.config.number}`}
          state={state}
        />
      ))}
    </group>
  )
}
