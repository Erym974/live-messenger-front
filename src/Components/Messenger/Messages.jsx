import React, { useEffect, useState } from 'react'

import { useMessenger, useTranslation } from '../../Hooks/CustomHooks'

import { Tooltip } from 'react-tooltip';

import Message from './Message';
import { NoMessageYet } from './NoMessageYet';
import { Loader } from '../Loader';
import { useInView } from 'react-intersection-observer';

export default function Messages({ conversation, messages }) {
    
    const { messagesDatas, setConversation, messageFetchNextPage } = useMessenger()
    const { t } = useTranslation()
    
    const [dropdown, setDropdown] = useState(null)
    const [ref, InView] = useInView()

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
        document.addEventListener("messageReceived", scrollToBottom, true)
        return () => document.removeEventListener("messageReceived", scrollToBottom, true)
    }, [])

    useEffect(() => {
        if(!dropdown) return 
        document.addEventListener('click', checkDropDownClick, true)
        return () => document.removeEventListener('click', checkDropDownClick, true)
    }, [dropdown])

    const scrollToBottom = () => {
        const scrollTarget = document.getElementById("scroll-target");
        if(scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth' })
    }

    const checkDropDownClick = (e) => {
        if(e.target.closest('.dropdown-more') === null) setDropdown(null)
    }

    useEffect(() => {
        if((InView && messagesDatas.hasNextPage) && !messagesDatas.isFetching) messageFetchNextPage()
    }, [InView])

    return (
        <>
            <Tooltip id="message" place="bottom" style={{ zIndex: 9999999 }} />
            <Tooltip id="message-profile" place="bottom" style={{ zIndex: 9999999 }} />
            
                <div id="load-more" ref={ref}></div>
                {messagesDatas.isFetching && <Loader />}
            
            <div className="messages">
                <Tooltip id="tooltip" data-tooltip-offset="55" data-tooltip-place="top" style={{ zIndex: 99999 }} />

                {(!messagesDatas.isFetching && messages?.length == 0) && <NoMessageYet />}
                {messages?.map(message => <Message key={message.id} message={message} /> )}
                <div id="scroll-target" data-init="false"></div> 
            </div>
        </>
    )
}
