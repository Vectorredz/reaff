import { createContext, useState, useEffect, useContext } from 'react'
import { toast } from "react-toastify"
import { supabase } from '../../supabaseClient.jsx'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);
    // Signup 
    const signUpNewUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signUp( {
                email: email,
                password: password
            })
            if (error) console.error('sign-up error occurred', error);
            return { success: true, data }
        }
        catch (error) {
            console.error('an unexpected error occured', error);
           return { success: false, error }
        }
    };

    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword( {
                email: email,
                password: password
            })
            if (error) {
                console.error('sign-in error occurred:', error);
                return { success: false, error }
            }
            return { success: true, data }
        }
        catch (error) {
            console.error('an unexpected error occurred:', error);
            return { success: false, error }
        }
    };

    useEffect(() => {
        // gets the session from the database and returns the data of it once resolve
        supabase.auth.getSession().then(( { data: {session}}) => {
            setSession(session)
         })
        // every time auth changes (new login detected); queue for rerendering the new data
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)

        })
    }, []);

    // Sign out
    const signOutUser = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return {success: true}
        }        
        catch(error) {
            toast(error.message)
            return {success:false, error}
        }
    }

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOutUser  }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => { 
    return useContext(AuthContext)
}