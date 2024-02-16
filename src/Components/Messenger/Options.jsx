import { FaRegTrashAlt, FaPen, FaEllipsisH } from 'react-icons/fa'
import { BsFillEmojiSmileFill } from 'react-icons/bs'

import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { useAuth, useMessenger } from '../../Hooks/CustomHooks'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaReply } from 'react-icons/fa6'

export const Options = ({ message }) => {

    const { t } = useTranslation()
    const [emoji, setEmoji] = useState(null)
    const emojiEvent = useRef() 
    const { deleteMessage, setEdition, edition, reactToMessage, setReply } = useMessenger()
    const { user } = useAuth()

    useEffect(() => {
        if(!emoji) return

        document.addEventListener('click', checkEmojiClick, true)
        document.addEventListener('mousemove', checkMouseDistance, true)
        toggleHoverEffect(true)

        const element = document.querySelector(`.react-emoji-picker[data-message="${message.id}"]`)
        if(!element) return
        emojiEvent.current.screenY > 600 ? element.style.bottom = `40px` : element.style.top = `40px`
        message.sender.id === user.id ? element.style.right = `100px` : element.style.left = `20px`

        return () => {
            toggleHoverEffect(false)
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
        const distance = e.clientY - y
        if(distance > 500 || distance < -200) return setEmoji(null)
    }

    const toggleHoverEffect = (state = true) => {
        document.querySelectorAll('.message-actions-container').forEach(container => {
            if(container.dataset.message != message.id) {
                if(state) container.classList.add('disabled')
                else container.classList.remove('disabled')
            }
        })
    }

    const handleEmoji = (e) => {
        emojiEvent.current = e
        if(emoji) return setEmoji(null)
        setEmoji(message.id)
    }

    const handleClickEmoji = (evt) => {
        reactToMessage(message.id, evt.native)
        setEmoji(null)
    }

    return (
        <>
            { !message.deleted &&
            <div className="message-actions d-flex aic jce gap-5" data-message={message.id}>
                { !["emoji"].includes(message.type) &&<div className="emoji-container">
                    <div data-tooltip-id="tooltip" data-tooltip-content={t('message.react')}  className="react-emoji-picker-container">
                        <BsFillEmojiSmileFill onClick={handleEmoji} />
                        <div className="react-emoji-picker" data-message={message.id}>
                            {emoji && <Picker data={{...data, theme: "light" }} perLine={9} onEmojiSelect={(e) => handleClickEmoji(e)} />}
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
