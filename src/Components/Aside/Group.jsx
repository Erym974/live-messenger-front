import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toggleAside } from '../../Slices/settingsSlice'
import { useDispatch } from 'react-redux'
import useMessenger from '../../Hooks/useMessenger'
import toast from 'react-hot-toast'

export const Group = ({ group }) => {

    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [canMove, setCanMove] = useState(true)
    const { groupIsFetching, messagesIsFetching } = useMessenger()

    const [lastMessage, setLastMessage] = useState("")

    useEffect(() => {
        setCanMove((groupIsFetching || messagesIsFetching) ? false : true);
    }, [groupIsFetching, messagesIsFetching]);

    useEffect(() => {
        if(!group) return
        if(!group?.lastMessage) return setLastMessage(<i>{t('chat.notyet')}</i>)
        const filesLength = group?.lastMessage?.files?.length ?? 0
        return setLastMessage(<>{group?.lastMessage?.content ? group?.lastMessage?.content : t(filesLength <= 1 ? 'chat.sentfile' : 'chat.sentfiles', {count: filesLength})}</>)
    }, [group])

    const handleClick = async (id) => {
        if(!canMove) return toast.error(t('error.please_wait'))
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
