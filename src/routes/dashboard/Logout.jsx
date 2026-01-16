import { useState } from 'react'
import { UserAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'


export default function Logout() {
    const {session, signUpNewUser, signInUser, signOutUser } = UserAuth();
    const Navigate = useNavigate();

    const handleLogout = async () => {
        console.log('test');
        try {
            const result = await signOutUser()
            if (result.success) {
                toast.dismiss()
                toast.success('Logout successful!')
                Navigate('/login');
            }
        }
        catch(error) {
            toast.dismiss()
            toast.error(error.mess)
        }
    }




    return (
        <button
            onClick={handleLogout}>
            logout
        </button>
    )
}