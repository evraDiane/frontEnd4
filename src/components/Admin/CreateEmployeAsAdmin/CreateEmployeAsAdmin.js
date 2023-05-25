import React, { useState } from 'react'
import './CreateEmployeAsAdmin.css'
import Axios from 'axios'
import { Container } from '../../../components/index'
import { BASE_URL } from '../../../configApi/apiConfig'

const CreateEmployeAsAdmin = () => {
    const [prenom_employe, setPrenom_employe] = useState("")
    const [pseudo_employe, setPseudo_employe] = useState("")
    const [password_employe, setPassword_employe] = useState("")
    const [specialite_employe, setSpecialite_employe] = useState("")
    const [description_employe, setDescription_employe] = useState("")
    const [support_divinatoire_employe, setSupport_divinatoire_employe] = useState("")
    const [image_employe, setImage_employe] = useState();
    const [done, setDone] = useState(false)
    const [existEmp, setExistEmp] = useState(true)

    const postEmployeData = (e) => {
        e.preventDefault()
        if (existEmp) {
            const formData = new FormData()
            formData.append("prenom_employe", prenom_employe)
            formData.append("pseudo_employe", pseudo_employe)
            formData.append("password_employe", password_employe)
            formData.append("specialite_employe", specialite_employe)
            formData.append("description_employe", description_employe)
            formData.append("image_employe", image_employe, image_employe.name)
            formData.append("support_divinatoire_employe", support_divinatoire_employe)
            Axios.post(`${BASE_URL}/api/Employe_create/`, formData)
                .then(response => {
                    setDone(true)
                    setTimeout(() => {
                        setDone(false)
                    }, 1500)
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setExistEmp(false)
                })
        }
    }
    return (
        <div className='createEmploye'>
            <Container>
                <div className={done ? "valider done" : "valider"}>+</div>
                <h1>Create Employes</h1>
                <form onSubmit={postEmployeData}>
                    <div className="formBox">
                        <div className="inputBox w50">
                            <input type="text" required value={prenom_employe} onChange={(e) => setPrenom_employe(e.target.value)} />
                            <span>Prénom</span>
                        </div>
                        <div className={existEmp ? "valider-pseudo-employe inputBox w50 not-exist" : "valider-pseudo-employe inputBox w50 exist"}>
                            <input type="text" required value={pseudo_employe} onChange={(e) => {
                                setPseudo_employe(e.target.value)
                                Axios.post(`${BASE_URL}/api/pseudo_employe_bd/`, {
                                    pseudo_employe: e.target.value
                                }).then((response) => {
                                    console.log(response.data)
                                    setExistEmp(response.data)
                                })
                            }
                            } />
                            <span>Pseudo</span>
                        </div>
                        <div className="inputBox w50">
                            <input type="text" required value={specialite_employe} onChange={(e) => setSpecialite_employe(e.target.value)} />
                            <span>Specialite</span>
                        </div>
                        <div className="inputBox w50">
                            <input type="password" required value={password_employe} onChange={(e) => setPassword_employe(e.target.value)} />
                            <span>Mot de passe</span>
                        </div>
                        <div className="inputBox w50 sup">
                            <input type="text" required value={support_divinatoire_employe} onChange={(e) => setSupport_divinatoire_employe(e.target.value)} />
                            <span>support divinatoire</span>
                        </div>
                        <div className="inputBox w50 file">
                            <input type="file" name={`image_${prenom_employe}`} placeholder='upload image' onChange={(e) => setImage_employe(e.target.files[0])} />
                        </div>
                        <div className="inputBox w100">
                            <textarea required value={description_employe} onChange={(e) => setDescription_employe(e.target.value)}></textarea>
                            <span>Description</span>
                        </div>
                        <div className="inputBox w100">
                            <button type="submit">Create</button>
                        </div>
                    </div>
                </form>
            </Container>
        </div>
    )
}

export default CreateEmployeAsAdmin