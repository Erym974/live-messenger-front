import React from 'react'
import useNotification from '../../Hooks/useNotification'
import toast from 'react-hot-toast';

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
        { duration: 12500 }
    )

}
Notifications.FriendRequest = FriendRequest;


const PromiseNotif = (callback, loading, success, err) => {

    toast.promise(callback(),
    {
        loading,
        success,
        error: (err) => err.toString().replace("Error: ", ""),
    })

}
Notifications.Promise = PromiseNotif;

export default Notifications;