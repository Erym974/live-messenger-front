import React, { useEffect, useState } from 'react'

import { useMessenger, useTranslation } from '../../Hooks/CustomHooks'

import { Tooltip } from 'react-tooltip';

import Message from './Message';
import { Loader } from '../Loader';
import { NoMessageYet } from './NoMessageYet';
import { useDispatch } from 'react-redux';

export default function Messages({ conversation, messages }) {
    
    const { messageHasNextPage, messageIsFetching, setConversation, activeMessage: setActiveMessage, reactToMessage, messageFetchNextPage } = useMessenger()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    
    const [dropdown, setDropdown] = useState(null)

    useEffect(() => {
        if(!conversation) return
        setConversation(conversation?.id)
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

    return (
        <>
            {(!messageIsFetching && messageHasNextPage) && 
                <div id="load-more">
                    <button onClick={messageFetchNextPage}>{t('message.loadMore')}</button>
                </div>
            }
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
