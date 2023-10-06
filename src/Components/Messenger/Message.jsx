import React from 'react';

import { useProfile, useAuth, useMessenger } from '../../Hooks/CustomHooks'

const Message = () => <> </>;

const Footer = ({ message }) => {

    const { user } = useAuth()
    const { messages } = useMessenger()
    const { showProfile } = useProfile()

    const convertDate = (id) => {
        const message = messages.find(message => message.id === id)
        const date = new Date(message.sended_at)
        if(date.getDate() === new Date().getDate()) return `${date.getHours()}:${date.getMinutes()}`
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    const imTheSender = () => {
        return message.sender.id == user.id
    }

    return (
        <>
            {!imTheSender() && <span className="message-sender clickable" onClick={() => { showProfile(message?.sender?.id) }}>{message?.sender?.fullname}</span>}
            <span className="message-date">{convertDate(message.id)}</span>
            {message.sender.id == user.id && messages?.indexOf(message) === messages?.length - 1 &&
            <span className={`message-status ${message.status} mt-1`}>
                {message.status === 'seen' && <span>vu</span>}
            </span>
            }
        </>
    )
};
Message.Footer = Footer;

export default Message;