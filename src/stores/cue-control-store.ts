import { create } from "zustand"

interface CueControlState {
  power: number;
  contactOffsetX: number
  contactOffsetY: number
  aimAngle: number
}

interface CueControlActions {
  setPower: (power: CueControlState["power"]) => void
  setContactOffsetX: (contactOffsetX: CueControlState["contactOffsetX"]) => void
  setContactOffsetY: (contactOffsetY: CueControlState["contactOffsetY"]) => void
  setAimAngle: (aimAngle: CueControlState["aimAngle"]) => void
}

type CueControlStore = CueControlState & CueControlActions;

export const useCueControlStore = create<CueControlStore>((set) => ({
  power: 0.3,
  contactOffsetX: 0,
  contactOffsetY: 0,
  aimAngle: 0,

  setPower: power => set({ power }),
  setContactOffsetX: contactOffsetX => set({ contactOffsetX }),
  setContactOffsetY: contactOffsetY => set({ contactOffsetY }),
  setAimAngle: aimAngle => set({ aimAngle }),
}));
