import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { BilliardTable } from "./models/billiard-table"
import { BallsGroup } from "./groups/balls-group"
import { CueControl } from "./groups/cue-control"
import { GameHud } from "./components/game-hud"
import { PhysicsLoop } from "./physics/simulation"

export const App = () => {
  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], fov: 45, near: 0.1, far: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <spotLight
            position={[0, 4, 0]}
            intensity={1.5}
            angle={0.6}
            penumbra={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight position={[-2, 2, 2]} intensity={0.5} />

          <color attach="background" args={["#1a1a1a"]} />
          <fog attach="fog" args={["#1a1a1a", 5, 15]} />

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.9, 0]}
            receiveShadow
          >
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial color="#111" />
          </mesh>

          <BilliardTable hidePockets />
          <BallsGroup />
          <CueControl />
          <PhysicsLoop />
          <OrbitControls
            makeDefault
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={0.5}
            maxDistance={5}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      <GameHud />
    </main>
  )
}
