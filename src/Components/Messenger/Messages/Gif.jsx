import React from 'react'
import { openImages } from '../../../Slices/imagesSlices'
import { useDispatch } from 'react-redux'
import { FaArrowTurnDown } from 'react-icons/fa6'
import { Options } from '../Options'
import useSettings from '../../../Hooks/useSettings'
import { Reactions } from '../Reactions'

export const Gif = ({ message, type, option }) => {

  const { isMobileView } = useSettings()

  const dispatch = useDispatch()

  const onMessageClick = () => {
    dispatch(openImages([getGifUrl()]))
  }

  const getGifUrl = () => {
    return message.content.replace('gif:', '')
  }

  return (
    <div data-message={message.id} className={`message ${type} ${message.me ? "me" : "participant"} ${(["bottom", "both"].includes(message.position)) ? "mb-2" : ""}`} style={{ marginBottom: message.reactions.length > 0 ? "15px" : "0px" }}>
      {(!message.me && !option) && <div className="message-profile-picture">
        {(message.position === "bottom" || message.position === "both") && <img src={message.sender.profilePicture} className="message-profile-picture" />}
      </div>}
      <div className="message-body">
        {(message.reply && !option) && <div className="message-reply">
              <FaArrowTurnDown />
              <span>{message.reply.content}</span>
        </div>}
        <div className="message-content-container">
          <div className={`message-content ${type} ${message.position}`} >
              <img src={getGifUrl()} alt={getGifUrl()} onClick={onMessageClick} />
              {message.reactions.length > 0 && <Reactions message={message} />}
              {!isMobileView && <Options message={message} />}
          </div>
        </div>
      </div>
    </div>
  )
}
