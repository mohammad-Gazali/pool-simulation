import { BALL_RADIUS } from "../constants"

export const CUSHION_ANGLE = Math.PI / 3
export const SIN_CUSHION = Math.sin(CUSHION_ANGLE)
export const COS_CUSHION = Math.cos(CUSHION_ANGLE)

export const CUSHION_CONTACT_HEIGHT = BALL_RADIUS * (1 + SIN_CUSHION)
