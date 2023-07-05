import React from 'react'

import './profile.scss';
import { useDispatch } from 'react-redux';

export default function Profile({ profile }) {

    const dispatch = useDispatch();

    const closeProfile = (evt) => {
        if(evt.target.id === 'profile') {
            evt.target.classList.add('d-none');
            dispatch({ type: 'profile/showProfile', payload: null })
        }
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
                    {profile.friend && <button>Envoyer un message</button>}
                    {profile.friend && <button>Bloquer</button>}
                    {profile.friend ? <button>Retirer l'ami</button> : <button>Ajouter en ami</button>}
                </footer>
            </div>
        </div>
    )
}
