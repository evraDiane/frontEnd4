import React, { useEffect, useState } from 'react'
import './ConversationEmploye.css'
import Axios from 'axios'
import { BASE_URL } from '../../configApi/apiConfig'

const ConversationEmploye = ({ conversation }) => {
    const [use, setUse] = useState([{}])
    useEffect(() => {
        const psUser = conversation.pseudo
        const getUsers = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/ReturnUtilisateur/${psUser}/`)
                    .then((response) => {
                        setUse(response.data)
                    })
            } catch (err) {
                console.log(err)
            }
        }
        getUsers()
    }, [conversation])
    return (
        <div className='conversation'>
            <span className='conversationName'>{use[0].prenom}</span>
        </div>
    )
}

export default ConversationEmploye