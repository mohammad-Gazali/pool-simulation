import { useMemo } from "react";
import { Ball } from "../models/ball";
import { BALL_RADIUS } from "../constants";

interface RackBall {
  position: [number, number, number];
  color: string;
}

export const BallsGroup = () => {
  const rackBalls: RackBall[] = useMemo(() => {
    const balls: RackBall[] = [];
    let colorIdx = 0;
    const dx = BALL_RADIUS * 2 * Math.cos(Math.PI / 6);
    const dz = BALL_RADIUS * 2;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col <= row; col++) {
        balls.push({
          position: [0.5 + row * dx, BALL_RADIUS, (col - row / 2) * dz],
          color: BALLS_COLORS[colorIdx++],
        });
      }
    }
    return balls;
  }, []);

  return (
    <group position={[0, -0.44, 0]}>
      {rackBalls.map((b, i) => (
        <Ball
          key={`rack-${i}`}
          position={b.position}
          color={b.color}
          radius={BALL_RADIUS}
        />
      ))}
      <Ball position={[-1.0, BALL_RADIUS, 0]} color="#ffffff" radius={BALL_RADIUS} />
    </group>
  );
};

const BALLS_COLORS = [
  "#f7c815",
  "#e63946",
  "#1d3557",
  "#f4a261",
  "#2a9d8f",
  "#e9c46a",
  "#264653",
  "#e76f51",
  "#81b29a",
  "#f2cc8f",
  "#9b5de5",
  "#f15bb5",
  "#00f5d4",
  "#fee440",
  "#00bbf9",
];
