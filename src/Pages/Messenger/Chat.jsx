import React, { useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import { FaPaperPlane, FaXmark } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import ButtonRounded from '../../Components/ButtonRounded'
import Messages from '../../Components/Dashboard/Messages'

import './chat.scss'

export default function Chat({ id }) {

    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const conversation = useSelector(state => state.messenger.conversation)

    const sendMessage = () => {
        if(text === '') return
        dispatch({ type: "messenger/sendMessage", payload: {content: text, date: '12/12/2020', sender: 'me', name: 'John Doe', status: 'sended'}})
        setText('')
    }
    
    const handleKeyDown = (event) => {
        const textarea = event.target
        textarea.style.height = 'auto'
        let height = textarea.scrollHeight
        if(height > 150) height = 150
        textarea.style.height = height + 'px'
    }

    const toggleDropDown = (evt) => {
        const dropdownMenu = evt.target.closest('.dropdown-button').querySelector('.dropdown-menu')
        if(dropdownMenu.getAttribute('dropdown-menu') === 'true') dropdownMenu.setAttribute('dropdown-menu', 'false')
        else dropdownMenu.setAttribute('dropdown-menu', 'true')
    }

    const handleResponsiveAside = () => {
        dispatch({ type: "settings/toggleResponsiveAside", payload: true })
    }

    const showProfile = () => {
        dispatch({ type: 'profile/showProfile', payload: conversation?.group ? conversation : conversation?.members[0] })
    }

    return (
        <section id="chat">
            <header>
            <div className="left">
                <img src={conversation?.group ? `${ conversation.picture }` : `${ conversation?.members[0].picture }`} alt={conversation?.name} />
                <div className="right">
                <span className="name">{conversation?.group ? `${ conversation?.name }` : `${ conversation?.members[0].name }`}</span>
                <span className="status">{conversation?.group ? `${ conversation?.members.length } participant${conversation?.members.length > 1 ? "s" : ""}` : `${ conversation?.members[0].status }`}</span>
                </div>
            </div>
            <div className="actions">
                <ButtonRounded size="small dropdown-button" onClick={toggleDropDown}>
                    <FaEllipsisH />
                    <div className="dropdown-menu" dropdown-menu="false">
                        <div className="dropdown-item">
                            <span onClick={showProfile}>Voir le profil</span>
                        </div>
                    </div>
                </ButtonRounded>
                <ButtonRounded size="small" attributes={{ "data-open-aside": "true" }} onClick={handleResponsiveAside}>
                    <FaXmark />
                </ButtonRounded>
            </div>
            </header>
            <main>
                <Messages />
            </main>
            <footer>
                <textarea placeholder="Ecrivez votre message" onChange={e => setText(e.target.value)} value={text} onKeyDown={handleKeyDown}></textarea>
                <div className="actions">
                <ButtonRounded size="small" onClick={sendMessage}>
                    <FaPaperPlane />
                </ButtonRounded>
                </div>
            </footer>
        </section>
    )
}
