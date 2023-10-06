import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const Group = ({ group }) => {

    const navigate = useNavigate()
    const { t } = useTranslation()

    const [lastMessage, setLastMessage] = useState("")

    useEffect(() => {
        if(!group) return
        if(!group?.lastMessage) return setLastMessage(<i>{t('chat.notyet')}</i>)
        return setLastMessage(<>{group?.lastMessage?.content}</>)
    }, [group])

    const handleClick = async (id) => navigate(`/messenger/${id}`)

    return (
        <div className="conversation" onClick={() => { handleClick(group?.id) }}>
            <img src={group?.picture} alt="" />
            <div className="right">
                <span className="name">{group?.name}</span>
                <span className="message"><span className='text-muted'>{lastMessage}</span></span>
            </div>
        </div>
    )
}
