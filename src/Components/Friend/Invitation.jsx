import React, { useRef } from 'react'

import { useProfile, useAuth, useTranslation } from '../../Hooks/CustomHooks'

export const Invitation = ({ invitation }) => {

  const { t, language } = useTranslation()

  const { showProfile } = useProfile()
  const { user } = useAuth()
  const { current: friend } = useRef( invitation?.emitter?.id == user.id ? invitation.receiver : invitation.emitter)

  const convertDate = () => {
    const date = new Date(invitation?.createdAt)
    switch(language){
      case "fr":
        return date.toLocaleDateString("fr-FR")
      case "en":
        return date.toLocaleDateString("en-US")
      default:
        return date.toLocaleDateString("en-US")
    }
  }

  return (
    <div className="friend" onClick={() => { showProfile(friend.id) }}>
        <img src={friend?.profilePicture} alt={friend?.fullname} className="friend-avatar" />
        <div className="right">
            <span className="friend-name">{friend?.fullname}</span>
            <span className="friend-since">{t(`invitations.invitation_sent`, { createdAt: convertDate() })}</span>
        </div>
    </div>
  )
}

export default Invitation