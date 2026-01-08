import React from 'react'
import { UserAuth } from './context/AuthContext'
import Login from './Login';
import { Navigate } from 'react-router'

const PrivateRoute = ({children}) => {
    const { session } = UserAuth();

    if (session === undefined) {
        return <></>
    }
    return (
        <>
            {session ? children : <Navigate to='/login'></Navigate>}
        </>
    )
}

export default PrivateRoute