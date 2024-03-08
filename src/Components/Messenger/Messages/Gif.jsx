import React from 'react'
import { openImages } from '../../../Slices/imagesSlices'
import { useDispatch } from 'react-redux'
import { FaArrowTurnDown } from 'react-icons/fa6'
import { Options } from '../Options'
import useSettings from '../../../Hooks/useSettings'
import { Reactions } from '../Reactions'
import useTranslation from '../../../Hooks/useTranslation'
import { convertDate } from './../../../Utils/utils';
import useProfile from '../../../Hooks/useProfile'

export const Gif = ({ message, type, option }) => {

  const { isMobileView } = useSettings()

  const dispatch = useDispatch()
  const { t, language } = useTranslation()
  const { showProfile } = useProfile()

  const onMessageClick = () => {
    dispatch(openImages([getGifUrl()]))
  }

  const getGifUrl = () => {
    return message.content.replace('gif:', '')
  }

  return (
    <div data-message={message.id} className={`message ${type} ${message.me ? "me" : "participant"} ${(["bottom", "both"].includes(message.position)) ? "mb-2" : ""}`} style={{ marginBottom: message.reactions.length > 0 ? "15px" : "0px" }}>
      {(!message.me && !option) && <div className="message-profile-picture">
        {(message.position === "bottom" || message.position === "both") && <img src={message.sender.profilePicture} className="message-profile-picture clickable" data-tooltip-id="message-profile" data-tooltip-content={message.sender.fullname} onClick={() => showProfile(message.sender.id)} />}
      </div>}
      <div className="message-body">
        {(message.reply && !option) && <div className="message-reply">
              <FaArrowTurnDown />
              <span>{(message.reply.content && message.files.length === 0) ? message.reply.content : t(message.reply.files.length == 1 ? 'chat.attachment' : 'chat.attachments', { count: message.reply.files.length })}</span>
        </div>}
        <div className="message-content-container">
          <div className={`message-content ${type} ${message.position}`} >
              <img src={getGifUrl()} alt={getGifUrl()} onClick={onMessageClick} data-tooltip-id="message" data-tooltip-content={convertDate(message?.sended_at, language)} />
              {message.reactions.length > 0 && <Reactions message={message} />}
              {!isMobileView && <Options message={message} />}
          </div>
        </div>
      </div>
    </div>
  )
}
