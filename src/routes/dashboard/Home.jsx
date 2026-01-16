import { UserAuth } from '../../contexts/AuthContext.jsx'

export default function Home() {
    const { session, signUpNewUser, signInUser, signOutUser  } = UserAuth()
    return (
        <div>
            <div>
                <h1>Member Homepage for {session?.user?.email}</h1>
            </div>
        </div>
    )
}