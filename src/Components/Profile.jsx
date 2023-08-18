import React from 'react'

import './profile.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Profile({ profile }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeProfile = (evt) => {
        if(evt.target.id === 'profile') {
            evt.target.classList.add('d-none');
            dispatch({ type: 'profile/showProfile', payload: null })
        }
    }

    const sendMessage = (id) => {
        dispatch({ type: 'messenger/changeConversation', payload: id })
        dispatch({ type: "profile/showProfile", payload: null })
        dispatch({ type: 'settings/toggleResponsiveAside', payload: false })
        navigate(`/messenger/${id}`)
    }

    return (
        <div id="profile" className='modal' onClick={closeProfile}>
            <div className="modal-content">
                <header>
                    <div className="background-cover">
                        <img src={profile.coverPicture} alt="" />
                    </div>
                    <div className="profile-picture">
                        <img src={profile.profilePicture} alt="" />
                    </div>
                </header>
                <main>
                    <div className="d-flex g-10">
                        <h2>{profile.firstname}</h2>
                        <h2>{profile.lastname}</h2>
                    </div>
                    <span>{profile.email}</span>
                    <span className="description">{profile.description}</span>
                </main>
                <footer>
                    {profile.friend && <button onClick={() => { sendMessage(profile.id) }}>Envoyer un message</button>}
                    {profile.friend && <button>Bloquer</button>}
                    {profile.friend ? <button>Retirer l'ami</button> : <button>Ajouter en ami</button>}
                </footer>
            </div>
        </div>
    )
}
