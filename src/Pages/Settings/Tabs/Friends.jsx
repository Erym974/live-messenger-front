import React, { useEffect, useState } from 'react'

import './friends.scss'
import Friend from '../../../Components/Friend/Friend'
import { useAuth, useFriends, useTranslation } from '../../../Hooks/CustomHooks';

import { InviteFriend } from '../../../Components/Friends/InviteFriend';
import { InvitationList } from '../../../Components/Friends/InvitationList';

export function Friends() {

  const { t } = useTranslation()
 
  const { filteredFriends, searchFriends, setSearchFriends, loading, invitations, sendInvite, updateFriends } = useFriends()
  const { user } = useAuth()

  const [tab, setTab] = useState("friends") 

  useEffect(() => {
    updateFriends()
  }, [])

  const FriendTab = () => {
    return (
      <>
        <div className="search-friends mt-3">
          <input type="search" id="search" value={searchFriends} onChange={(e) => { setSearchFriends(e.target.value) }} placeholder='Chercher dans mes Amis' />
        </div>
          <div className="friends-container">
            {filteredFriends?.length > 0 ?
              filteredFriends?.map(friend => <Friend key={friend.id} friend={friend} />)
              :
                loading ?
                  <span>Chargement...</span>
                  : 
                  <span>Aucun ami n'a été trouvé</span>
            }
          </div>
        </>
    )
  }

  const InviteTab = () => {
    return (
      <>
        <InviteFriend />
        <InvitationList />
      </>
    )
  }

  return (
    <section id="friends">
        <h1>{t('settings.my_friends')}</h1>

        <ul>
            <li onClick={() => setTab("friends")}>{t('settings.friends')}</li>
            <li onClick={() => setTab("invite")}>{t('settings.friendsInvite')}</li>
        </ul>

        {/*  */}

        
        {tab === "friends" && FriendTab()}
        {tab === "invite" && InviteTab()}

    </section>
  )
}
