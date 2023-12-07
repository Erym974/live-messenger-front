import React from 'react'
import { FaArrowTurnDown } from 'react-icons/fa6'
import { Options } from '../Options'
import useSettings from '../../../Hooks/useSettings'
import { Reactions } from '../Reactions'

export const Emoji = ({ message, type, option }) => {

  const { isMobileView } = useSettings()

  return (
    <div data-message={message.id} className={`message ${type} ${message.me ? "me" : "participant"} ${(["bottom", "both"].includes(message.position)) ? "mb-2" : ""}`}>
      {(!message.me && !option) && <div className="message-profile-picture">
        {(message.position === "bottom" || message.position === "both") && <img src={message.sender.profilePicture} className="message-profile-picture" />}
      </div>}
      <div className="message-body">
        {(message.reply && !option) && <div className="message-reply">
            <FaArrowTurnDown />
            <span>{message.reply.content}</span>
        </div>}
        <div className="message-content-container">
          <div className={`message-content ${type} ${message.position}`}>
            {message.content}
          </div>
          {!isMobileView && <Options message={message} />}
        </div>
      </div>
    </div>
  )
}
