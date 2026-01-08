import '../styles/index.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router'
import { UserAuth } from './context/AuthContext';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {session, initialized, signInUser, signInUserWithGoogle } = UserAuth();
    const Navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const result = await signInUser(email, password);
            if (result.success) { 
                toast.success('Login successful!');
                setTimeout(() => {
                    Navigate('/dashboard/home');
                }, 1000);
            }
            if (result.error) {
                toast.dismiss();
                toast.error(result.error.message)   
            }
        }
        catch (err) {
            console.error('Login error:', err);
            toast.error('An unexpected error occurred during login.');
        }
    }

    const handleGoogleLogin = async (e) => {
        e.preventDefault()
        try {
            await signInUserWithGoogle()
        }
        catch (err) {
            console.error('login error', err)
        }
    }

    useEffect(() => {
        if (session) {
            setTimeout(() => {
                Navigate('/dashboard/home');
            }, 1000)
        }
    }, [session]);

    useEffect(() => {
        if (!initialized) {
            toast.loading('loading...', { toastId: 'auth' });
        } 
        else {
            toast.dismiss('auth');
        }
    }, [initialized]);
    
    return (
        <>
        <div className='w-screen h-screen flex justify-center items-center'>
            <form onSubmit={(e) => handleLogin(e)} className='card justify-center items-center'>
                <h2>Hello acmem!</h2>
                <div className='flex flex-col'>
                    <input
                        type="text"
                        placeholder='email'
                        value={email}
                        className='border-black border'
                        onChange={((e) => {
                            toast.dismiss();
                            setEmail(e.target.value)
                        })}/>
                </div>
                <div className='flex flex-col'>
                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        className='border-black border'
                        onChange={(e) => {
                            toast.dismiss();
                            setPassword(e.target.value)
                        }}/>
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
                <button 
                    onClick={handleGoogleLogin}
                    className='border border-black'>continue with google </button>   

            </form>
        </div>
        </>
    )
}

export default Login;