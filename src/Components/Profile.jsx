import React from 'react'

import './profile.scss';
import { openImages as openSliceImages } from './../Slices/imagesSlices'

import {  useAuth, useProfile, useFriends, useTranslation, useModal } from '../Hooks/CustomHooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

    const { closeModal } = useModal()
    const { profile, closeProfile, showProfile, profileIsLoading } = useProfile()
    const { sendInvite, acceptInvite, deleteFriend, deleteInvitation } = useFriends()
    const { t, language } = useTranslation()

    const { user } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleButton = async (type = "") => {

        if(!profile) return

        const id = profile?.relationship?.id ?? profile?.invitation?.id ?? null;
        switch(type) {
            case "message":
                const chatId = profile?.relationship?.group;
                closeModal()
                closeProfile()
                return navigate(`/messenger/${chatId}`)
                break;
            case "send":
                await sendInvite(profile?.user?.friendCode)
                break;
            case "delete":
                if(!id) return;
                await deleteFriend(id)
                break;
            case "decline":
            case "cancel":
                if(!id) return;
                await deleteInvitation(id)
                break;
            case "accept":
                if(!id) return;
                await acceptInvite(id)
                break;
            default:
                break;
        }

        showProfile(profile?.user.id)

    }

    const convertDate = () => {
        if(!profile) return
        const date = new Date(profile?.relationship?.since)
        switch(language){
          case "fr":
            return date.toLocaleDateString("fr-FR")
          case "en":
            return date.toLocaleDateString("en-US")
          default:
            return date.toLocaleDateString("en-US")
        }
    }

    const openImages = (images) => {
        if(typeof images === 'string') images = [images]
        dispatch(openSliceImages([...images]))
    }

    return (
        <div id="profile" className='modal' >
            <div className="modal-background" onClick={closeProfile}></div>
            <div className="modal-content">
                <header>
                    <div className={`background-cover ${profileIsLoading && 'skeleton'}`}>
                        <img onClick={() => { openImages(profile?.user?.coverPicture) }} className="clickable" src={profile?.user?.coverPicture} alt="Cover picture of user" />
                    </div>
                    <div className={`profile-picture ${profileIsLoading && 'd-none'}`}>
                        <img onClick={() => { openImages(profile?.user?.profilePicture) }} className="clickable" src={profile?.user?.profilePicture} alt="Profile picture of user" />
                    </div>
                </header>
                <main>
                    <div className="d-flex g-10">
                        <h3 className={`${profileIsLoading && 'skeleton'}`}>{profile?.user?.fullname || `Loading...`}</h3>
                    </div>
                    <h4 className="pt-2">{t('profile.aboutme')}</h4>
                    <p className={`mb-2 text-muted ${profileIsLoading && 'skeleton'}`}>{profile?.user?.biography}</p>
                    <hr className="my-2" />
                    {profile?.relationship && 
                    <div className="d-flex f-c">
                        <span className={`${profileIsLoading && 'skeleton'}`}>{t(`friends.friends_since`, { since: convertDate() })}</span>
                        <span className={`text-muted mt-1 ${profileIsLoading && 'skeleton'}`}>{t(`friends.mutual_friend${profile?.relationship?.mutual?.length > 1 ? "s" : ""}`, { count: profile?.relationship?.mutual?.length})}</span>
                    </div>
                    }
                </main>
                {profile && 
                    <footer>
                    {profile?.relationship && <button onClick={() => { handleButton('message') }}>{t('profile.sendMessage')}</button>}
                    {profile?.relationship && <button onClick={() => { handleButton('delete') }}>{t('profile.deleteFriend')}</button>}
                    {(!profile.relationship && !profile?.invitation) && <button onClick={() => { handleButton('send') }}>{t('profile.addToFriend')}</button>}
                    {(!profile?.relationship && profile?.invitation) && 
                        <>
                            {profile?.invitation?.emitter.id === user.id ?
                                <button onClick={() => { handleButton('cancel') }}>{t('profile.cancelFriendRequest')}</button>
                            :
                            <>
                                <button onClick={() => { handleButton('accept') }}>{t('profile.AcceptFriendRequest')}</button>
                                <button onClick={() => { handleButton("decline") }}>{t('profile.DeclineFriendRequest')}</button>
                            </>}
                        </>
                    }
                    </footer>
                }
            </div>
        </div>
    )
}
