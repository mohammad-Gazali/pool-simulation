import { useMemo } from "react"
import * as THREE from "three"
import { CUSHION_ANGLE } from "../physics/constants"

const TABLE_WIDTH = 2.74;
const TABLE_HEIGHT = 1.37;
const TABLE_THICKNESS = 0.1;
const TABLE_COLOR = "#3a2818";

const FELT_THICKNESS = 0.01;
const FELT_COLOR = "#1e5c3a";
const FELT_OFFSET = 0.09;

const CUSHION_HEIGHT = 0.10;
const CUSHION_WIDTH = 0.09;
const CUSHION_COLOR = "#2a1a0f";

const CORNER_THICKNESS = 0.4;

const halfBottom = CUSHION_WIDTH / 2
const halfTop = halfBottom - CUSHION_HEIGHT / Math.tan(CUSHION_ANGLE)

function createCushionShape() {
  const shape = new THREE.Shape()
  shape.moveTo(halfTop, 0)
  shape.lineTo(-halfBottom, 0)
  shape.lineTo(-halfBottom, CUSHION_HEIGHT)
  shape.lineTo(halfBottom, CUSHION_HEIGHT)
  shape.closePath()
  return shape
}

function useCushionGeometry(length: number) {
  return useMemo(() => {
    const shape = createCushionShape()
    return new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false })
  }, [length])
}

function CushionRail({ length, position, rotation }: { length: number; position: [number, number, number]; rotation: [number, number, number] }) {
  const geometry = useCushionGeometry(length)
  return (
    <mesh geometry={geometry} position={position} rotation={rotation} castShadow receiveShadow>
      <meshStandardMaterial color={CUSHION_COLOR} />
    </mesh>
  )
}

export const BilliardTable = () => {
  const thickness = 0.01;

  const pocketPositions: [number, number][] = [
    [-TABLE_WIDTH / 2, -TABLE_HEIGHT / 2],
    [TABLE_WIDTH / 2, -TABLE_HEIGHT / 2],
    [-TABLE_WIDTH / 2, TABLE_HEIGHT / 2],
    [TABLE_WIDTH / 2, TABLE_HEIGHT / 2],
    [-TABLE_WIDTH / 2, 0],
    [TABLE_WIDTH / 2, 0],
  ];

  return (
    <group position={[0, -0.5, 0]}>
      {/* Table Base */}
      <mesh receiveShadow>
        <boxGeometry
          args={[
            TABLE_WIDTH + CORNER_THICKNESS,
            TABLE_THICKNESS,
            TABLE_HEIGHT + CORNER_THICKNESS,
          ]}
        />
        <meshStandardMaterial color={TABLE_COLOR} roughness={0} />
      </mesh>

      {/* Legs */}
      {[-1, 1].map((x) =>
        [-1, 1].map((z) => (
          <mesh
            key={`${x}${z}`}
            position={[
              x * (TABLE_WIDTH / 2 + 0.1),
              -0.4,
              z * (TABLE_HEIGHT / 2 + 0.1),
            ]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.05, 0.05, 0.8]} />
            <meshStandardMaterial color={TABLE_COLOR} roughness={0} />
          </mesh>
        )),
      )}

      {/* Felt Surface */}
      <mesh position={[0, FELT_THICKNESS + 0.05, 0]} receiveShadow>
        <boxGeometry
          args={[
            TABLE_WIDTH - 2 * FELT_OFFSET,
            FELT_THICKNESS,
            TABLE_HEIGHT - 2 * FELT_OFFSET,
          ]}
        />
        <meshStandardMaterial color={FELT_COLOR} roughness={0.9} />
      </mesh>

      {/* Cushions / Rails — trapezoid cross-section
           Shape XY = across × vertical, extrude along +Z.
           After rotation: shape X maps to local Z (top/bottom) or local X (left/right).
           Inner face (shape +X) always faces the table center.
           Inner edge bottom is flush with felt edge. */}
      {/* Top (runs along +X at +Z edge, inner face toward -Z) */}
      <CushionRail
        length={TABLE_WIDTH}
        position={[-TABLE_WIDTH / 2, 0.02, TABLE_HEIGHT / 2 - 0.1]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Bottom (runs along +X at -Z edge, inner face toward +Z) */}
      <CushionRail
        length={TABLE_WIDTH}
        position={[TABLE_WIDTH / 2, 0.02, -TABLE_HEIGHT / 2 + 0.1]}
        rotation={[0, -Math.PI / 2, 0]}
      />

      {/* Left (runs along +Z at -X edge, inner face toward +X) */}
      <CushionRail
        length={TABLE_HEIGHT}
        position={[-TABLE_WIDTH / 2 + FELT_OFFSET - halfBottom + 0.02, 0.02, -TABLE_HEIGHT / 2]}
        rotation={[0, 0, 0]}
      />

      {/* Right (runs along -Z at +X edge, inner face toward -X) */}
      <CushionRail
        length={TABLE_HEIGHT}
        position={[TABLE_WIDTH / 2 - FELT_OFFSET + halfBottom - 0.02, 0.02, TABLE_HEIGHT / 2]}
        rotation={[0, Math.PI, 0]}
      />

      {/* Pockets */}
      {pocketPositions.map(([x, z], i) => (
        <mesh key={i} position={[x, thickness / 2 - 0.01, z]}>
          <cylinderGeometry args={[0.065, 0.055, 0.1, 32]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
      ))}
    </group>
  );
};
