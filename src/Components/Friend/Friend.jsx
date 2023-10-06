import React, { useRef } from 'react'

import { useProfile, useAuth, useTranslation } from '../../Hooks/CustomHooks'

export const Friend = ({ friend: relationship }) => {

  const { t, language } = useTranslation()

  const { showProfile } = useProfile()
  const { user } = useAuth()

  const { current: friend } = useRef(relationship.friend)

  const convertDate = () => {
    const date = new Date(relationship?.since)
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
            <span className="friend-since">{t(`friends.friends_since`, { since: convertDate() })}</span>
            <span className="text-muted friend-mutual">{t(`friends.mutual_friend${relationship?.mutualCount > 0 ? "s" : ""}`, { count: relationship.mutualCount})}</span>
        </div>
    </div>
  )
}

export default Friend