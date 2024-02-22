import { FaRegTrashAlt, FaPen, FaEllipsisH } from 'react-icons/fa'
import { BsFillEmojiSmileFill } from 'react-icons/bs'

import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { useAuth, useMessenger } from '../../Hooks/CustomHooks'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaReply } from 'react-icons/fa6'
import EmojiPicker, { Theme } from 'emoji-picker-react';

export const Options = ({ message }) => {

    const { t } = useTranslation()
    const { deleteMessage, setEdition, edition, reactToMessage, setReply, emoji, setEmoji } = useMessenger()
    const { user } = useAuth()

    useEffect(() => {
        if(!emoji) {
            document.querySelectorAll('.message-actions__open').forEach(e => e.classList.remove('message-actions__open'))
            return
        }
        if(emoji.message != message.id) return

        let emojiEvent = emoji.event

        document.addEventListener('click', checkEmojiClick, true)
        document.addEventListener('mousemove', checkMouseDistance, true)

        const element = document.querySelector(`.react-emoji-picker[data-message="${message.id}"]`)
        if(!element) return

        document.querySelector(`.message[data-message="${message.id}"]`)?.classList.add('message-actions__open')

        if(emojiEvent.screenY > 500) {
            element.classList.add('bottom')
            element.classList.remove('top')
        } else {
            element.classList.add('top')
            element.classList.remove('bottom')
        }

        return () => {
            document.removeEventListener('click', checkEmojiClick, true)
            document.removeEventListener('mousemove', checkMouseDistance, true)
        }
    }, [emoji])

    const checkEmojiClick = (e) => {
        if(e.target.closest('.react-emoji-picker') === null) return setEmoji(null)
        if(e.target.closest('.react-emoji-picker').dataset.message != message.id) return setEmoji(null)
        return
    }

    const checkMouseDistance = (e) => {
        const element = document.querySelector(`.react-emoji-picker[data-message="${message.id}"]`)
        if(!element) return
        const rect = element.getBoundingClientRect()
        const y = rect.top + window.scrollY
        const x = rect.left + window.scrollX

        const distanceY = e.clientY - y
        const distanceX = e.clientX - x

        if(message.me) {
            if(distanceX > 400 || distanceX < -30) return setEmoji(null)
        } else {
            if(distanceX > 400 || distanceX < -50) return setEmoji(null)
        }

        if(element.classList.contains('bottom')) {
            if(distanceY > 500 || distanceY < -20) return setEmoji(null)
        } else {
            if(distanceY > 450 || distanceY < -40) return setEmoji(null)
        }
    }

    const handleEmoji = (e) => setEmoji({ message: message.id, event: {screenY: e.screenY} })

    const handleClickEmoji = (evt) => {
        reactToMessage(message.id, evt.native)
        setEmoji(null)
    }

    return (
        <>
            { !message.deleted &&
            <div className="message-actions d-flex aic jce gap-5" data-message={message.id}>
                { !["emoji"].includes(message.type) && <div className="emoji-container">
                    <div data-tooltip-id="tooltip" data-tooltip-content={t('message.react')}  className="react-emoji-picker-container">
                        <BsFillEmojiSmileFill onClick={handleEmoji} />
                        <div className={`react-emoji-picker`} data-message={message.id}>
                            {(emoji && emoji.message == message.id) && <Picker data={{...data, theme: "dark" }} perLine={9} onEmojiSelect={(e) => handleClickEmoji(e)} /> }
                        </div>
                    </div>
                </div>}
                <FaReply data-tooltip-id="tooltip" data-tooltip-content={t('message.reply')} onClick={() => { setReply(message) }} />
                {message.sender.id == user.id &&
                    <>
                        { !["gif", "emoji", "file"].includes(message.type) && <FaPen data-tooltip-id="tooltip" data-tooltip-content={t('message.edit')} className={`${edition?.id === message.id && "selected"}`} onClick={() => { edition.active ? setEdition({active: false, id: null, content: null}) : setEdition({active: true, id: message.id, content: message.content}) }} /> }
                        <FaRegTrashAlt data-tooltip-id="tooltip" data-tooltip-content={t('message.delete')} onClick={() => { deleteMessage(message.id) }} />
                    </>
                }
            </div>
            }
        </>
    )
}
