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
    <div className="w-full flex flex-col gap-[6px]">
      <div className="flex justify-between items-center">
        <span className="text-[#888] text-[10px] font-semibold tracking-[1.5px] uppercase select-none">
          AIM
        </span>
        <span className="text-[#ccc] text-xs font-semibold font-mono select-none">
          {displayDeg}°
        </span>
      </div>
      <Slider.Root
        className="flex relative items-center select-none touch-none w-full h-5"
        value={[((aimAngle % TWO_PI) + TWO_PI) % TWO_PI]}
        min={0}
        max={TWO_PI}
        step={0.01}
        onValueChange={([v]) => setAimAngle(v)}
      >
        <Slider.Track className="relative flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
          <Slider.Range className="absolute h-full bg-[#ff4444] rounded-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-[#ff4444] rounded-full cursor-pointer shadow-[0_0_6px_rgba(255,68,68,0.4)] transition-shadow duration-150 hover:shadow-[0_0_12px_rgba(255,68,68,0.6)] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(255,68,68,0.3)]" />
      </Slider.Root>
    </div>
  )
}
