import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './EmployeDetails.css'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectedEmploye, removeSelectedEmploye } from '../../Redux/Actions/EmployesActions'
import { Navbar, Container, CreateAcountPopUp } from '../../components/index'
import { Footer } from '../../Sections/index'
import { ImUserTie } from 'react-icons/im'
const EmployeDetails = () => {
  const iconStyle = {
    color: 'rgba(0,0,0,0.3)',
    fontSize: '200',
    maxWidth: '200px',
    width: '100%',
  }
  const [emp, setEmp] = useState("")
  const user = useSelector((state) => state.user)
  const employe = useSelector((state) => state.employe)
  const { prenom_employe, specialite_employe, support_divinatoire_employe, image_employe, statut_employe, description_employe } = employe[0];
  const { pseudo_employe } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchEmloyeDetail = async () => {
    const response = await Axios.get(`http://127.0.0.1:8000/api/ReturnEmploye/${pseudo_employe}/`)
      .then((response) => dispatch(selectedEmploye(response.data)))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    if (pseudo_employe && pseudo_employe !== "")
      fetchEmloyeDetail()
    else {
      return () => {
        dispatch(removeSelectedEmploye())
      }
    }
  }, [pseudo_employe])
  const [loginUser, setLoginUser] = useState(false)
  useEffect(() => {
    const loggedInUser = localStorage.getItem("LoggedIn")
    if (loggedInUser !== null) {
      const found = JSON.parse(loggedInUser)
      setLoginUser(found)
    } else {
      setLoginUser(false)
    }
  }, [user.login])
  const verification = () => {
    const pseudoUser = window.localStorage.getItem("pseudo")
    if (pseudoUser) {
      Axios.get(`http://127.0.0.1:8000/api/ReturnUtilisateur/${pseudoUser}/`)
        .then((response) => {
          if (response.data[0].payment) {
            Axios.post('http://127.0.0.1:8000/api/conversation_utilisateur/', {
              pseudo_employe: emp,
              pseudo: pseudoUser
            })
              .then((response) => {
                if (response.data) {
                  Axios.post('http://127.0.0.1:8000/api/Createconversation/', {
                    pseudo_employe: emp,
                    pseudo: pseudoUser
                  })
                    .then(() => {
                      navigate('/messenger')
                    })
                }
                else {
                  navigate('/messenger')
                }
              })
          } else {
            navigate('/payment')
          }

        })
    }
  }
  return (
    <>
      <Navbar />
      <Container>
        {Object.keys(employe).length === 0 ?
          (
            <div className='loading'>...Loading</div>
          )
          :
          (
            <div className='employe-details-container'>
              <div className='employe-item' key={pseudo_employe} onFocus={() => setEmp(pseudo_employe)}>
                <div className='employe-wrapper'>
                  <img className='employe-item-image-d' src={`http://127.0.0.1:8000${image_employe}`} />
                  <div className='employe-item-content'>
                    <h4 className='employe-item-name'>{prenom_employe}</h4>
                    <p className='employe-item-specialite'>Spécialité : {specialite_employe}</p>
                    <span className='employe-item-support'>Support divinatoire : {support_divinatoire_employe}</span>
                    {statut_employe ? <button className='employe-item-statut-btn-green-details'>Disponible</button> : <button className='employe-item-statut-btn-red-details'>indisponible</button>}
                    <Link to='/' className='employe-item-details-btn'>Liste Des Voyants</Link>
                    {loginUser ? <button onClick={verification} className='chat'>Lancer Le Chat avec {prenom_employe}</button> : <CreateAcountPopUp title={`Lancer Le chat avec ${prenom_employe}`} />}
                  </div>
                  <ImUserTie style={iconStyle} />
                </div>
              </div>
              <div className='employe-detail-description'>
                <h4>{prenom_employe}</h4>
                <p>{description_employe}</p>
              </div>
            </div>
          )
        }
      </Container>
      <Footer />
    </>
  )
}

export default EmployeDetails