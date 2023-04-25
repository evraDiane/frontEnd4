import React from 'react'
import './DashbordAdmin.css'
import {useNavigate , Link , Outlet} from 'react-router-dom';
import {useAuthAdmin} from '../authAdmin'
import {Container} from '../../../components/index'
const DashbordAdmin = () => {
    const authAdmin = useAuthAdmin()
    const navigate = useNavigate()
    const handleLogOut = () => {
        authAdmin.logout()
        navigate('/admin')
    }
return (
    <>
        <nav className='dashbord-nav-bar'>
            <Container>
                <Link to='home'>Home</Link>
                <Link to='createEmploye'>Create Employe</Link>
                <button onClick={handleLogOut}>LogOut</button>
            </Container>
        </nav>
        <Outlet />
    </>
)
}

export default DashbordAdmin