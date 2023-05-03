import { Enfermero } from "./Enfermero"
import { PlanMedicacion } from "./PlanMedicacion"

export interface Dosis {

    id?: number

    planMedicacionId?: number

    fecha: string

    cantidad: number

    suministrado: boolean

    cantidadSuministrada?: number

    fechaSuministracion?: Date

    enfermeroSuministracionId?: number

    planMedicacion?: PlanMedicacion

    enfermeroSuministracion?: Enfermero
}
