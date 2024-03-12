import { useCopyToClipboard } from '@uidotdev/usehooks';
import Cleave from 'cleave.js/react'
import React, { useEffect, useState } from 'react'
import useTranslation from '../../../Hooks/useTranslation';
import toast from 'react-hot-toast';
import useFriends from '../../../Hooks/useFriends';
import useAuth from '../../../Hooks/useAuth';

export const InviteFriend = () => {

    const [friendCode, setFriendCode] = useState("")
    const { t } = useTranslation()
    const [copiedText, copyToClipboard] = useCopyToClipboard();

    const { user } = useAuth()

  const { sendInvite } = useFriends()


    useEffect(() => {
        if(!friendCode) return
        if(friendCode.length < 16 || friendCode.length > 16) return
    }, [friendCode])

    useEffect(() => {
        if(!copiedText) return
        toast.success(t('friends.friendCodeCopied'))
      }, [copiedText])

    const handleSendInvite = async () => sendInvite(friendCode)

  return (
    <div className="invite-friends-input mt-4">
        <div className="input">
            <Cleave placeholder="00000-00000-00000" type="search" options={{
                    blocks: [5, 5, 5],
                    delimiter: '-',
                    numericOnly: true
                }}
                onChange={(e) => { setFriendCode(e.target.value) }}
            />
            <button onClick={handleSendInvite}>{t('settings.sendInvite')}</button>
        </div>
        <span className="text-muted clickable" onClick={() => { copyToClipboard(user?.friendCode) }}>{t('friends.friendCode', {code: user?.friendCode})}</span>
    </div>
  )
}
