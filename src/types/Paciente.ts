import { Tratamiento } from "./Tratamiento"

export interface Paciente {

    id: number

    nombre: string

    tratamientos?: Tratamiento[]
}
