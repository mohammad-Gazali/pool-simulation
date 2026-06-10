import { useRef, useCallback, useEffect } from "react";
import { CONTACT_RADIUS } from "../constants";
import { useCueControlStore } from "../stores/cue-control-store";

const PICKER_RADIUS = 50;

export const ContactPicker = () => {
  const contactOffsetX = useCueControlStore((s) => s.contactOffsetX);
  const contactOffsetY = useCueControlStore((s) => s.contactOffsetY);
  const setContactOffsetX = useCueControlStore((s) => s.setContactOffsetX);
  const setContactOffsetY = useCueControlStore((s) => s.setContactOffsetY);

  const ref = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const toBallOffset = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      const el = ref.current;
      if (!el) return [0, 0];
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (clientX - cx) / PICKER_RADIUS;
      const dy = (clientY - cy) / PICKER_RADIUS;
      const len = Math.sqrt(dx * dx + dy * dy);
      const clamped = len > 1 ? [dx / len, dy / len] : [dx, dy];
      return [clamped[0] * CONTACT_RADIUS, -clamped[1] * CONTACT_RADIUS];
    },
    [],
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    const [x, y] = toBallOffset(e.clientX, e.clientY);
    setContactOffsetX(x);
    setContactOffsetY(y);
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (draggingRef.current) {
      const [x, y] = toBallOffset(e.clientX, e.clientY);
      setContactOffsetX(x);
      setContactOffsetY(y);
    }
  }, [toBallOffset, setContactOffsetX, setContactOffsetY]);

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  const dotX = PICKER_RADIUS * (contactOffsetX / CONTACT_RADIUS);
  const dotY = -PICKER_RADIUS * (contactOffsetY / CONTACT_RADIUS);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-[#888] text-[10px] font-semibold tracking-[1.5px] uppercase select-none text-center">
        CONTACT
      </div>
      <div
        ref={ref}
        className="relative w-[100px] h-[100px] rounded-full bg-white/[0.06] border border-white/15 cursor-pointer group"
        onPointerDown={handlePointerDown}
        style={{ touchAction: "none" }}
      >
        <div className="absolute left-1/2 top-1/2 w-1/2 h-1/2 rounded-full border border-white/[0.08] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute left-1/2 top-[10%] w-px h-4/5 -translate-x-1/2 bg-white/10" />
        <div className="absolute top-1/2 left-[10%] h-px w-4/5 -translate-y-1/2 bg-white/10" />
        <div
          className="absolute w-3 h-3 rounded-full bg-[#ff4444] -translate-x-1/2 -translate-y-1/2 transition-[background] duration-150 shadow-[0_0_6px_rgba(255,68,68,0.5)] group-hover:bg-[#ff6666]"
          style={{
            left: `calc(50% + ${dotX}px)`,
            top: `calc(50% + ${dotY}px)`,
          }}
        />
      </div>
    </div>
  );
};
