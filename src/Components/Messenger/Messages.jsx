import React, { useEffect, useState } from 'react'

import { useAuth, useMessenger } from '../../Hooks/CustomHooks'

import { FaRegTrashAlt, FaPen } from 'react-icons/fa'
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'react-tooltip';
import { Options } from './Options';

import Message from './Message';
import { Loader } from '../Loader';
import { NoMessageYet } from './NoMessageYet';
 
export default function Messages() {

    const { group, messages, fetchMessages, activeMessage: setActiveMessage, reactToMessage, loadingMessages } = useMessenger()
    const { t } = useTranslation()
    const { user } = useAuth()
    const [dropdown, setDropdown] = useState(null)

    useEffect(() => {
        if(!dropdown) return 
        document.addEventListener('click', checkDropDownClick, true)
        return () => document.removeEventListener('click', checkDropDownClick, true)
    }, [dropdown])

    const checkDropDownClick = (e) => {
        if(e.target.closest('.dropdown-more') === null) setDropdown(null)
    }

    useEffect(() => {
        if(!group) return
        fetchMessages(group?.id)
    }, [group])

    useEffect(() => {
        const target = document.getElementById("scroll-target");
        target.scrollIntoView({ behavior: 'smooth'});
    }, [])

    const isLastMessageOfUser = (id) => {
        const message = messages.find(message => message.id === id)
        const index = messages.indexOf(message)
        if(index === messages.length - 1) return ""
        if(messages[index + 1]?.sender?.id === message?.sender?.id) return "not-last"
        return "last"
    }

    const containsOnlyEmoji = (message) => {
        const regex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FAC0}-\u{1FAFF}\u{1F004}-\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}\u{1F004}-\u{1F0CF}]/gu;
        const emojiFound = message.content.match(regex);
        return emojiFound !== null && emojiFound.join('') === message.content;
    }

    return (
        <div className="messages">
            <Tooltip id="tooltip" data-tooltip-offset="55" data-tooltip-place="top" />
            {loadingMessages && <Loader />}
            {(!loadingMessages && messages?.length == 0) && <NoMessageYet />}
            {messages?.map(message => 
                <div key={message.id} className={`message ${(message.sender.id === user.id) ? "me" : "participant"} ${isLastMessageOfUser(message.id)}`}>
                    <div className="message-inner">
                        {message.sender.id !== user.id && <img src={message.sender.profilePicture} height="50" width="50" alt="" />}
                        <div className="message-body">
                            <div className="d-flex g-10 aic jcc">
                                {message.status !== "deleted" && <Options message={message} />}
                                {!containsOnlyEmoji(message) ? 
                                <div className="message-content px-4 py-3 rounded" onClick={() => { setActiveMessage(message.id) }} >
                                    <span className="message-text">{message.status !== "deleted" ? <>{message.edited ? <FaPen className="icon" title={t('message.edited')} /> : <></>} {message.content}</> : <><FaRegTrashAlt className="icon" /> <i>{t('message.deleted')}</i></>}</span>
                                </div>
                                :
                                <div className="emojis-container">
                                    <div className="emojis">
                                        {message.content.split('').map((emoji, index) => <span className="emoji" key={index}>{emoji}</span>)}
                                    </div>
                                </div>
                                }
                            </div>
                            
                            <div className="reactions">
                                {message?.reactions?.map((reaction, index) => <span key={index} className={reaction.reacted ? "reacted" : undefined} onClick={() => { reactToMessage(message.id, reaction.content) }}>{reaction.count > 1 && reaction.count}{reaction.content}</span>)}
                            </div>
                            <div className="message-footer">
                                <Message.Footer message={message} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div id="scroll-target"></div>
        </div>
    )
}
