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
    const [emoji, toggleEmoji] = useState(null)
    const [dropdown, setDropdown] = useState(null)
    const emojiEvent = useRef() 
    const { deleteMessage, setEdition, edition, reactToMessage, setReply } = useMessenger()
    const { user } = useAuth()

    useEffect(() => {
        if(!emoji) return

        document.addEventListener('click', checkEmojiClick, true)
        document.addEventListener('mousemove', checkMouseDistance, true)
        toggleHoverEffect(true)

        const element = document.querySelector(`.emoji[data-message="${message.id}"]`)
        emojiEvent.current.screenY > 600 ? element.style.bottom = `40px` : element.style.top = `40px`
        message.sender.id === user.id ? element.style.right = `100px` : element.style.left = `20px`

        return () => {
            toggleHoverEffect(false)
            document.removeEventListener('click', checkEmojiClick, true)
            document.removeEventListener('mousemove', checkMouseDistance, true)
        }
    }, [emoji])

    const checkEmojiClick = (e) => {
        if(e.target.closest('.emoji') === null) return toggleEmoji(null)
        if(e.target.closest('.emoji').dataset.message != message.id) return toggleEmoji(null)
        return
    }

    const checkMouseDistance = (e) => {
        const element = document.querySelector(`.emoji[data-message="${message.id}"]`)

        // get element position 
        const rect = element.getBoundingClientRect()
        const y = rect.top + window.scrollY

        const distance = e.clientY - y
        if(distance > 500 || distance < -200) return toggleEmoji(null)

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
        if(!emoji) return
        reactToMessage(emoji, e.native)
        toggleEmoji(null)
    }

    const handleClickEmoji = (e) => {
        console.log("test");
        emojiEvent.current = e
        toggleEmoji(message.id)
    }

    const handleReply = (message) => {
       setReply(message) 
    }

    return (
        <>
            { !message.deleted && 
            <div className="message-actions d-flex aic jce gap-5" data-message={message.id}>
                { !["emoji"].includes(message.type) &&<div className="emoji-container">
                    <div data-tooltip-id="tooltip" data-tooltip-content={t('message.react')}>
                    <BsFillEmojiSmileFill  className="react-icon" onClick={handleClickEmoji} />
                    {emoji && <div className="emoji" data-message={message.id} >
                        <Picker data={{...data, theme: "light" }} perLine={9} onEmojiSelect={handleEmoji} />
                    </div>}
                    </div>
                </div>}
                <FaReply data-tooltip-id="tooltip" data-tooltip-content={t('message.reply')} onClick={() => { handleReply(message) }} />
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
