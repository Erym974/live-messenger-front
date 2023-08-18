import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Messages() {

    const conversation = useSelector(state => state.messenger.conversation)

    useEffect(() => {



        setTimeout(() => {
            const messages = document.querySelector('.messages')
            if(!messages) return
            messages.scrollTop = messages?.scrollHeight
        }, 1000);
      
    }, [conversation])

    
    return (
        <div className="messages">
            <div className="loading">
                <div className="loader"><div></div><div></div><div></div><div></div></div>
            </div>
            {conversation.messages.map((message, index) => {
                return (
                <div className={`message ${message.sender} ${index != conversation.messages.length - 1 ? conversation.messages[index + 1]['name'] === message.name ? "not-last" : "last" : ""}`} key={index}>
                    <div className="message-inner">
                        {message.sender === 'me' && <img src="/ressources/profile_picture.jpg" height="50" width="50" alt="" />}
                        {message.sender != 'me' && <img src={conversation.picture} height="50" width="50" alt="" />}
                        <div className="message-body">
                            <div className="message-content px-4 py-3 rounded" >
                                <span className="message-text">{message.content}</span>
                            </div>
                            <div className="message-footer">
                                <span className="message-sender">{message.sender != "me" && message.name}</span>
                                <span className="message-date">{message.date}</span>
                                {message.sender == "me" && index === conversation.messages.length - 1 &&
                                <span className={`message-status ${message.status}`}>
                                    {message.status === 'seen' && <span>vu</span>}
                                </span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}
