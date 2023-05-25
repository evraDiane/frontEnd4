import React, { useState, useEffect, useRef } from 'react'
import './Messenger.css'
import { Navbar, Container, Conversation, Message } from '../index'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { io } from 'socket.io-client'
import { BASE_URL } from '../../configApi/apiConfig'

const Messenger = () => {
    const [conversationsh, setConversationsh] = useState([])
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [currentChath, setCurrentChath] = useState([])
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const [pseudoUs, setPseudoUs] = useState("")
    const [userTime, setUserTime] = useState("")
    const scrollRef = useRef()
    const socket = useRef()
    const [timeNow, setTimeNow] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        const currentDateTime = new Date().getTime();
        setTimeNow(currentDateTime)
    }, [])
    const checkUserLoggedIn = () => {
        const loggedInUser = window.localStorage.getItem("LoggedIn")
        if (!loggedInUser) {
            navigate('/')
        }
    }
    useEffect(() => {
        checkUserLoggedIn()
    }, [])
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
        if (arrivalMessage && currentChat && currentChat[0].pseudo_employe === arrivalMessage.sender) {
            setMessages((prev) => [...prev, arrivalMessage])
        }
    }, [arrivalMessage, currentChat])
    useEffect(() => {
        const pseudoUser = window.localStorage.getItem("pseudo")
        if (pseudoUser) {
            socket.current.emit("addUser", pseudoUser)
        }
    }, [])
    useEffect(() => {
        const getConversations = async () => {
            try {
                const pseudoUser = window.localStorage.getItem("pseudo")
                if (pseudoUser) {
                    setPseudoUs(pseudoUser)
                    const response = await Axios.get(`${BASE_URL}/api/Returnconversationinfo/${pseudoUser}/`)
                        .then((response) => {
                            setConversations(response.data)
                            Axios.get(`${BASE_URL}/api/Returnhistoriqueinfo/${pseudoUser}/`)
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
        const currentDateNow = new Date().getTime();
        const resultInSeconds = (currentDateNow - timeNow) / 1000;
        setTimeNow(currentDateNow)
        const message = {
            sender: pseudoUs,
            text: newMessage,
            conversationi: currentChat[0].conversationId
        };
        const messageh = {
            sender: pseudoUs,
            text: newMessage,
            historiquei: currentChath[0].historiqueId
        }
        const receiverPseudo = currentChat[0].pseudo_employe
        socket.current.emit("sendMessage", {
            senderPseudo: pseudoUs,
            receiverPseudo,
            text: newMessage
        })
        try {
            const response = await Axios.post(`${BASE_URL}/api/CreateMessage/`, message)
            setMessages([...messages, response.data])
            setNewMessage("")
            Axios.post(`${BASE_URL}/api/CreateMessage_historique/`, messageh)
            const pseudoUser = window.localStorage.getItem("pseudo")
            if (pseudoUser) {
                Axios.post(`${BASE_URL}/api/update_nbr_min/`, {
                    pseudo: pseudoUser,
                    nbr_sc: resultInSeconds,
                    pseudo_employe: currentChat[0].pseudo_employe,
                }).then((response) => {
                    if (!response.data) {
                        alert('Votre Solde est Epuisé')
                        navigate('/')
                    }
                })
            }
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
        <>
            <Navbar />
            <Container>
                <div className='messenger'>
                    <div className='chatMenu'>
                        <div className='chatMenuWrapper'>
                            {
                                conversations.map((conv) => (
                                    <div onClick={() => {
                                        setCurrentChat([conv])
                                        const p = conversationsh.filter(convh => convh.pseudo_employe === conv.pseudo_employe)
                                        setCurrentChath(p)
                                    }}>
                                        <Conversation conversation={conv} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='chatBox'>
                        <div className='chatBoxWrapper'>
                            {currentChat ?
                                <>
                                    <div className='timer'> {Math.round(userTime / 60, 2)} min</div>
                                    <div className="chatBoxTop">
                                        {messages.map((m) => (
                                            <div ref={scrollRef}>
                                                <Message message={m} own={m.sender === pseudoUs} />
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
                </div>
            </Container>
        </>
    )
}

export default Messenger