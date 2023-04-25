import React from 'react'
import { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [pseudo_admin, setPseudo_admin] = useState(null)

    const login = (pseudo_admin) => {
        setPseudo_admin(pseudo_admin)
    }
    const logout = (pseudo_admin) => {
        setPseudo_admin(null)
    }
    return <AuthContext.Provider value={{ pseudo_admin, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuthAdmin = () => {
    return useContext(AuthContext)
}