import React, { useEffect, useRef } from 'react'
import { useAuth, useFriends, useMessenger, useTranslation } from '../../Hooks/CustomHooks'

export const NoMessageYet = () => {

    const { group, sendMessage, groupsIsLoading } = useMessenger()
    const { language } = useTranslation()
    const { friends } = useFriends()
    const { user } = useAuth()

    const friendship = useRef(null)

    useEffect(() => {
        if(!group) return
        if(!group?.private) return
        let friend = group?.members.find(member => member.id != user.id)
        friendship.current = friends.find(fs => fs.friend.id == friend.id)
        if(!friendship.current) friendship.current = { friend }
    }, [group])

    const convertDate = (dateToConvert) => {
        const date = new Date(dateToConvert)
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
        (group && !groupsIsLoading) ?
        <>
            {group?.private ?
                <div className='d-flex aic jcc f-c mt-5'>
                    <h1 className='mb-2'>Commencez la discussion avec {friendship?.current?.friend?.fullname}</h1>
                    {friendship?.current?.since && <span className="text-muted">Vous êtes amis depuis le : {convertDate(friendship?.current?.since)}</span>}
                    {friendship?.current?.mutual && <span className="text-muted">Vous avez {friendship?.current?.mutual?.length} amis en commun</span>}
                    {!friendship?.current?.since && <span className="text-muted">Vous pouvez envoyer une demande d'ami à <b>{friendship?.current?.friend?.fullname}</b></span>}
                    <button className='mt-3' onClick={() => { sendMessage(group.id, "Bonjour 👋") }}>Dire Bonjour 👋</button>
                </div> 
                :
                <div className='d-flex aic jcc f-c mt-5'>
                    <h1 className='mb-2'>Commencez à discuter avec vos amis</h1>
                    <span className="text-muted">Il y a {group?.members?.length} membres dans ce groupe</span>
                    <button className='mt-3' onClick={() => { sendMessage(group.id, "Bonjour 👋") }}>Dire Bonjour 👋</button>
                </div>
            }
        </>
        :
        <div className='d-flex aic jcc f-c mt-5'>
            <h1 className='mb-2 skeleton'>Commencez à discuter avec vos amis</h1>
            <span className="text-muted skeleton">Il y a membres dans ce groupe</span>
        </div>
    )
}
