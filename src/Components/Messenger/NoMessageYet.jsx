import React, { useEffect, useRef } from 'react'
import { useAuth, useMessenger } from '../../Hooks/CustomHooks'

export const NoMessageYet = () => {

    const { group, sendMessage, groupsIsLoading } = useMessenger()
    const { user } = useAuth()

    const friend = useRef(null)

    useEffect(() => {
        if(!group) return
        if(group?.private) friend.current = group?.members.find(member => member.id != user.id)
    }, [group])
 
    return (
        (group && !groupsIsLoading) ?
        <>
            {group?.private ?
                <div className='d-flex aic jcc f-c mt-5'>
                    <h1 className='mb-2'>Commencez la discussion avec {friend?.current?.fullname}</h1>
                    {friend?.current?.friend && <span className="text-muted">Vous êtes amis depuis le : </span>}
                    {friend?.current?.friend && <span className="text-muted">Vous avez {"0"} amis en commun</span>}
                    {!friend?.current?.friend && <span className="text-muted">Vous pouvez envoyer une demande d'ami à <b>{friend?.current?.fullname}</b></span>}
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
