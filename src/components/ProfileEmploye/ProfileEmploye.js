import React, { useState, useEffect, useRef } from 'react'
import './ProfileEmploye.css'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'
import { MessageEmploye, ConversationEmploye, Container } from '../index'
import { io } from 'socket.io-client'
import { BASE_URL } from '../../configApi/apiConfig'

const ProfileEmploye = () => {
    const [pseudoEmp, setPseudoEmp] = useState("")
    const [status, setStatus] = useState(false)
    const [employeDetails, setEmployeDetails] = useState([{}])
    const navigate = useNavigate()
    const { pseudoEmploye } = useParams();
    const fetchEmployeData = async () => {
        const pseudoEmploye = localStorage.getItem("pseudoEmploye")
        if (pseudoEmploye) {
            await Axios.get(`${BASE_URL}/api/ReturnEmploye/${pseudoEmploye}/`)
                .then((response) => {
                    setEmployeDetails(response.data)
                })
        }
    }
    useEffect(() => {
        fetchEmployeData()
    }, [status])
    const handleChangeStatutEmploye = () => {
        const pseudoEmploye = localStorage.getItem("pseudoEmploye")
        if (pseudoEmploye) {
            if (status === false) {
                Axios.post(`${BASE_URL}/api/change_employe/`, {
                    pseudo_employe: pseudoEmploye,
                    statut_employe: true
                }).then(() => {
                    setStatus(true)
                })
            }
            else if (status === true) {
                Axios.post(`${BASE_URL}/api/change_employe/`, {
                    pseudo_employe: pseudoEmploye,
                    statut_employe: false
                }).then(() => {
                    setStatus(false)
                })
            }
        }
    }
    const checkEmployeLoggedIn = () => {
        const loggedInEmploye = localStorage.getItem("LoggedInEmploye")
        if (!loggedInEmploye) {
            navigate('/employe')
        }
    }
    const handleLogOutEmploye = () => {
        window.localStorage.clear();
        navigate('/employe')
        window.location.reload(true)
    }
    useEffect(() => {
        const pseudoEmploye = localStorage.getItem("pseudoEmploye")
        if (pseudoEmploye) {
            setPseudoEmp(pseudoEmploye)
        }
        checkEmployeLoggedIn()
    }, [])
    /* MessengerEmploye */
    const [conversationsh, setConversationsh] = useState([])
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [currentChath, setCurrentChath] = useState([])
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [pseudoEmpl, setPseudoEmpl] = useState("")
    const [userTime, setUserTime] = useState("")
    const scrollRef = useRef()
    const socket = useRef()
    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderPseudo,
                text: data.text,
            })
        })
    }, [])
    useEffect(() => {
        if (arrivalMessage && currentChat && currentChat[0].pseudo === arrivalMessage.sender) {
            setMessages((prev) => [...prev, arrivalMessage])
        }
    }, [arrivalMessage, currentChat])
    useEffect(() => {
        const pseudoEmploye = window.localStorage.getItem("pseudoEmploye")
        if (pseudoEmploye) {
            socket.current.emit("addUser", pseudoEmploye)
        }
    }, [])
    useEffect(() => {
        const getConversations = async () => {
            try {
                const pseudoEmploye = window.localStorage.getItem("pseudoEmploye")
                if (pseudoEmploye) {
                    setPseudoEmpl(pseudoEmploye)
                    const response = await Axios.get(`${BASE_URL}/api/Returnconversation_employe/${pseudoEmploye}/`)
                        .then((response) => {
                            setConversations(response.data)
                            Axios.get(`${BASE_URL}/api/Returnhistoriqueinfo_employe/${pseudoEmploye}/`)
                                .then((responseh) => {
                                    setConversationsh(responseh.data)
                                })
                        })
                }
            } catch (err) {
                console.log(err)
            }
        }
        getConversations()
    }, [])
    useEffect(() => {
        const getMessages = async () => {
            try {
                if (currentChat) {
                    const response = await Axios.get(`${BASE_URL}/api/ReturnMessage/${currentChat[0].conversationId}/`)
                    setMessages(response.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getMessages()
    }, [currentChat])
    const handleSendMessage = async (e) => {
        e.preventDefault()
        const message = {
            sender: pseudoEmpl,
            text: newMessage,
            conversationi: currentChat[0].conversationId
        };
        const messageh = {
            sender: pseudoEmpl,
            text: newMessage,
            historiquei: currentChath[0].historiqueId
        }
        const receiverPseudo = currentChat[0].pseudo
        socket.current.emit("sendMessage", {
            senderPseudo: pseudoEmpl,
            receiverPseudo,
            text: newMessage
        })
        try {
            const response = await Axios.post(`${BASE_URL}/api/CreateMessage/`, message)
            setMessages([...messages, response.data])
            setNewMessage("")
            Axios.post(`${BASE_URL}/api/CreateMessage_historique/`, messageh)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    useEffect(() => {
        const getTimeUser = async () => {
            await Axios.get(`${BASE_URL}/api/ReturnUtilisateur/${currentChat[0].pseudo}/`)
                .then((response) => setUserTime(response.data[0].nbr_sc))
                .catch((err) => console.log(err))
        }
        getTimeUser();
    }, [currentChat, messages])
    return (
        <div className='profile-employe'>
            <div className='navbar-profile-employe-container'>
                <div className='navbar-profile-employe'>
                    <h3>Welcome {employeDetails[0].prenom_employe}</h3>
                    <button onClick={handleLogOutEmploye} className="logout-employe">LogOut</button>
                </div>
            </div>
            <Container>
                <div className='messenger'>
                    <div className='chatMenu'>
                        <div className='chatMenuWrapper'>
                            {conversations.map((conv) => (
                                <div onClick={() => {
                                    setCurrentChat([conv])
                                    const p = conversationsh.filter(convh => convh.pseudo === conv.pseudo)
                                    setCurrentChath(p)
                                }}>
                                    <ConversationEmploye conversation={conv} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='chatBox'>
                        <div className='chatBoxWrapper'>
                            {currentChat ?
                                <>
                                    <div className='timer'> {Math.round(userTime / 60, 2)} Min</div>
                                    <div className="chatBoxTop">
                                        {messages.map((m) => (
                                            <div ref={scrollRef}>
                                                <MessageEmploye message={m} own={m.sender === pseudoEmpl} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea
                                            placeholder='Write Message ...'
                                            className='chatMessageInput'
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}
                                        />
                                        <button className='chatSubmitButton' onClick={handleSendMessage}>Send</button>
                                    </div>
                                </>
                                : <span className='noConversationText'>Open A conversation To start Chat</span>
                            }
                        </div>
                    </div>
                    <div className="status-employe">{
                        employeDetails[0].statut_employe ?
                            <>
                                <p>Vous étes Disponible Click To Change</p>
                                <button onClick={handleChangeStatutEmploye} className="update-status-employe disponible">Disponible</button>
                            </>
                            :
                            <>
                                <p>Vous étes Indisponible Click To Change</p>
                                <button onClick={handleChangeStatutEmploye} className="update-status-employe indisponible">InDisponible</button>
                            </>
                    }
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ProfileEmploye