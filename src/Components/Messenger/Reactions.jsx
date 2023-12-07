import React from 'react'

export const Reactions = ({ message }) => {
  return (
    <>
    {message.reactions && <div className="message-reacts">
        {message.reactions.map((reaction, index) => <div className="message-react" key={index}>
            <span>{reaction.content}</span>
            {reaction.count > 1 && <span>+{reaction.count}</span>}
        </div>)}
    </div>}
    </>
  )
}
