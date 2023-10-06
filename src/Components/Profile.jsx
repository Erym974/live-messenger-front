import React, { useEffect } from 'react'

import './profile.scss';
import { openImages as openSliceImages } from './../Slices/imagesSlices'

import {  useAuth, useProfile, useFriends, useTranslation } from '../Hooks/CustomHooks';
import { useDispatch } from 'react-redux';

export default function Profile() {

    const { profile, closeProfile, updateProfile } = useProfile()
    const { sendInvite, acceptInvite, deleteFriend, deleteInvitation } = useFriends()
    const { t, language } = useTranslation()

    const { user } = useAuth()
    const dispatch = useDispatch()

    const handleButton = async (type = "") => {
        const id = profile?.relationship?.id ?? profile?.invitation?.id ?? null;
        switch(type) {
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

        updateProfile()

    }

    const convertDate = () => {
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
                    <div className="background-cover">
                        <img onClick={() => { openImages(profile.user.coverPicture) }} className="clickable" src={profile.user.coverPicture} alt="" />
                    </div>
                    <div className="profile-picture">
                        <img onClick={() => { openImages(profile.user.profilePicture) }} className="clickable" src={profile.user.profilePicture} alt="" />
                    </div>
                </header>
                <main>
                    <div className="d-flex g-10">
                        <h3>{profile.user.fullname}</h3>
                    </div>
                    {profile.user.biography && <>
                        <h4 className="pt-2">{t('profile.aboutme')}</h4>
                        <span className="description pb-2">{profile.user.biography}</span>
                    </>}
                    <hr className="my-2" />
                    <div className="d-flex f-c">
                        <span className="">{t(`friends.friends_since`, { since: convertDate() })}</span>
                        <span className="text-muted">{t(`friends.mutual_friend${profile?.relationship?.mutualCount > 0 ? "s" : ""}`, { count: profile?.relationship?.mutualCount})}</span>
                    </div>
                </main>
                <footer>
                    {profile?.relationship && <button onClick={() => {  }}>{t('profile.sendMessage')}</button>}
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
            </div>
        </div>
    )
}
