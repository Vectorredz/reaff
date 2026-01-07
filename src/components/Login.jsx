import '../styles/index.css'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router'
import { auth } from './firebase.js'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault()
        try { 
            await signInWithEmailAndPassword(auth, email, password);
            console.log('signed-in succesfully');
            navigate('/dashboard');
            toast.success('Logged in successfully!', {
                position: "top-center",
            });
        }
        catch (error) {
            console.log(error.message)
            toast.error(error.message, {
                position: "top-center"
            })

        }
    }

 
    return (
        <>
        <div className='w-screen h-screen flex justify-center items-center'>
            <form onSubmit={(e) => handleLogin(e)} className='card justify-center items-center'>
                <h2>Hello acmem!</h2>
                <div className='flex flex-col'>
                    <label>Student Number</label>
                    <input
                        type="text"
                        value={email}
                        className='border-black border'
                        onChange={((e) => setEmail(e.target.value))}/>
                </div>
                <div className='flex flex-col'>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        className='border-black border'
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button 
                    type='submit'
                    className='border-black border'>
                        Sign in
                </button>
                <p>
                    Not yet affiliated with ACM? <Link to='/signup'>Signup</Link>
                </p>
                <hr className='w-full my-4'/>     
                <button className='border border-black'>continue with google </button>   

            </form>
        </div>
        </>
    )
}

export default Login;