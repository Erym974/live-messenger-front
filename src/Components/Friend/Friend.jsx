import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

export const Friend = ({ friend, activeShowProfile = true }) => {

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const showProfile = () => {
    if(!activeShowProfile) return
    dispatch({ type: "profile/showProfile", payload: friend })
  }

  return (
    <div className="friend" onClick={showProfile}>
        <img src={friend.profilePicture} alt={`${friend.name} ${friend.lastname}`} className="friend-avatar" />
        <div className="right">
            <span className="friend-name">{friend.firstname} {friend.lastname}</span>
            <span className="friend-mutual">{t(`friends.mutual_friend${friend.mutual > 0 ? "s" : ""}`, { count: friend.mutual})}</span>
            <span className="friend-since">{t(`friends.friends_since`, { since: friend.since})}</span>
        </div>
    </div>
  )
}

export default Friend