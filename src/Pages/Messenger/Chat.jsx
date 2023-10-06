import React, { useEffect, useState } from 'react'
import { FaEllipsisH, FaTimes } from 'react-icons/fa'
import { FaPaperPlane, FaXmark } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import ButtonRounded from '../../Components/ButtonRounded'
import Messages from '../../Components/Messenger/Messages'
import { toggleResponsiveAside } from '../../Slices/settingsSlice'
import { openImages as openSliceImages } from '../../Slices/imagesSlices'
import { AiFillFileAdd, AiOutlinePicture } from 'react-icons/ai'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { init } from 'emoji-mart'

import './chat.scss'
import { useAuth, useTranslation, useProfile, useMessenger, useCommands, useRealtime } from '../../Hooks/CustomHooks'
import { useIdle } from '@uidotdev/usehooks'
import { NoGroupYet } from '../../Components/Messenger/NoGroupYet'

export default function Chat() {

    const [content, setContent] = useState('')
    const { executeCommand } = useCommands()
    const [limit, setLimit] = useState(0)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const easterIdle = useIdle(15 * 1000);
    const [pictures, setPictures] = useState([])

    const [emoji, toggleEmoji] = useState()
    const { Subscribe } = useRealtime()

    const { user } = useAuth()
    const { group, sendMessage, edition, setEdition, editMessage, loadingGroups, groups, messageReceived, onEditMessage } = useMessenger()

    useEffect(() => {
        if(!group) return

        const newMessageSource = Subscribe(`/messenger/${group.id}/new-message`, (datas) => {
            messageReceived(group.id, datas)
        })

        const newEditSourceSource = Subscribe(`/messenger/${group.id}/edit-message`, (datas) => {
            onEditMessage(datas)
        })

        return () => {
            if(newMessageSource) newMessageSource.close()
            if(newEditSourceSource) newEditSourceSource.close()
        }

    }, [group])

    useEffect(() => {
        if(easterIdle) executeCommand("/idle", false)
    }, [easterIdle, executeCommand])

    useEffect(() => {
        if(edition?.active) {
            setLimit(edition?.content.length)
        } else {
            setLimit(content?.length)
        }
    }, [content, edition])

    useEffect(() => {
        if(!emoji) return 
        document.addEventListener('click', checkEmojiClick, true)
        return () => document.removeEventListener('click', checkEmojiClick, true)
    }, [emoji])

    const checkEmojiClick = (e) => {
        if(e.target.closest('.writter-emoji') === null && e.target.closest('.emoji') === null) toggleEmoji(false)
    }

    useEffect(() => {
        init({ data })
    }, [])

    const handleSendMessage = (event = null, sendEmoji = false) => {
        if(edition.active){
            if(edition.content.trim() < 1 || edition.content.length > 300) return
            editMessage()
        } else {
            if(!sendEmoji) {
                if((content.trim().length < 1 || content.length > 300) && pictures.length === 0) return
                if(content.startsWith('/')) executeCommand(content, true)
                else sendMessage(group.id, content, pictures)
            } else {
                sendMessage(group.id, ":emoji:") 
            }

            setContent('')
        }
    }
    
    const handleKeyDown = (event) => {
        const textarea = event.target
        
        if(event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault()
            textarea.style.height = "40px" 
            handleSendMessage()
            return
        }
        textarea.style.height = "40px" 
        textarea.style.overflowY = "hidden"
        const scrollHeight = event.target.scrollHeight
        if(scrollHeight > 50) textarea.style.height = scrollHeight + "px"
        if(scrollHeight > 150) textarea.style.overflowY = "scroll"
    }

    const toggleDropDown = (evt) => {
        const dropdownMenu = evt.target.closest('.dropdown-button').querySelector('.dropdown-menu')
        if(dropdownMenu.getAttribute('dropdown-menu') === 'true') dropdownMenu.setAttribute('dropdown-menu', 'false')
        else dropdownMenu.setAttribute('dropdown-menu', 'true')
    }

    const handleResponsiveAside = () => dispatch(toggleResponsiveAside(true))

    const { showProfile } = useProfile()

    const handleProfile = () => {
        if(group?.members?.length === 2) {
            const otherUser = group?.members?.find(member => member.id !== user.id)
            if(otherUser) showProfile(otherUser.id)
        }
    }

    const handleEdit = (e) => {
        const value = e.target.value
        if(edition.active) setEdition({ ...edition, content: value})
        else setContent(value)
    }

    const insertEmoji = (e) => {
        const textarea = document.getElementsByTagName('textarea')[0]

        const { selectionStart, selectionEnd } = textarea

        const start = content.substring(0, selectionStart)
        const end = content.substring(selectionEnd, content.length)
        
        const value = start + e.native + end

        if(edition.active) setEdition({ ...edition, content: value})
        else setContent(value)
    }

    const openImages = (images) => {
        if(typeof images === 'string') images = [images]
        dispatch(openSliceImages([...images]))
    }

    const addNewPicture = () => {
        const input = document.createElement('input')
        input.type = "file"
        input.accept = "image/png, image/jpeg, image/jpg"
        input.multiple = true
        input.onchange = (e) => {
            const files = e.target.files
            if(files.length < 1) return
            for(let i = 0; i < files.length; i++) {
                const file = files[i]
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = (e) => {
                    const result = e.target.result
                    console.log(pictures.length, result, [...pictures, result].length);
                }
            }
        }
        input.click()
    }

    const removeImage = (image) => {
        console.log(image);
        const imgs = pictures.filter(picture => picture != image)
        setPictures(imgs)
    }

    const addNewFile = () => {
        
    }

    return (
        <>
        {!loadingGroups && groups?.length === 0 ?
        <>{(!loadingGroups && groups?.length === 0) && <NoGroupYet />}</>
        :
        <section id="chat">
            <header>
                <div className="left">
                    <img src={group?.picture} alt={group?.name} />
                    <div className="right">
                        {group ?
                        <>
                            <span className="name">{group?.name}</span>
                            <span className="status">{group?.members?.length > 2 ? `${ group?.members?.length } participant${group?.members?.length > 1 ? "s" : ""}` : `${ "online" }`}</span>
                        </>
                        :
                            <span>{t('global.loading')}</span>
                        }
                    </div>
                </div>
                <div className="actions">
                    <ButtonRounded size="small dropdown-button" onClick={toggleDropDown}>
                        <FaEllipsisH />
                        <div className="dropdown-menu" dropdown-menu="false">
                            {group &&
                            <div className="dropdown-item p-2 mx-2" onClick={handleProfile}>
                                {group?.members?.length === 2 ? 
                                    <span>{t('profile.see')}</span>
                                : 
                                    t('profile.members')
                                }
                            </div>
                            }
                        </div>
                    </ButtonRounded>
                    <ButtonRounded size="small" attributes={{ "data-open-aside": "true" }} onClick={handleResponsiveAside}>
                        <FaXmark />
                    </ButtonRounded>
                </div>
            </header>
            <main>
                <Messages />
            </main>
            <footer>
                {pictures.length > 0 &&
                <div className="file">
                    {pictures.map((picture, index) => 
                        <div key={index} className="input-file">
                            <img src={picture} alt="" onClick={() => openImages(pictures) } />
                            <FaTimes className="close" onClick={ () => removeImage(pictures) } />
                        </div>
                    )}
                </div>
                }
                <div className="writter">
                    {false && <ButtonRounded size="small" onClick={addNewFile}>
                        <AiFillFileAdd />
                    </ButtonRounded>}
                    <ButtonRounded size="small" onClick={addNewPicture}>
                        <AiOutlinePicture />
                    </ButtonRounded>
                    <div className="textarea-container">
                        <textarea placeholder="Ecrivez votre message" onChange={handleEdit} value={edition.active ? edition.content : content} onKeyDown={handleKeyDown}></textarea>
                        <div className="absolute">
                            {limit > 200 && <span><span className={
                                limit >= 275 && limit < 300 ? 'warning' :
                                limit >= 300 ? 'danger' : ''
                            }>{limit}</span>/300</span>}
                            <div className="emoji">
                                <em-emoji shortcodes=":smile:" size="1.5rem" onClick={() => { toggleEmoji(!emoji) }}></em-emoji>
                                {emoji && <div className="writter-emoji">
                                    <Picker data={data} onEmojiSelect={insertEmoji} />
                                </div> }
                            </div>
                        </div>
                    </div>

                    {content.trim().length > 0 || edition?.content?.trim().length > 0 || pictures.length > 0 ?
                        <ButtonRounded size="small" onClick={handleSendMessage}>
                            <FaPaperPlane />
                        </ButtonRounded>
                    :
                        <div className="clickable">
                            <em-emoji onClick={(e) => { handleSendMessage(e, true) }}  native={group?.emoji ?? "👍"} size="1.5rem"></em-emoji>
                        </div>
                    }
                </div>
            </footer>
        </section>
        }
        </>
    )
}
