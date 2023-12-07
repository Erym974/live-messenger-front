import React, { useEffect, useState } from 'react'

import { useAuth, useMessenger } from '../../Hooks/CustomHooks'

import { FaRegTrashAlt, FaPen } from 'react-icons/fa'
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'react-tooltip';
import { Options } from './Options';

import Message from './Message';
import { Loader } from '../Loader';
import { NoMessageYet } from './NoMessageYet';
import { useDispatch, useSelector } from 'react-redux';
import { openImages as openSliceImages } from '../../Slices/imagesSlices'

export default function Messages({ conversation, messages }) {
    
    const { messageHasNextPage, messageIsFetching, setConversation, activeMessage: setActiveMessage, reactToMessage, messageFetchNextPage } = useMessenger()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    
    const [dropdown, setDropdown] = useState(null)

    useEffect(() => {
        if(!conversation) return
        setConversation(conversation?.id)
        initMessages()
    }, [conversation])

    useEffect(() => {
        if(messages.length === 0) return
        setTimeout(() => {
            const scrollTarget = document.getElementById("scroll-target");
            if(scrollTarget && scrollTarget.dataset.init === "false") {
                scrollTarget.scrollIntoView({ behavior: 'auto' })
                scrollTarget.dataset.init = "true"
            }
        }, 750);
    }, [messages])

    useEffect(() => {
        window.addEventListener("messageReceived", onMessageReceived, true)
        return () => window.removeEventListener("messageReceived", onMessageReceived, true)
    }, [])

    useEffect(() => {
        if(!dropdown) return 
        document.addEventListener('click', checkDropDownClick, true)
        return () => document.removeEventListener('click', checkDropDownClick, true)
    }, [dropdown])

    const onMessageReceived = () => {
        scrollToBottom()
    }

    const scrollToBottom = () => {
        const scrollTarget = document.getElementById("scroll-target");
        if(scrollTarget) scrollTarget.scrollIntoView({ behavior: 'auto' })
    }

    const checkDropDownClick = (e) => {
        if(e.target.closest('.dropdown-more') === null) setDropdown(null)
    }

    const initMessages = async () => {
        
    }

    const scrollToMessage = (id) => {
        document.getElementById(`message-${id}`)?.scrollIntoView({ behavior: 'smooth' })

        document.getElementById(`message-${id}`)?.classList.add("highlight")

        setTimeout(() => {
            document.getElementById(`message-${id}`)?.classList.remove("highlight")
        }, 4000);
    }

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

    const containsOnlyFiles = (message) => {
        return message.content.trim().length === 0 && message.files.length > 0
    }

    const openImages = (message) => {
        dispatch(openSliceImages(message.files.map(file => file.path)))
    }

    const isGif = (message) => {
        if(message.split(' ').length > 1) return false
        if(message.toLowerCase().startsWith('gif:') && message.toLowerCase().includes('http') && message.toLowerCase().endsWith('.gif')) return true
        return false
    }

    return (
        <>
            {(!messageIsFetching && messageHasNextPage) && <div id="load-more">
                <button onClick={messageFetchNextPage}>{t('message.loadMore')}</button>
            </div>}
            {messageIsFetching && <Loader />}
            <div className="messages">
            <Tooltip id="tooltip" data-tooltip-offset="55" data-tooltip-place="top" />
            {(!messageIsFetching && messages?.length == 0) && <NoMessageYet />}
            {messages?.map(message => <Message key={message.id} message={message} /> )}
            <div id="scroll-target" data-init="false"></div> 
        </div>
        </>
    )
}
