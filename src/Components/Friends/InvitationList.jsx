import React, { useEffect, useState } from 'react'
import useFriends from '../../Hooks/useFriends'
import useAuth from '../../Hooks/useAuth'
import useTranslation from '../../Hooks/useTranslation'
import Friend from '../Friend/Friend'
import Invitation from '../Friend/Invitation'

export const InvitationList = () => {

    const { invitations } = useFriends()
    const { user } = useAuth()
    const { t } = useTranslation()

    const [sent, setSent] = useState([])
    const [received, setReceived] = useState([])

    useEffect(() => {
        if(!invitations) return

        console.log(invitations);

        setSent(invitations?.filter(invitation => invitation?.emitter?.id === user.id))
        setReceived(invitations?.filter(invitation => invitation?.emitter?.id !== user.id))

    }, [invitations])

  return (
    <div className="mt-3">
        <h2>{t('settings.receive')}</h2>
        <div className="friends-container">
            {received?.map(invitation => <Invitation key={invitation.id} invitation={invitation} />)}
        </div>
        <h2>{t('settings.sended')}</h2>
        <div className="friends-container">
            {sent?.map(invitation => <Invitation key={invitation.id} invitation={invitation} />)}
        </div>
    </div>
  )
}
