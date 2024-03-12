import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toggleAside } from '../../Slices/settingsSlice'
import { useDispatch } from 'react-redux'
import useMessenger from '../../Hooks/useMessenger'
import toast from 'react-hot-toast'
import { socket } from '../../socket'
import useAuth from '../../Hooks/useAuth'
import useFriends from '../../Hooks/useFriends'

export const Group = ({ group }) => {

    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { messagesDatas, groupDatas } = useMessenger()
    const { user } = useAuth()
    const { onlines } = useFriends()

    const [lastMessage, setLastMessage] = useState("")

    useEffect(() => {
        if(!group) return
        if(!group?.lastMessage) return setLastMessage(<i>{t('chat.notyet')}</i>)
        const filesLength = group?.lastMessage?.files?.length ?? 0
        return setLastMessage(<>{group?.lastMessage?.content ? group?.lastMessage?.content : t(filesLength <= 1 ? 'chat.sentfile' : 'chat.sentfiles', {count: filesLength})}</>)
    }, [group])

    const handleClick = async (id) => {
        if(groupDatas.isFetching || messagesDatas.isFetching) return toast.error(t('error.please_wait'))
        dispatch(toggleAside(false));
        navigate(`/messenger/${id}`)
    }

      // Get Online or Offline if the conversation is private
    useEffect(() => {
        if(!group) return;
        if(group.private) {
            const other = group.members.find(member => member.id !== user.id)
            socket.emit('join-is-online', other.id)
            return () => {
                socket.emit('leave-is-online',  other.id)
            }
        }
    }, [group])

    return (
        <div className="conversation" onClick={() => { handleClick(group?.id) }} data-tooltip-id="aside" data-tooltip-content={group?.name} >
            <div className="group-picture">
                <img src={group?.picture} alt="Picture of the group" />
                {(group.private && onlines.includes(group.members.find(member => member.id !== user.id)?.id ?? 0)) && <span className="online"></span>}
            </div>
            <div className="right">
                <span className="name">{group?.name}</span>
                <span className="message">
                    <span className='text-muted'>{lastMessage}</span> 
                </span>
            </div>
        </div>
    )
}
