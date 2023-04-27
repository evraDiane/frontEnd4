import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useDispatch } from 'react-redux'
import { setUserLogin, removeSelectedUtilisateur } from '../../Redux/Actions/UserAction'
import Axios from 'axios'
import {RiMessage2Line} from "react-icons/ri"
import { BASE_URL } from '../../configApi/apiConfig'

const Navbar = () => {
    const [pseudo, setPseudo] = useState("")
    const [password, setPassword] = useState("")
    const [apiResponse, setApiResponse] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const pseudoRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const iconStyle = {
        color: '#000',
        fontSize: '25',
        marginRight:'7px'
    }
    useEffect(() => {
        pseudoRef.current.focus();
    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [pseudo, password])
    const getApiPseudoPassword = (e) => {
        e.preventDefault()
        Axios.post(`${BASE_URL}/api/Utilisateur_authentification/`, {
            pseudo,
            password
        })
            .then((response) => {
                if (response.data) {
                    dispatch(setUserLogin(response.data))
                    setApiResponse(response.data)
                    window.localStorage.setItem("LoggedIn", true)
                    window.localStorage.setItem("pseudo", pseudo)
                }
            })
            .catch((err) => {
                if (!err?.response) {
                    setErrMsg('No Server Response')
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing pseudo or password')
                } else if (err.response.status === 401) {
                    setErrMsg('UnAuthorized')
                } else {
                    setErrMsg('Login Failed')
                }
                errRef.current.focus()
            })
    }
    useEffect(() => {
        const loggedInUser = localStorage.getItem("LoggedIn")
        if (loggedInUser) {
            const found = JSON.parse(loggedInUser)
            setApiResponse(found)
        }
    }, [])
    const handleLogOut = () => {
        setApiResponse(false)
        window.localStorage.clear();
        dispatch(removeSelectedUtilisateur())
        navigate('/')
        window.location.reload(true)
    }
    const handleNavigateProfile = () => {
        const pseudoUser = localStorage.getItem("pseudo")
        if (pseudoUser) {
            navigate(`/profile/${pseudoUser}`)
            window.location.reload(true)
        }
    }
    const navigateHome = () => {
        navigate('/')
        window.location.reload(true)
    }
    return (
        <nav className='navbar'>
            <div className='containerNav'>
                <div className='logo' onClick={navigateHome}>
                    < RiMessage2Line style={iconStyle}/>
                    <a >Ora</a>
                </div>
                <div className='link-area'>
                    <a onClick={navigateHome}>Home</a>
                </div>
                {apiResponse ? <><button onClick={handleNavigateProfile} className="btn-profile">Profile</button> <button onClick={handleLogOut} className="logout-btn-user">Se Deconnecter</button></> : (
                    <>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <form className='form' onSubmit={getApiPseudoPassword}>
                            <input type="text" placeholder='votre pseudo' ref={pseudoRef} value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                            <input type="password" placeholder='votre mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">Se Connecter</button>
                        </form>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar