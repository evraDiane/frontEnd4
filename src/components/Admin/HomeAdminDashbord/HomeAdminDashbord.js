import React from 'react'
import './HomeAdminDashBord.css'
import { useAuthAdmin } from '../authAdmin'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../../../components/index'
import { FaUserCheck } from 'react-icons/fa'
import { ImUserTie } from 'react-icons/im'
const HomeAdminDashbord = () => {
    const authAdmin = useAuthAdmin()
    const navigate = useNavigate();
    const handleCreateEmployeRoute = () => {
        navigate('/admin/dashbord/createEmploye')
    }
    const iconStyle = {
        color: 'rgba(0,0,0,0.5)',
        fontSize: '70',
    }
    return (
        <div className='home-dashbord'>
            <Container>
                <h1>Home Page Admin Dashbord</h1>
                <div className='home-dashbord-header'>
                    <div className='home-dashbord-header-content'>
                        <h1>Welcome back {authAdmin.pseudo_admin}</h1>
                        <h3>Create Your Employes Or See The News Of Client</h3>
                        <div className='home-dashbord-links'>
                            <a onClick={handleCreateEmployeRoute}>Create Employe</a>
                            <Link to='/'>Home Website</Link>
                        </div>
                    </div>
                </div>
                <div className='home-dashbord-items'>
                    <div className='home-dashbord-client'>
                        <div className='home-dashbord-client-content'>
                            <div className='title'>
                                <h4>150</h4>
                                <h5>Client Submiting</h5>
                            </div>
                            <FaUserCheck style={iconStyle} />
                        </div>
                    </div>
                    <div className='home-dashbord-employe'>
                        <div className='home-dashbord-employe-content'>
                            <div className='title'>
                                <h4>130</h4>
                                <h5>Employe Working</h5>
                            </div>
                            <ImUserTie style={iconStyle} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HomeAdminDashbord