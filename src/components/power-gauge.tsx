import * as Slider from "@radix-ui/react-slider"
import { useCueControlStore } from "../stores/cue-control-store"

export const PowerGauge = () => {
  const power = useCueControlStore((s) => s.power)
  const setPower = useCueControlStore((s) => s.setPower)

  return (
    <div className="power-gauge-wrapper">
      <div className="power-label">POWER</div>
      <Slider.Root
        className="slider-root slider-root-v"
        value={[power]}
        min={0}
        max={1}
        step={0.01}
        orientation="vertical"
        onValueChange={([v]) => setPower(v)}
      >
        <Slider.Track className="slider-track-v">
          <Slider.Range className="slider-range-v" />
        </Slider.Track>
        <Slider.Thumb className="slider-thumb" />
      </Slider.Root>
      <div className="power-value">{Math.round(power * 100)}%</div>
    </div>
  )
}
