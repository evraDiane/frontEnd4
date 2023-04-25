import React from 'react'
import './SignUpAdmin.css'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthAdmin } from '../authAdmin';
import Axios from 'axios'

const SignUpAdmin = () => {
    const [pseudo_admin, setPseudo_admin] = useState("")
    const [password_admin, setPassword_admin] = useState("")
    const pseudoRef = useRef();
    const navigate = useNavigate();
    const authAdmin = useAuthAdmin()
    useEffect(() => {
        pseudoRef.current.focus();
    }, [])
    const signInAdmin = (e) => {
        e.preventDefault()
        Axios.post('http://127.0.0.1:8000/api/Admin_authentification/', {
            pseudo_admin,
            password_admin
        })
            .then((response) => {
                if (response.data) {
                    authAdmin.login(pseudo_admin)
                    navigate('/admin/dashbord/home')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <div className='sign-up-admin'>
                <form onSubmit={signInAdmin}>
                    <div className='formBox'>
                        <div className="inputBox w100">
                            <input type="text" required value={pseudo_admin} onChange={(e) => setPseudo_admin(e.target.value)} ref={pseudoRef} />
                            <span>Pseudo</span>
                        </div>
                        <div className="inputBox w100">
                            <input type="password" required value={password_admin} onChange={(e) => setPassword_admin(e.target.value)} />
                            <span>password</span>
                        </div>
                        <div className="inputBox w100">
                            <button type="submit">Se Connecter</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUpAdmin