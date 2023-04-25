import React , { useState , useEffect } from 'react'
import './HistoriqueConversation.css'
import Axios from 'axios'

const HistoriqueConversation = ({conversation}) => {
    const [emp, setEmp] = useState([{}])

    useEffect(() => {
        const psEmploye = conversation.pseudo_employe
        const getEmploye = async () => {
            try {
                const response = await Axios.get(`http://127.0.0.1:8000/api/ReturnEmploye/${psEmploye}/`)
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

export default HistoriqueConversation