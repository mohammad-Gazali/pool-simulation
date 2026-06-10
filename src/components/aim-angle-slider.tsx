import * as Slider from "@radix-ui/react-slider"
import { useCueControlStore } from "../stores/cue-control-store"

const RAD_TO_DEG = 180 / Math.PI
const TWO_PI = 2 * Math.PI

export const AimAngleSlider = () => {
  const aimAngle = useCueControlStore(s => s.aimAngle)
  const setAimAngle = useCueControlStore(s => s.setAimAngle)

  const degrees = ((aimAngle % TWO_PI) + TWO_PI) % TWO_PI * RAD_TO_DEG
  const displayDeg = Math.round(degrees)

  return (
    <div className="aim-slider-wrapper">
      <div className="aim-slider-header">
        <span className="aim-slider-label">AIM</span>
        <span className="aim-slider-value">{displayDeg}°</span>
      </div>
      <Slider.Root
        className="slider-root slider-root-h"
        value={[((aimAngle % TWO_PI) + TWO_PI) % TWO_PI]}
        min={0}
        max={TWO_PI}
        step={0.01}
        onValueChange={([v]) => setAimAngle(v)}
      >
        <Slider.Track className="slider-track">
          <Slider.Range className="slider-range" />
        </Slider.Track>
        <Slider.Thumb className="slider-thumb" />
      </Slider.Root>
    </div>
  )
}
