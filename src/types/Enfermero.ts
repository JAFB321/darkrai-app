import { Dosis } from "./Dosis"
import { DosisSuministradas } from "./DosisSuministradas"
import { User } from "./User"

export interface Enfermero {
    id: number
    nombre: string
    userId: string
    dosis?: Dosis
    user?: User
}
