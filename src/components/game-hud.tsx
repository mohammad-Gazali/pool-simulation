import { useCallback, useEffect, useRef } from "react"
import { ContactPicker } from "./contact-picker"
import { PowerGauge } from "./power-gauge"
import { computeCueStrike } from "../physics/cue-strike"
import { usePhysicsStore } from "../stores/physics-store"
import { useCueControlStore } from "../stores/cue-control-store"

export const GameHud = () => {
  const power = useCueControlStore(s => s.power);
  const aimAngle = useCueControlStore(s => s.aimAngle);
  const contactOffsetX = useCueControlStore(s => s.contactOffsetX);
  const contactOffsetY = useCueControlStore(s => s.contactOffsetY);
  const setAimAngle = useCueControlStore(s => s.setAimAngle);

  const strike = usePhysicsStore(s => s.strike);

  const aimAngleRef = useRef(aimAngle);

  const handleHit = useCallback(() => {
    const result = computeCueStrike(power, [contactOffsetX, contactOffsetY], aimAngle)
    strike(0, result.velocity, result.angularVelocity)
  }, [power, contactOffsetX, contactOffsetY, aimAngle, strike])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 0.01 : 0.05
      if (e.key === "ArrowLeft") {
        aimAngleRef.current += step;
      } else if (e.key === "ArrowRight") {
        aimAngleRef.current -= step;
      }

      setAimAngle(aimAngleRef.current);
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [setAimAngle])

  return (
    <div className="ui-overlay">
      <div className="ui-controls">
        <div className="ui-controls-header">CONTROLS</div>
        <div className="ui-controls-body">
          <ContactPicker />
          <PowerGauge />
        </div>
        <button
          className="hit-button"
          disabled={power <= 0}
          onClick={handleHit}
        >
          HIT
        </button>
      </div>
    </div>
  )
}
