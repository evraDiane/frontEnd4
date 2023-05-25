import './CreateAcountPopUp.css'
import React, { useState } from 'react'
import Axios from 'axios'
import {BASE_URL }from '../../configApi/apiConfig'
const CreateAcountPopUp = (props) => {
    const [modal, setModal] = useState(false)
    const [prenom, setPrenom] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [exist, setExist] = useState(true)
    const postData = (e) => {
        e.preventDefault()
        if (exist) {
            Axios.post(`${BASE_URL}/api/Utilisateur_create/`, {
                prenom,
                pseudo,
                email,
                password,
            })
                .then(response => {
                })
                .catch(err => console.log(err))
                .finally(() => {
                    toggleModal()
                    setExist(false)
                })
        }
    }
    const toggleModal = () => {
        setModal(!modal)
    }
    if (modal) {
        document.body.classList.add('active-modal')
        window.scroll(0, 0)
    } else {
        document.body.classList.remove('active-modal')
    }
    return (
        <>
            <button type='button' onClick={toggleModal} className="btn-header">
                {props.title}
            </button>
            {modal && (
                <div className='.modal'>
                    <div className='overlay' onClick={toggleModal}></div>
                    <div className='modal-content'>
                        <form onSubmit={postData}>
                            <h3 className='modal-h2'>Create Account</h3>
                            <div className="formBox">
                                <div className="inputBox w50">
                                    <input type="text" name="" required value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                                    <span>Prénom</span>
                                </div>
                                <div className={exist ? "verifier-pseudo inputBox w50 not-exist" : "verifier-pseudo inputBox w50 exist"}>
                                    <input type="text" name="" required value={pseudo} onChange={(e) => {
                                        setPseudo(e.target.value)
                                        Axios.post('http://127.0.0.1:8000/api/pseudo_utilisateur_bd/', {
                                            pseudo: e.target.value
                                        }).then((response) => {
                                            console.log(response.data)
                                            setExist(response.data)
                                        })
                                    }} />
                                    <span>Pseudo</span>
                                </div>
                                <div className="inputBox w100">
                                    <input type="text" name="" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <span>E-mail</span>
                                </div>
                                <div className="inputBox w50">
                                    <input type="password" name="" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <span>Mot de passe</span>
                                </div>
                                <div className="inputBox w100">
                                    <button className='submit-btn' type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                        <button className='close-modal' onClick={toggleModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateAcountPopUp