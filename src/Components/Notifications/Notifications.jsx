import React from 'react'
import useNotification from '../../Hooks/useNotification'
import toast from 'react-hot-toast';
import useFriends from '../../Hooks/useFriends';
import useTranslation from '../../Hooks/useTranslation';

const Notifications = () => <> </>;

const FriendRequest = (invitation) => {
    
    const { notificationMessage } = useNotification()
    // const { t } = useTranslation()
    
    const handleClick = (choice) => {
        switch(choice) {
            case "accept":
                window.dispatchEvent(new CustomEvent('acceptInvitation', { detail: invitation.id }))
                break;
            default:
                window.dispatchEvent(new CustomEvent('declineInvitation', { detail: invitation.id }))
                break;
        }
    } 

    if(!invitation) return
    notificationMessage(
        "Demande d'ami !", 
        <>
            <b>{invitation?.emitter.fullname}</b> vous a envoyé une demande d'ami
        </>,
        <>
            <button onClick={() => { handleClick("accept"); }}>Accept</button>
            <button className="danger" onClick={() => { handleClick("decline"); }} >Decline</button>
        </>,
        { duration: 7500 }
    )

}
Notifications.FriendRequest = FriendRequest;

const FriendRequestAccepted = (friend) => {

    const { notificationMessage } = useNotification()
    if(!friend) return
    notificationMessage(
        "Nouvel ami", 
        <>Vous êtes maintenant ami avec <b>{friend?.friend?.fullname}</b></>,
        <><button onClick={ () => { console.log('accept') } }>Dire bonjour !</button></>,
        { duration: 5000 }
    )

}
Notifications.FriendRequestAccepted = FriendRequestAccepted;


const PromiseNotif = (callback, loading, success, error) => {

    toast.promise(callback(),
    {
        loading,
        success,
        error,
    })

}
Notifications.Promise = PromiseNotif;

export default Notifications;