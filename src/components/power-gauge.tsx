import { useCueControlStore } from "../stores/cue-control-store";

export const PowerGauge = () => {
  const power = useCueControlStore((s) => s.power);
  const setPower = useCueControlStore((s) => s.setPower);

  return (
    <div className="power-gauge-wrapper">
      <div className="power-label">POWER</div>
      <div className="power-gauge">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={power}
          onChange={(e) => setPower(Number(e.target.value))}
          className="power-slider"
        />
      </div>
      <div className="power-value">{Math.round(power * 100)}%</div>
    </div>
  );
};
