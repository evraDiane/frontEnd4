import React, { useEffect, useState } from 'react'
import './Conversation.css'
import Axios from 'axios'
import { BASE_URL } from '../../configApi/apiConfig'

const Conversation = ({ conversation }) => {
    const [emp, setEmp] = useState([{}])

    useEffect(() => {
        const psEmploye = conversation.pseudo_employe
        const getEmploye = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/ReturnEmploye/${psEmploye}/`)
                setEmp(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getEmploye()
    }, [conversation])
    return (
        <div className='conversation' >
            <span className='conversationName'>{emp[0].prenom_employe}</span>
        </div>
    )
}

export default Conversation