const TABLE_WIDTH = 2.74;
const TABLE_HIEGHT = 1.37;
const TABLE_THICKNESS = 0.1;
const TABLE_COLOR = "#3a2818";

const FELT_THICKNESS = 0.01;
const FELT_COLOR = "#1e5c3a";

const CUSHION_HEIGHT = 0.08;
const CUSHION_WIDTH = 0.08;
const CUSHION_COLOR = "#2a1a0f";

const CORNER_THICKNESS = 0.4;

export const BilliardTable = () => {
  const thickness = 0.01;

  const pocketPositions: [number, number][] = [
    [-TABLE_WIDTH / 2, -TABLE_HIEGHT / 2],
    [TABLE_WIDTH / 2, -TABLE_HIEGHT / 2],
    [-TABLE_WIDTH / 2, TABLE_HIEGHT / 2],
    [TABLE_WIDTH / 2, TABLE_HIEGHT / 2],
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
            TABLE_HIEGHT + CORNER_THICKNESS,
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
              z * (TABLE_HIEGHT / 2 + 0.1),
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
            TABLE_WIDTH - 2 * CUSHION_WIDTH,
            FELT_THICKNESS,
            TABLE_HIEGHT - 2 * CUSHION_WIDTH,
          ]}
        />
        <meshStandardMaterial color={FELT_COLOR} roughness={0.9} />
      </mesh>

      {/* Cushions / Rails */}
      <mesh
        position={[0, CUSHION_HEIGHT / 2, TABLE_HIEGHT / 2 - CUSHION_WIDTH / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[TABLE_WIDTH, CUSHION_HEIGHT, CUSHION_WIDTH]} />
        <meshStandardMaterial color={CUSHION_COLOR} />
      </mesh>
      <mesh
        position={[
          0,
          CUSHION_HEIGHT / 2,
          -TABLE_HIEGHT / 2 + CUSHION_WIDTH / 2,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[TABLE_WIDTH, CUSHION_HEIGHT, CUSHION_WIDTH]} />
        <meshStandardMaterial color={CUSHION_COLOR} />
      </mesh>
      <mesh
        position={[TABLE_WIDTH / 2 - CUSHION_WIDTH / 2, CUSHION_HEIGHT / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[CUSHION_WIDTH, CUSHION_HEIGHT, TABLE_HIEGHT]} />
        <meshStandardMaterial color={CUSHION_COLOR} />
      </mesh>
      <mesh
        position={[-TABLE_WIDTH / 2 + CUSHION_WIDTH / 2, CUSHION_HEIGHT / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[CUSHION_WIDTH, CUSHION_HEIGHT, TABLE_HIEGHT]} />
        <meshStandardMaterial color={CUSHION_COLOR} />
      </mesh>

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
