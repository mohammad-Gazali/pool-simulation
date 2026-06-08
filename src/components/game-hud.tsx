import { useEffect, useRef } from "react"
import { ContactPicker } from "./contact-picker"
import { PowerGauge } from "./power-gauge"

interface GameHudProps {
  power: number
  contactOffset: [number, number]
  aimAngle: number
  onPowerChange: (power: number) => void
  onContactOffsetChange: (offset: [number, number]) => void
  onAimAngleChange: (angle: number) => void
  onHit: () => void
}

export const GameHud = ({
  power,
  contactOffset,
  aimAngle,
  onPowerChange,
  onContactOffsetChange,
  onAimAngleChange,
  onHit,
}: GameHudProps) => {
  const aimAngleRef = useRef(aimAngle)
  aimAngleRef.current = aimAngle

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 0.01 : 0.05
      if (e.key === "ArrowLeft") {
        onAimAngleChange(aimAngleRef.current + step)
      } else if (e.key === "ArrowRight") {
        onAimAngleChange(aimAngleRef.current - step)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onAimAngleChange])

  return (
    <div className="ui-overlay">
      <div className="ui-controls">
        <div className="ui-controls-header">CONTROLS</div>
        <div className="ui-controls-body">
          <ContactPicker offset={contactOffset} onChange={onContactOffsetChange} />
          <PowerGauge power={power} onChange={onPowerChange} />
        </div>
        <button
          className="hit-button"
          disabled={power <= 0}
          onClick={onHit}
        >
          HIT
        </button>
      </div>
    </div>
  )
}
