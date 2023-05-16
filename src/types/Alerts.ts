import { Dosis } from "./Dosis"

export type AlertType = '5-min' | '10-min' | 'last-10-min'
export type Alert = { type: AlertType, dosis: Dosis, minutes: number } 