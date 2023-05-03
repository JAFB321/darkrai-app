import { Medicamento } from "./Medicamento"

export interface Contenedor {
    id?: number
    motor: number
    pasoActual: number
    pasosTotal: number
    medicamentoId?: number
    medicamento?: Medicamento
}
