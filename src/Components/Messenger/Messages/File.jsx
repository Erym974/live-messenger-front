import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { openImages } from '../../../Slices/imagesSlices'
import useSettings from '../../../Hooks/useSettings'
import { Options } from '../Options'
import { Reactions } from '../Reactions'

export const File = ({ message, type, option }) => {

  const dispatch = useDispatch()
  const { isMobileView } = useSettings()

  const onMessageClick = () => {
    dispatch(openImages(message.files.map(file => file.path)))
  }

  return (
    <div data-message={message.id} className={`message ${type} ${message.me ? "me" : "participant"} ${(["bottom", "both"].includes(message.position)) ? "mb-2" : ""}`} style={{ marginBottom: message.reactions.length > 0 ? "15px" : "0px" }}>
      {(!message.me && !option) && <div className="message-profile-picture">
        {(message.position === "bottom" || message.position === "both") && <img src={message.sender.profilePicture} className="message-profile-picture" />}
      </div>}
      <div className="message-content-container">
        <div className={`message-content ${type} ${message.position}`} >
          {message.files.map((file, index) => 
              <div key={index} className="message-file" onClick={onMessageClick}>
                <img src={file.path} alt={file.name} />
              </div>
          )}
          {message.reactions.length > 0 && <Reactions message={message} />}
          {!isMobileView && <Options message={message} />}
        </div>
      </div>
    </div>
  )
}
