import React from 'react'
import { useAuthAdmin } from '../authAdmin'
import { Navigate } from 'react-router-dom'

const RequierdSignIn = ({ children }) => {
    const authAdmin = useAuthAdmin()
    if (!authAdmin.pseudo_admin) {
        return <Navigate to='/admin' />
    }
    return children
}

export default RequierdSignIn