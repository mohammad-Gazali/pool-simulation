import { useCallback, useEffect, useRef } from "react"
import { ContactPicker } from "./contact-picker"
import { PowerGauge } from "./power-gauge"
import { AimAngleSlider } from "./aim-angle-slider"
import { computeCueStrike } from "../physics/cue-strike"
import { usePhysicsStore } from "../stores/physics-store"
import { useCueControlStore } from "../stores/cue-control-store"

const TWO_PI = 2 * Math.PI

export const GameHud = () => {
  const power = useCueControlStore(s => s.power)
  const aimAngle = useCueControlStore(s => s.aimAngle)
  const contactOffsetX = useCueControlStore(s => s.contactOffsetX)
  const contactOffsetY = useCueControlStore(s => s.contactOffsetY)
  const setAimAngle = useCueControlStore(s => s.setAimAngle)

  const strikeCueBall = usePhysicsStore(s => s.strikeCueBall)

  const aimAngleRef = useRef(aimAngle)

  useEffect(() => {
    aimAngleRef.current = aimAngle
  }, [aimAngle])

  const handleHit = useCallback(() => {
    const result = computeCueStrike(power, [contactOffsetX, contactOffsetY], aimAngle)
    strikeCueBall(result.velocity, result.angularVelocity);
  }, [power, contactOffsetX, contactOffsetY, aimAngle, strikeCueBall])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 0.01 : 0.05
      if (e.key === "ArrowLeft") {
        aimAngleRef.current = ((aimAngleRef.current + step) % TWO_PI + TWO_PI) % TWO_PI
        setAimAngle(aimAngleRef.current)
      } else if (e.key === "ArrowRight") {
        aimAngleRef.current = ((aimAngleRef.current - step) % TWO_PI + TWO_PI) % TWO_PI
        setAimAngle(aimAngleRef.current)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [setAimAngle])

  return (
    <div className="absolute inset-0 pointer-events-none flex justify-end items-center p-6">
      <div className="pointer-events-auto flex flex-col items-center gap-[18px] bg-black/60 border border-white/10 rounded-xl p-5 backdrop-blur">
        <div className="text-[#666] text-[10px] font-semibold tracking-[2px] uppercase select-none">
          CONTROLS
        </div>
        <div className="flex items-center gap-7">
          <ContactPicker />
          <PowerGauge />
        </div>
        <AimAngleSlider />
        <button
          className="w-full py-[10px] border-none rounded-lg text-sm font-bold tracking-[2px] uppercase cursor-pointer bg-[#cc3333] text-white transition-[background,opacity] duration-150 enabled:hover:bg-[#ee4444] disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={power <= 0}
          onClick={handleHit}
        >
          HIT
        </button>
      </div>
    </div>
  )
}
