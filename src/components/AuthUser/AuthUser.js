import React from 'react'
import { createContext, useState, useContext } from 'react'

const AuthUserContext = createContext(null)

export const AuthUserProvider = ({ children }) => {
    const [pseudoUser, setPseudoUser] = useState("")

    const loginUser = (pseudoUser) => {
        setPseudoUser(pseudoUser)
    }
    const logoutUser = (pseudoUser) => {
        setPseudoUser(null)
    }
    return <AuthUserContext.Provider value={{ pseudoUser, loginUser, logoutUser }}>{children}</AuthUserContext.Provider>
}
export const useAuthUser = () => {
    return useContext(AuthUserContext)
}