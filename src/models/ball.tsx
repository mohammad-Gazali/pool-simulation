interface BallProps {
  position: [number, number, number]
  color: string
  radius: number
}

export const Ball = ({ position, color, radius }: BallProps) => {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.25}
        metalness={0.1}
        envMapIntensity={0.5}
      />
    </mesh>
  )
}
