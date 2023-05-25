import React, { useState, useRef, useEffect } from 'react'
import './SignInEmploye.css'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import {BASE_URL} from '../../configApi/apiConfig'

const SignInEmploye = () => {
    const [pseudo_employe, setPseudo_employe] = useState("")
    const [password_employe, setPassword_employe] = useState("")
    const pseudoRef = useRef();
    const navigate = useNavigate()
    useEffect(() => {
        pseudoRef.current.focus();
    }, [])
    const signInEmployeAuth = (e) => {
        e.preventDefault()
        Axios.post(`${BASE_URL}/api/Authentification_Employe/`, {
            pseudo_employe,
            password_employe
        })
            .then((response) => {
                if (response.data) {
                    window.localStorage.setItem("LoggedInEmploye", true)
                    window.localStorage.setItem("pseudoEmploye", pseudo_employe)
                    const pseudoEmploye = localStorage.getItem("pseudoEmploye")
                    if (pseudoEmploye) {
                        navigate(`/employe/profile/${pseudoEmploye}`)
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className='sign-up-employe'>
            <form onSubmit={signInEmployeAuth}>
                <div className='formBox'>
                    <div className="inputBox w100">
                        <input type="text" required value={pseudo_employe} onChange={(e) => setPseudo_employe(e.target.value)} ref={pseudoRef} />
                        <span>Pseudo</span>
                    </div>
                    <div className="inputBox w100">
                        <input type="password" required value={password_employe} onChange={(e) => setPassword_employe(e.target.value)} />
                        <span>password</span>
                    </div>
                    <div className="inputBox w100">
                        <button type="submit">Se Connecter</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignInEmploye