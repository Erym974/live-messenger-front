import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toggleAside } from '../../Slices/settingsSlice'
import { useDispatch } from 'react-redux'

export const Group = ({ group }) => {

    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [lastMessage, setLastMessage] = useState("")

    useEffect(() => {
        if(!group) return
        if(!group?.lastMessage) return setLastMessage(<i>{t('chat.notyet')}</i>)
        const filesLength = group?.lastMessage?.files?.length ?? 0
        console.log(group?.lastMessage);
        return setLastMessage(<>{group?.lastMessage?.content ? group?.lastMessage?.content : t(filesLength <= 1 ? 'chat.sentfile' : 'chat.sentfiles', {count: filesLength})}</>)
    }, [group])

    const handleClick = async (id) => {
        dispatch(toggleAside(false));
        navigate(`/messenger/${id}`)
    }

    return (
        <div className="conversation" onClick={() => { handleClick(group?.id) }}>
            <img src={group?.picture} alt="Picture of the group" />
            <div className="right">
                <span className="name">{group?.name}</span>
                <span className="message">
                    {group?.lastMessage?.unread ?
                        <span className="text-muted unread">{lastMessage}</span>
                        :
                        <span className='text-muted'>{lastMessage}</span> 
                    }
                </span>
            </div>
        </div>
    )
}
