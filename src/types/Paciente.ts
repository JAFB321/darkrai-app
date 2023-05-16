import { Tratamiento } from "./Tratamiento"

export interface Paciente {
    id: number
    nombre: string
    edad?: number
    genero?: string
    peso?: number
    altura?: number
    contactoEmergencia?: string
    noSeguridadSocial?: string
    tratamientos?: Tratamiento[]
}
