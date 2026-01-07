import { Outlet, Link } from "react-router";

export default function Dashboard() {
    return (
        <div className='flex'>
            <nav className='border w-70 h-screen'>
                <div>
                    <label>Main</label>
                    <ul>
                        <Link to='/'>Home</Link>
                        <Link to='dashboard/logout'>Logout</Link>
                    </ul>
                </div>
                <div>
                    <label htmlFor="">Affiliation</label>
                    <ul>
                        <Link to='dashboard/profile'>Member Profile</Link>
                    </ul>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
}

