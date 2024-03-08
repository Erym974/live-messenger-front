import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { openImages } from '../../../Slices/imagesSlices'
import useSettings from '../../../Hooks/useSettings'
import { Options } from '../Options'
import { Reactions } from '../Reactions'
import { convertDate } from './../../../Utils/utils';
import useTranslation from '../../../Hooks/useTranslation'
import useProfile from '../../../Hooks/useProfile'

export const File = ({ message, type, option }) => {

  const dispatch = useDispatch()
  const { language } = useTranslation()
  const { isMobileView } = useSettings()
  const { showProfile } = useProfile()

  const onMessageClick = () => {
    dispatch(openImages(message.files.map(file => file.path)))
  }

  return (
    <div data-message={message.id} className={`message ${type} ${message.me ? "me" : "participant"} ${(["bottom", "both"].includes(message.position)) ? "mb-2" : ""}`} style={{ marginBottom: message.reactions.length > 0 ? "15px" : "0px" }}>
      {(!message.me && !option) && <div className="message-profile-picture">
        {(message.position === "bottom" || message.position === "both") && <img src={message.sender.profilePicture} className="message-profile-picture clickable" data-tooltip-id="message-profile" data-tooltip-content={message.sender.fullname} onClick={() => showProfile(message.sender.id)} />}
      </div>}
      <div className='message-body'>
        <div className="message-content-container">
          <div className={`message-content ${type} ${message.position}`} >
            <div className="messages-files" data-tooltip-id="message" data-tooltip-content={convertDate(message?.sended_at, language)}>
              {message.files.map((file, index) => 
                  <div key={index} className="message-file" onClick={onMessageClick}>
                    <img src={file.path} alt={file.name} />
                  </div>
              )}
            </div>
            {message.reactions.length > 0 && <Reactions message={message} />}
            {!isMobileView && <Options message={message} />}
          </div>
        </div>
      </div>
    </div>
  )
}
