import React, { useEffect, useState } from 'react'

import './friends.scss'
import Friend from '../../../Components/Friend/Friend'
import { fakeFriends } from '../../../faker'
import { useTranslation } from 'react-i18next'

export function Friends() {

  const { t } = useTranslation()
  const [friends, setFriends] = useState(fakeFriends)

  return (
    <section id="friends">
        <h1>{t('settings.my_friends')}</h1>

        <div className="friends-container">
          {friends.map((friend, index) => <Friend key={index} friend={friend} />)}
        </div>
    </section>
  )
}
