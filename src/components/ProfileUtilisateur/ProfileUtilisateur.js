import React, { useEffect, useState } from 'react'
import './ProfileUtilisateur.css'
import { useParams } from 'react-router-dom'
import { Navbar, Container } from '../index'
import { Footer } from '../../Sections/index'
import { useNavigate, Link } from 'react-router-dom'
import Axios from 'axios'

const ProfileUtilisateur = () => {
    const [pseudoU, setPseudoU] = useState("")
    const [myUser, setMyUser] = useState([{}])
    const { pseudo } = useParams();
    const navigate = useNavigate()
    const fetchProfileUtilisateur = async () => {
        const pseudoUser = window.localStorage.getItem("pseudo")
        if (pseudoUser) {
            await Axios.get(`http://127.0.0.1:8000/api/ReturnUtilisateur/${pseudoUser}/`)
                .then((response) => setMyUser(response.data))
                .catch((err) => console.log(err))
        }
    }
    const checkUserLoggedIn = () => {
        const loggedInUser = window.localStorage.getItem("LoggedIn")
        if (!loggedInUser) {
            navigate('/')
        }
    }
    const routeToHistorique = () => {
        navigate('/historique-message')
    }
    useEffect(() => {
        checkUserLoggedIn()
    }, [])
    useEffect(() => {
        fetchProfileUtilisateur()
    }, [])

    return (
        <>
            <Navbar />
            <Container>
                <div className='profile-utilisateur'>
                    <div className='info-perso'>
                        <h2>Info Personel</h2>
                        <div className='info-perso-content'>
                            <h5>pseudo : {myUser[0].pseudo}</h5>
                            <h5>Prenom : {myUser[0].prenom}</h5>
                            <h5>Password : {myUser[0].password}</h5>
                            <h5>Email : {myUser[0].email}</h5>
                        </div>
                    </div>
                    <div className='ma-consomation'>
                        <h2>Ma Consommation</h2>
                        <h5>{myUser[0].nbr_sc / 60} mins Consommation</h5>
                    </div>
                    <div className='historique-tchat'>
                        <h2>Historique Tchat</h2>
                        <h5><span onClick={routeToHistorique}>Historique Tchat</span></h5>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default ProfileUtilisateur