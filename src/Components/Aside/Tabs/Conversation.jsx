import React, { useState } from 'react'
import { faker } from '@faker-js/faker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Conversation() {

  const history = useSelector(state => state.messenger.history)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/messenger/${id}`)
    dispatch({ type: "messenger/changeConversation", payload: id})
    dispatch({ type: "settings/toggleResponsiveAside", payload: false })
  }

  return (
    <section className="conversations">
        {history.map((conversation, index) => 
            <div key={index} className="conversation" onClick={() => { handleClick(conversation.id) }}>
                <img src={conversation.picture} alt="" />
                <div className="right">
                    <span className="name">{conversation.name}</span>
                    <span className="message">{conversation.lastMessage}</span>
                </div>
            </div>
        )}
    </section>
  )
}
