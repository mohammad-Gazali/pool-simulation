import * as Slider from "@radix-ui/react-slider"
import { useCueControlStore } from "../stores/cue-control-store"

export const PowerGauge = () => {
  const power = useCueControlStore((s) => s.power)
  const setPower = useCueControlStore((s) => s.setPower)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-[#888] text-[10px] font-semibold tracking-[1.5px] uppercase select-none text-center">
        POWER
      </div>
      <Slider.Root
        className="flex relative items-center select-none touch-none w-5 h-[120px] flex-col"
        value={[power]}
        min={0}
        max={1}
        step={0.01}
        orientation="vertical"
        onValueChange={([v]) => setPower(v)}
      >
        <Slider.Track className="relative flex-1 w-1 bg-white/10 rounded-full overflow-hidden">
          <Slider.Range className="absolute w-full bottom-0 bg-[#ff4444] rounded-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-[#ff4444] rounded-full cursor-pointer shadow-[0_0_6px_rgba(255,68,68,0.4)] transition-shadow duration-150 hover:shadow-[0_0_12px_rgba(255,68,68,0.6)] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(255,68,68,0.3)]" />
      </Slider.Root>
      <div className="text-[#aaa] text-xs font-semibold font-mono select-none">
        {Math.round(power * 100)}%
      </div>
    </div>
  )
}
