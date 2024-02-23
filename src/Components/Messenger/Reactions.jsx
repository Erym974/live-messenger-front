import React, { useEffect } from 'react'
import useModal from '../../Hooks/useModal'

export const Reactions = ({ message }) => {

  const { openModal } = useModal()

  const getReactionsCount = () => {
    if(message.reactions) {
      return message.reactions.reduce((acc, reaction) => {
        return acc + reaction.count
      }, 0)
    }
  }

  const onReactionsClick = () => openModal("Reactions", message)

  return (
    <>
    {message.reactions && <div className="message-reactions" onClick={onReactionsClick}>
        <div className={`message-react${getReactionsCount() > 1 ? " multiple" : ""}`}>
          {message.reactions.slice(0, 2).map((reaction, index) => 
            <span key={index}>{reaction.content}</span>
          )}
        </div>
        {getReactionsCount() > 1 && <span className="message-react-count">+{getReactionsCount()}</span>}
    </div>}
    </>
  )
}
