const TIP_LENGTH = 0.015
const FERRULE_LENGTH = 0.025
const SHAFT_LENGTH = 0.7
const JOINT_LENGTH = 0.025
const WRAP_LENGTH = 0.15
const BUTT_LENGTH = 0.45
const BUMPER_LENGTH = 0.025

const TIP_RADIUS = 0.005
const FERRULE_RADIUS = 0.007
const SHAFT_START_RADIUS = 0.007
const SHAFT_END_RADIUS = 0.015
const JOINT_RADIUS = 0.017
const WRAP_RADIUS = 0.021
const BUTT_START_RADIUS = 0.017
const BUTT_END_RADIUS = 0.028
const BUMPER_RADIUS = 0.028

const TOTAL_LENGTH = TIP_LENGTH + FERRULE_LENGTH + SHAFT_LENGTH + JOINT_LENGTH + WRAP_LENGTH + BUTT_LENGTH + BUMPER_LENGTH

const half = TOTAL_LENGTH / 2

const ferruleCenter = half - TIP_LENGTH - FERRULE_LENGTH / 2
const shaftCenter = half - TIP_LENGTH - FERRULE_LENGTH - SHAFT_LENGTH / 2
const jointCenter = half - TIP_LENGTH - FERRULE_LENGTH - SHAFT_LENGTH - JOINT_LENGTH / 2
const wrapCenter = half - TIP_LENGTH - FERRULE_LENGTH - SHAFT_LENGTH - JOINT_LENGTH - WRAP_LENGTH / 2
const buttCenter = half - TIP_LENGTH - FERRULE_LENGTH - SHAFT_LENGTH - JOINT_LENGTH - WRAP_LENGTH - BUTT_LENGTH / 2
const bumperCenter = half - TIP_LENGTH - FERRULE_LENGTH - SHAFT_LENGTH - JOINT_LENGTH - WRAP_LENGTH - BUTT_LENGTH - BUMPER_LENGTH / 2

interface CueProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export const Cue = ({
  position = [-1.6875, -0.36, 0],
  rotation = [0, 0, -Math.PI / 2],
}: CueProps) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Tip */}
      <mesh position={[0, ferruleCenter + FERRULE_LENGTH / 2 + TIP_RADIUS, 0]}>
        <sphereGeometry args={[TIP_RADIUS, 12, 8]} />
        <meshStandardMaterial color="#3a7bd5" roughness={0.6} />
      </mesh>

      {/* Ferrule */}
      <mesh position={[0, ferruleCenter, 0]}>
        <cylinderGeometry args={[FERRULE_RADIUS, FERRULE_RADIUS, FERRULE_LENGTH, 16]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.2} />
      </mesh>

      {/* Shaft */}
      <mesh position={[0, shaftCenter, 0]}>
        <cylinderGeometry args={[SHAFT_START_RADIUS, SHAFT_END_RADIUS, SHAFT_LENGTH, 20]} />
        <meshStandardMaterial color="#d4b896" roughness={0.5} />
      </mesh>

      {/* Joint */}
      <mesh position={[0, jointCenter, 0]}>
        <cylinderGeometry args={[JOINT_RADIUS, JOINT_RADIUS, JOINT_LENGTH, 20]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Wrap */}
      <mesh position={[0, wrapCenter, 0]}>
        <cylinderGeometry args={[WRAP_RADIUS, WRAP_RADIUS, WRAP_LENGTH, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Butt */}
      <mesh position={[0, buttCenter, 0]}>
        <cylinderGeometry args={[BUTT_START_RADIUS, BUTT_END_RADIUS, BUTT_LENGTH, 20]} />
        <meshStandardMaterial color="#3a2818" roughness={0.4} />
      </mesh>

      {/* Bumper */}
      <mesh position={[0, bumperCenter, 0]}>
        <cylinderGeometry args={[BUMPER_RADIUS, BUMPER_RADIUS * 0.85, BUMPER_LENGTH, 20]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
    </group>
  )
}
