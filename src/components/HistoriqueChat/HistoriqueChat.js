import React, { useState, useEffect, useRef } from 'react'
import './HistoriqueChat.css'
import { Navbar, Container, HistoriqueConversation, HistoriqueMessage } from '../index'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const HistoriqueChat = () => {
    const [conversationsh, setConversationsh] = useState([])
    const [currentChath, setCurrentChath] = useState(null)
    const [messages, setMessages] = useState([])
    const [pseudoUs, setPseudoUs] = useState("")
    const scrollRef = useRef()
    const navigate = useNavigate()

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
        const getConversations = async () => {
            try {
                const pseudoUser = window.localStorage.getItem("pseudo")
                if (pseudoUser) {
                    setPseudoUs(pseudoUser)
                    const response = await Axios.get(`http://127.0.0.1:8000/api/Returnhistoriqueinfo/${pseudoUser}/`)
                        .then((response) => {
                            setConversationsh(response.data)
                        })
                }
            } catch (err) {
                console.log(err)
            }
        }
        getConversations()
    }, [pseudoUs])
    useEffect(() => {
        const getMessages = async () => {
            try {
                if (currentChath) {
                    const response = await Axios.get(`http://127.0.0.1:8000/api/ReturnMessage_historique/${currentChath[0].historiqueId}/`)
                    setMessages(response.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getMessages()
    }, [currentChath])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    return (
        <>
            <Navbar />
            <Container>
                <div className='messenger'>
                    <div className='chatMenu'>
                        <div className='chatMenuWrapper'>
                            {conversationsh.map((conv) => (
                                <div onClick={() => setCurrentChath([conv])}>
                                    <HistoriqueConversation conversation={conv} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='chatBox'>
                        <div className='chatBoxWrapper'>
                            {currentChath ?
                                <>
                                    <div className="chatBoxTop">
                                        {messages.map((m) => (
                                            <div ref={scrollRef}>
                                                <HistoriqueMessage message={m} own={m.sender === pseudoUs} />
                                            </div>
                                        ))}
                                    </div>
                                </>
                                : <span className='noConversationText'>Open A conversation To Receive Messages</span>
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default HistoriqueChat