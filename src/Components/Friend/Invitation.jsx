import React, { useRef } from 'react'

import { useProfile, useAuth, useTranslation } from '../../Hooks/CustomHooks'

export const Invitation = ({ invitation }) => {

  const { t, language } = useTranslation()

  const { showProfile } = useProfile()
  const { user } = useAuth()
  const { current: emitter } = useRef(invitation?.emitter?.id === user.id ? true : false)
  const { current: friend } = useRef( emitter ? invitation.receiver : invitation.emitter)

  return (
    <div className="friend" onClick={() => { showProfile(friend.id) }}>
        <img src={friend?.profilePicture} alt={friend?.fullname} className="friend-avatar" />
        <div className="right">
            <span className="friend-name">{friend?.fullname}</span>
            <span className="friend-since">{t(emitter ? `settings.invitation_sent` : `settings.invitation_received`)}</span>
        </div>
    </div>
  )
}

export default Invitation