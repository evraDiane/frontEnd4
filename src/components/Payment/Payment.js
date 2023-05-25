import React, { useState, useEffect } from 'react'
import './Payment.css'
import { API_URL } from '../../config'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Navbar, Container} from '../index'
import { Footer } from '../../Sections/index'
import { BASE_URL } from '../../configApi/apiConfig'

const Payment = () => {
    const [minutes, setMinutes] = useState("")
    const [message,setMessage] = useState("")
    const navigate = useNavigate()
    const saveMintues = (e) => {
        setMinutes(e.target.value)
        if (minutes !== "") {
            window.localStorage.setItem("minutes", e.target.value)
        } else {
            window.localStorage.removeItem("minutes")
            window.localStorage.setItem("minutes", e.target.value)
        }
    }
    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        if (query.get('success')) {
            const pseudoUser = window.localStorage.getItem("pseudo")
            const myMinutes = window.localStorage.getItem("minutes")
            if (pseudoUser && myMinutes) {
                Axios.post(`${BASE_URL}/api/change/`, {
                    pseudo: pseudoUser,
                    nbr_sc: myMinutes
                }
                ,
                )
                alert('Votre Payment Est Effectuer Tu Peux Lancer Le Chat Maintenant Avec Votre Voyant')
                navigate('/payment')
            }
        }
        if (query.get('canceled')) {
            navigate('/payment')
        }
    }, [])
    return (
        <>
            <Navbar />
            <Container>
                <div className='payment'>
                    <form action={`${API_URL}/api/StripeCheckoutView/${minutes}/`} method='POST'>
                        <h4 className='header-payment'>Veuillez Choisir Votre Paque</h4>
                        <div className='div-input'>
                            <input id="5" type='radio' name='Minute' value='5' onChange={e => saveMintues(e)} required /> <label for="5">Standard 14.90 Euro pour 5 Min</label>
                        </div>
                        <div className='div-input'>
                            <input id="10" type='radio' name='Minute' value='10' onChange={e => saveMintues(e)} required /> <label for="10">Standard 19.90 Euro pour 10 Min</label>
                        </div>
                        <div className='div-input'>
                            <input id="15" type='radio' name='Minute' value='15' onChange={e => saveMintues(e)} required /> <label for="15">Standard 29.90 Euro pour 15 Min</label>
                        </div>
                        <div className='div-input'>
                            <input id="30" type='radio' name='Minute' value='30' onChange={e => saveMintues(e)} required /> <label for="30">Premium 49.90 Euro pour 30 Min</label>
                        </div>
                        <div className='div-input'>
                            <input id="60" type='radio' name='Minute' value='60' onChange={e => saveMintues(e)} required /> <label for="60">Premium 89.90 Euro pour 60 Min</label>
                        </div>
                        <div className='div-input'>
                            <input id='120'  type='radio' name='Minute' value='120' onChange={e => saveMintues(e)} required /> <label for="120">Premium 159.90 Euro pour 120 Min</label>
                        </div>
                        <button type='submit' className='valider-payment'>Valider</button>
                    </form>
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default Payment