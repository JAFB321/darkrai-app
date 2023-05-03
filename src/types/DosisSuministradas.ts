import { Dosis } from "./Dosis"
import { Enfermero } from "./Enfermero"


export interface DosisSuministradas {

    id: number

    dosisOriginalId: number

    enfermeroId: number

    cantidad: number

    fechaSuministracion: Date

    dosisOriginal?: Dosis

    enfermero?: Enfermero

}
