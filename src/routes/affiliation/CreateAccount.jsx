import { useOutletContext } from "react-router";


export default function CreateAccount() {
    const { setEmail, setPassword } = useOutletContext()
    const handleEmail = (e) => {
        const email = e.target.value
        setEmail(email)
    }
    const handlePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }
   
    
    return (
        <div className='form-frame'>
            <div className="form">
            <h1>Create An Account</h1>
            <p>We are almost done! Please create an account to view to finally finish the registration</p>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email:</label>
                <input
                    className='text-field'
                    placeholder='Enter your email'
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleEmail}/>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="password">Password</label>
                <input
                    className='text-field'
                    placeholder='Enter your password'
                    type="password"
                    name="password"
                    id="password"
                    onChange={handlePassword}/>
            </div>
            <button
                className='btn-primary'>Create Account</button>
            </div>
        </div>
    );
}
