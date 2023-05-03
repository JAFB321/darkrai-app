import { Dosis } from "./Dosis"
import { Medicamento } from "./Medicamento"
import { Tratamiento } from "./Tratamiento"

export interface PlanMedicacion {
    id: number
    
    tratamientoId: number

    medicamentoId: number

    cantidadTotal: number

    fechaInicio: string

    fechaFin: string

    cantidadDosis: number

    intervaloHoras: number

    activo: boolean

    tratamiento?: Tratamiento

    medicamento?: Medicamento

    dosis?: Dosis[]

    // extra
    progresoDosis: number
}

