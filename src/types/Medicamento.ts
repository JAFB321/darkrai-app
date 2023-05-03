import { PlanMedicacion } from "./PlanMedicacion"

export interface Medicamento {

    id: number

    nombre: string

    concentrado: number

    planesMedicacion?: PlanMedicacion[]

}
