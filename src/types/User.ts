import { Enfermero } from "./Enfermero"

export type UserRoles = 'paciente' | 'enfermero' | 'admin'

export interface User {
    id?: number
    nombre: string
    username: string
    password?: string
    rol: UserRoles
    enfermero?: Enfermero
}
