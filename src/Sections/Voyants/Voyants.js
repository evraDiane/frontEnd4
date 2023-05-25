import React, { useEffect } from 'react'
import './Voyants.css'
import { useDispatch, useSelector } from 'react-redux'
import { setEmployes } from '../../Redux/Actions/EmployesActions'
import { Employe } from '../../components/index'
import Axios from 'axios'
import { BASE_URL } from '../../configApi/apiConfig'

const Voyants = () => {
    const employes = useSelector((state) => state.allEmployes.employes)
    const dispatch = useDispatch()
    const fetchEmloyes = async () => {
        const response = await Axios.get(`${BASE_URL}/api/ReturnEmploye/`)
            .catch((err) => console.log(err))
        dispatch(setEmployes(response.data))
    }
    useEffect(() => {
        fetchEmloyes()
    }, [])
    return (
        <div className='voyants'>
            <h2>Liste Des Voyants</h2>
            <div className='voyants-items'>
                <Employe />
            </div>
        </div>
    )
}

export default Voyants