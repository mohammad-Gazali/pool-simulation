import { useRef, useCallback, useEffect } from "react"
import { CONTACT_RADIUS } from "../constants"

const PICKER_RADIUS = 50

interface ContactPickerProps {
  offset: [number, number]
  onChange: (offset: [number, number]) => void
}

export const ContactPicker = ({ offset, onChange }: ContactPickerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const toBallOffset = useCallback((clientX: number, clientY: number): [number, number] => {
    const el = ref.current
    if (!el) return [0, 0]
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (clientX - cx) / PICKER_RADIUS
    const dy = (clientY - cy) / PICKER_RADIUS
    const len = Math.sqrt(dx * dx + dy * dy)
    const clamped = len > 1 ? [dx / len, dy / len] : [dx, dy]
    return [clamped[0] * CONTACT_RADIUS, -clamped[1] * CONTACT_RADIUS]
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    draggingRef.current = true
    onChange(toBallOffset(e.clientX, e.clientY))
  }, [onChange, toBallOffset])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (draggingRef.current) {
      onChange(toBallOffset(e.clientX, e.clientY))
    }
  }, [onChange, toBallOffset])

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false
  }, [])

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  const dotX = PICKER_RADIUS * (offset[0] / CONTACT_RADIUS)
  const dotY = -PICKER_RADIUS * (offset[1] / CONTACT_RADIUS)

  return (
    <div className="contact-picker-wrapper">
      <div className="contact-picker-label">CONTACT</div>
      <div
        ref={ref}
        className="contact-picker"
        onPointerDown={handlePointerDown}
        style={{ touchAction: "none" }}
      >
        <div className="contact-boundary" />
        <div className="contact-guide-v" />
        <div className="contact-guide-h" />
        <div
          className="contact-dot"
          style={{
            left: `calc(50% + ${dotX}px)`,
            top: `calc(50% + ${dotY}px)`,
          }}
        />
      </div>
    </div>
  )
}
