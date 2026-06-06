interface PowerGaugeProps {
  power: number
  onChange: (power: number) => void
}

export const PowerGauge = ({ power, onChange }: PowerGaugeProps) => {
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
          onChange={(e) => onChange(Number(e.target.value))}
          className="power-slider"
        />
      </div>
      <div className="power-value">{Math.round(power * 100)}%</div>
    </div>
  )
}
