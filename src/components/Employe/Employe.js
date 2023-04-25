import React, { useEffect, useState } from 'react'
import './Employe.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CreateAcountPopUp } from '../../components/index'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Employe = () => {
    const user = useSelector((state) => state.user)
    const [emp, setEmp] = useState("")
    const navigate = useNavigate()
    const [loginUser, setLoginUser] = useState(false)
    useEffect(() => {
        const loggedInUser = localStorage.getItem("LoggedIn")
        if (loggedInUser !== null) {
            const found = JSON.parse(loggedInUser)
            setLoginUser(found)
        } else {
            setLoginUser(false)
        }
    }, [user.login])
    const verification = () => {
        const pseudoUser = window.localStorage.getItem("pseudo")
        if (pseudoUser) {
            Axios.get(`http://127.0.0.1:8000/api/ReturnUtilisateur/${pseudoUser}/`)
                .then((response) => {
                    if (response.data[0].payment) {
                        Axios.get(`http://127.0.0.1:8000/api/ReturnEmploye/${emp}/`)
                            .then((response) => {
                                if (response.data[0].nbr_utilisateurs < 4) {
                                    Axios.post('http://127.0.0.1:8000/api/historique_utilisateur/', {
                                        pseudo_employe: emp,
                                        pseudo: pseudoUser
                                    }).then((response) => {
                                        if (response.data) {
                                            Axios.post('http://127.0.0.1:8000/api/Createhistorique/', {
                                                pseudo_employe: emp,
                                                pseudo: pseudoUser
                                            })
                                        }
                                    })
                                    Axios.post('http://127.0.0.1:8000/api/conversation_utilisateur/', {
                                        pseudo_employe: emp,
                                        pseudo: pseudoUser
                                    })
                                        .then((response) => {
                                            if (response.data) {
                                                Axios.post('http://127.0.0.1:8000/api/Createconversation/', {
                                                    pseudo_employe: emp,
                                                    pseudo: pseudoUser
                                                })
                                                    .then(() => {
                                                        Axios.post('http://127.0.0.1:8000/api/number_utilisateur/', {
                                                            pseudo_employe: emp
                                                        })
                                                    }).then(() => {
                                                        navigate('/messenger')
                                                    })
                                            }
                                            else {
                                                navigate('/messenger')
                                            }
                                        })
                                } else {
                                    Axios.post('http://127.0.0.1:8000/api/conversation_utilisateur/', {
                                        pseudo_employe: emp,
                                        pseudo: pseudoUser
                                    })
                                        .then((response) => {
                                            if (!response.data) {
                                                navigate('/messenger')
                                            } else {
                                                alert('Ce Employer Est Trop chargé')
                                            }
                                        })
                                }
                            })
                    } else {
                        navigate('/payment')
                    }

                })
        }
    }
    const employes = useSelector((state) => state.allEmployes.employes)
    const renderList = employes.map((employe) => {
        const { pseudo_employe, prenom_employe, specialite_employe, support_divinatoire_employe, image_employe, statut_employe } = employe
        return (
            <div className='employe-item' key={pseudo_employe} onFocus={() => setEmp(pseudo_employe)}>
                <div className='employe-wrapper'>
                    <div className='img-content'>
                        <img className='employe-item-image' src={image_employe} />
                        {statut_employe ? <button className='employe-item-statut-btn-green'></button> : <button className='employe-item-statut-btn-red'></button>}
                    </div>
                    <div className='employe-item-content'>
                        <h4 className='employe-item-name'>{prenom_employe}</h4>
                        <p className='employe-item-specialite'>Spécialité : {specialite_employe}</p>
                        <span className='employe-item-support'>Support divinatoire : {support_divinatoire_employe}</span>
                        <Link to={`/employes/${pseudo_employe}`} className='employe-item-details-btn'>En Savoir +</Link>
                    </div>
                </div>
                {loginUser ? <button onClick={verification} className='chat'>Tchatter avec {prenom_employe}</button> : <CreateAcountPopUp title={`Tchatter avec ${prenom_employe}`} />}
            </div>
        )
    })
    return <>{renderList}</>
}

export default Employe