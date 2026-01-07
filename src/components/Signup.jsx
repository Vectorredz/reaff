import '../styles/index.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

// mock single page for the register form

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user)
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: email,
                    password: password
                })
            }
        }
        catch(error) {
            console.log(error.message)
        }
    }
    

    return (
        <>
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <div>
                <h1>ACM Affiliation Form</h1>
            </div>
            <div>
                <ul className='flex gap-5'>
                    <li>Personal details</li>
                    <li>Commitments</li>
                    <li>Committee Concerns</li>
                    <li>Payment</li>
                </ul>
            </div>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="">email</label>
                    <input 
                        type="email"
                        value={email}
                        className='border'
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="">password</label>
                    <input 
                        type="password"
                        value={password}
                        className='border'
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button 
                    type='submit'>
                    Signup
                </button>
            </form>
        </div>

      
             
        </>
    )
}

export default Signup;