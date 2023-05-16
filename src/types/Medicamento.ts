import { PlanMedicacion } from "./PlanMedicacion"

export interface Medicamento {
    id: number
    nombre: string
    lote: number
    caducidad: string
    concentrado: number
    planesMedicacion?: PlanMedicacion[]
}
