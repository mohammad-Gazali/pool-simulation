import { useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { BilliardTable } from "./models/billiard-table"
import { BallsGroup } from "./groups/balls-group"
import { CueControl } from "./groups/cue-control"
import { GameHud } from "./components/game-hud"

export const App = () => {
  const [power, setPower] = useState(0.3)
  const [contactOffset, setContactOffset] = useState<[number, number]>([0, 0])
  const [aimAngle, setAimAngle] = useState(0)

  return (
    <main style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
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

          <BilliardTable />
          <BallsGroup />
          <CueControl power={power} contactOffset={contactOffset} aimAngle={aimAngle} />
          <OrbitControls
            makeDefault
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI / 2.2}
            maxDistance={5}
            enableZoom={false}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      <GameHud
        power={power}
        contactOffset={contactOffset}
        aimAngle={aimAngle}
        onPowerChange={setPower}
        onContactOffsetChange={setContactOffset}
        onAimAngleChange={setAimAngle}
      />
    </main>
  )
}
