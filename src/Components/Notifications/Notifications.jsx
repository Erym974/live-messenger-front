import React from 'react'
import useNotification from '../../Hooks/useNotification'
import toast from 'react-hot-toast';

const Notifications = () => <> </>;

const FriendRequest = (invitation) => {

    const { notificationMessage } = useNotification()
    if(!invitation) return
    notificationMessage(
        "Demande d'ami !", 
        <><b>{invitation?.emitter.fullname}</b> vous a envoyé une demande d'ami</>,
        <><button onClick={ () => { console.log('accept') } }>Accepter</button><button className="danger" onClick={ () => { console.log('decline') } }>Refuser</button></>,
        { duration: 5000 }
    )

}
Notifications.FriendRequest = FriendRequest;

const FriendRequestAccepted = (friend) => {

    const { notificationMessage } = useNotification()
    if(!friend) return
    notificationMessage(
        "Nouvel ami", 
        <>Vous êtes maintenant ami avec <b>{friend?.fullname}</b></>,
        <><button onClick={ () => { console.log('accept') } }>Dire bonjour !</button></>,
        { duration: 5000 }
    )

}
Notifications.FriendRequest = FriendRequest;


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