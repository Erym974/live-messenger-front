import React from 'react'
import { useDispatch } from 'react-redux'

export const Friend = ({ friend, activeShowProfile = true }) => {

  const dispatch = useDispatch()

  const showProfile = () => {
    if(!activeShowProfile) return
    dispatch({ type: "profile/showProfile", payload: friend })
  }

  return (
    <div className="friend" onClick={showProfile}>
        <img src={friend.profilePicture} alt={`${friend.name} ${friend.lastname}`} className="friend-avatar" />
        <div className="right">
            <span className="friend-name">{friend.firstname} {friend.lastname}</span>
            <span className="friend-mutual">{friend.mutual} amis en commun</span>
            <span className="friend-since">Amis depuis le {friend.since}</span>
        </div>
    </div>
  )
}

export default Friend