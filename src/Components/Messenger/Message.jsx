import React, { useEffect, useState } from 'react';


import 'moment/min/locales'
import { File } from './Messages/File';
import { Gif } from './Messages/Gif';
import { Text } from './Messages/Text';
import { Loader } from './Messages/Loader';
import useAuth from '../../Hooks/useAuth';
import { Emoji } from './Messages/Emoji';
import { useDispatch, useSelector } from 'react-redux';
import { setSubMenu } from '../../Slices/messengerSlice';
import useMessenger from '../../Hooks/useMessenger';
import { FaPen, FaReply } from 'react-icons/fa6';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useTranslation } from '../../Hooks/CustomHooks';
import { MdEmojiEmotions } from "react-icons/md";

export default function Message({ message }) {

    const [type, setType] = useState("loading")
    const [parsedMessage, setParsedMessage] = useState({})
    const { messages, subMenu } = useSelector(state => state.messenger)
    const { setReply, deleteMessage, setEdition, edition } = useMessenger()
    const { t } = useTranslation()
    const { user } = useAuth()
    const dispatch = useDispatch()

    const [optionsFor, setOptionsFor] = useState(null)

    useEffect(() => {
        if(!message || messages?.length === 0) return
        const datas = {}


        datas.me = (message.sender.id === user.id)
        datas.position = getMessagePosition()
        datas.deleted = message.status === "deleted" ? true : false

        if(isGif()) {
            setType("gif") 
            datas.type = "gif"
        }
        if(containsFiles()) {
            setType('file')
            datas.type = "file"
        }
        if(containsOnlyEmoji()) {
            setType('emoji')
            datas.type = "emoji"
        }
        if(!isGif() && !containsFiles() && !containsOnlyEmoji()) {
            setType('text')
            datas.type = "text"
        }

        

        setParsedMessage({ ...datas, ...message })
    }, [message, messages])

    /** Detect if message is a GIF */
    const isGif = () => {
        const content = message.content?.toLowerCase()
        if(content?.split(' ').length > 1) return false
        if(content?.startsWith('gif:http')) return true
        return false
    }

    /** Detect if message is an Emoji only message */
    const containsOnlyEmoji = () => {
        const emojiFound = message.content?.match(/(?:<a?:[^:]+:\d{18}>|[\p{Extended_Pictographic}])/gu)
        if(!emojiFound) return false;
        let content = message.content
        const contentWithoutEmoji = content.replace(/(?:<a?:[^:]+:\d{18}>|[\p{Extended_Pictographic}])/gu, '').trim();
        return contentWithoutEmoji === "";
    }

    /** Detect if message is an Emoji only message */
    const containsFiles = () => {
        return message.files.length > 0
    }
    
    /** Detect the position of message (top = first of serie, middle = has message top and bottom, bottom = is the last message, both = is the uniq message of user inside the serie) */
    const getMessagePosition = () => {
        const index = messages.indexOf(message)
        if(index === -1) return "unknow"
        const sender = message.sender.id
        if(messages[index - 1]?.sender?.id != sender && messages[index + 1]?.sender?.id == sender) return "top"
        if(messages[index - 1]?.sender?.id === sender && messages[index + 1]?.sender?.id === sender) return "middle";
        if(messages[index - 1]?.sender?.id === sender && messages[index + 1]?.sender?.id != sender) return "bottom";
        if(messages[index - 1]?.sender?.id != sender && messages[index + 1]?.sender?.id != sender) return "both"
    }

    /** Get the message Element */
    const getMessage = (option = false) => {
        switch(type) {
            case "loading":
                return <Loader message={parsedMessage} type="loading" />
                break;
            case "file":
                return <File message={parsedMessage} type="file" option={option} />
                break;
            case "gif":
                return <Gif message={parsedMessage} type="gif" option={option} />
                break;
            case "emoji":
                return <Emoji message={parsedMessage} type="emoji" option={option} />
                break;
            default:
                return <Text message={parsedMessage} type="text" option={option} />
                break;
        }
    }

    useEffect(() => {
        if(subMenu != message.id) return
        // document.addEventListener('click', onEventOutsideSubmenu, true)
        document.addEventListener('touchstart', onEventOutsideSubmenu, true)
        return () => {
            // document.removeEventListener('click', onEventOutsideSubmenu, true)
            document.removeEventListener('touchstart', onEventOutsideSubmenu, true)
        }
    }, [subMenu])

    const onEventOutsideSubmenu = (e) => {
        if(!e.target.closest(`.message[data-message="${message.id}"]`)) dispatch(setSubMenu(null))
    } 

    useEffect(() => {
        if(!parsedMessage) return
        const messageElement = document.querySelector(`.message[data-message="${parsedMessage.id}"]`)
        if(!messageElement) return
        messageElement.addEventListener('touchstart', onTouchStart)
        messageElement.addEventListener('touchmove', onTouchMove)
        messageElement.addEventListener('touchend', onTouchEnd)
        return () => {
            messageElement.removeEventListener('touchstart', onTouchStart)
            messageElement.removeEventListener('touchmove', onTouchMove)
            messageElement.removeEventListener('touchend', onTouchEnd)
        }
    }, [parsedMessage])

    useEffect(() => {
        if(!optionsFor) return
        const optionsBack = document.querySelector('.message-options-container')
        optionsBack.addEventListener('touchstart', onOptionsClick)
        return () => {
            optionsBack.removeEventListener('touchstart', onOptionsClick)
        }
    }, [optionsFor])

    const onOptionsClick = (e) => {
        const optionsBack = document.querySelector('.message-options-container')
        if(e.target != optionsBack) return
        e.preventDefault()
        setOptionsFor(null)
    }

    const onTouchStart = (e) => {
        const messageElement = document.querySelector(`.message[data-message="${parsedMessage.id}"]`)
        if(e.target === document.querySelector('.message-options')) {
            setOptionsFor(null)
            return
        }

        if(!messageElement) return
        messageElement.setAttribute('data-start', e.touches[0].clientX)
        setTimeout(() => {
            if(messageElement.getAttribute('data-x') || !messageElement.getAttribute('data-start') || parsedMessage.deleted) return
            messageElement.setAttribute('data-hold', true)
            setOptionsFor(message)
        }, 750);
    }   

    const onTouchMove = (e) => {
        const messageElement = document.querySelector(`.message[data-message="${parsedMessage.id}"]`)
        if(!messageElement || messageElement.getAttribute('data-hold')) return messageElement?.removeAttribute('data-hold');
        messageElement.setAttribute('data-x', e.touches[0].clientX) 
        
        if(parsedMessage.me){
            // Check the side
            if(e.touches[0].clientX > messageElement.getAttribute('data-start')) return messageElement.setAttribute('data-wrong', true);
            // Remove if is the right side
            if(messageElement.getAttribute('data-wrong')) messageElement.removeAttribute('data-wrong')
            // Check if is the max
            const difference = messageElement.getAttribute('data-start') - e.touches[0].clientX
            if(difference >= 75) messageElement.setAttribute('data-max', true);
            if(difference < 75) messageElement.removeAttribute('data-max');
             // Move the content
            const contentElement = messageElement.querySelector('.message-content')
            if(!messageElement.getAttribute('data-max')) contentElement.style.transform = `translateX(${-difference}px)`

        } else {
            // Check the side
            if(e.touches[0].clientX < messageElement.getAttribute('data-start')) return messageElement.setAttribute('data-wrong', true);
            // Remove if is the right side
            if(messageElement.getAttribute('data-wrong')) messageElement.removeAttribute('data-wrong')
            // Check if is the max
            const difference = e.touches[0].clientX - messageElement.getAttribute('data-start')
            if(difference >= 75) messageElement.setAttribute('data-max', true);
            if(difference < 75) messageElement.removeAttribute('data-max');
            // Move the content
            const contentElement = messageElement.querySelector('.message-content')
            if(!messageElement.getAttribute('data-max')) contentElement.style.transform = `translateX(${difference}px)`
        }

    }

    const onTouchEnd = (e) => {
        const messageElement = document.querySelector(`.message[data-message="${parsedMessage.id}"]`)
        const contentElement = messageElement.querySelector('.message-content')
        if(!messageElement) return
        contentElement.style.transform = `translateX(0px)`
        messageElement.removeAttribute('data-start')
        messageElement.removeAttribute('data-x')
        messageElement.removeAttribute('data-wrong')

        if(!messageElement.getAttribute('data-max') || messageElement.getAttribute('data-hold')) return messageElement.removeAttribute('data-hold')
        messageElement.removeAttribute('data-max')
        setReply(message)

    }

    const handleOptionClick = (option) => {
        switch(option){
            case "reply":
                setReply(message)
                break;
            case "react":
                
                break;
            case "edit":
                edition.active ? setEdition({active: false, id: null, content: null}) : setEdition({active: true, id: message.id, content: message.content})
                break;
            case "delete":
                deleteMessage(message.id)
                break;
        }

        setOptionsFor(null)
    }

    return (
        <>
            {optionsFor && <div className={`message-options-container ${parsedMessage?.me ? "me" : "participant"}`} >
                {getMessage(true)}
                <ul className="message-options-mobile">
                    <li className="message-option" onClick={() => handleOptionClick('react')}>
                        <MdEmojiEmotions />
                        <span>{t('message.react')}</span>
                    </li>
                    <li className="message-option" onClick={() => handleOptionClick('reply')}>
                        <FaReply />
                        <span>{t('message.reply')}</span>
                    </li>
                    {message.sender.id == user.id &&
                        <>
                            {!["gif", "file"].includes(type) && <li className="message-option" onClick={() => handleOptionClick('edit')}><FaPen  /><span>{t('message.edit')}</span></li>}
                            <li className="message-option" onClick={() => handleOptionClick('delete')}><FaRegTrashAlt  /><span>{t('message.delete')}</span></li>
                        </>
                    }
                </ul>
            </div>}
            {getMessage()}
        </>
    )
}