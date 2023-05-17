"use client"

import {createContext} from 'react'
const AuthContext = createContext <{ isAdmin: boolean, setIsAdmin: (isAdmin: boolean) => void }> ({ isAdmin: false, setIsAdmin(isAdmin) {}, })

export default AuthContext