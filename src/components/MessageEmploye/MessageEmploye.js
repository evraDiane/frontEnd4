import React from 'react'
import './MessageEmploye.css'

const MessageEmploye = ({message,own}) => {
    return (
        <div className={own ? "message own" : "message"}>
            <div className='messageTop'>
                <p className='messageText'>{message.text}</p>
            </div>
        </div>
    )
    }

export default MessageEmploye