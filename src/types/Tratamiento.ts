import { Paciente } from "./Paciente"
import { PlanMedicacion } from "./PlanMedicacion"

export interface Tratamiento {

    id: number

    nombre: string

    pacienteId: number

    planesMedicacion?: PlanMedicacion[]

    paciente?: Paciente

}
