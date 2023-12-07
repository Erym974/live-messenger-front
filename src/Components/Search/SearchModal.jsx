import React, { useEffect, useState } from 'react'
import useTranslation from '../../Hooks/useTranslation';
import { useDispatch } from 'react-redux';
import { closeSearchModal } from '../../Slices/settingsSlice';
import useFriends from '../../Hooks/useFriends';
import useMessenger from '../../Hooks/useMessenger';
import useProfile from '../../Hooks/useProfile';
import { useNavigate } from 'react-router-dom';

export const SearchModal = () => {

    const [search, setSearch] = useState("");
    const [results, setResults] = useState({})

    const { friends, invitations } = useFriends()
    const { showProfile } = useProfile()
    const { groups } = useMessenger()
    const navigate = useNavigate()

    useEffect(() => {
        if(!search) return setResults([]);
        let filtered = {};
        filtered['conversations'] = getResultFromGroups()
        filtered['friends'] = getResultFromFriends()
        filtered['invitations'] = getResultFromInvitations()
        setResults(filtered)
    }, [search])

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const getResultFromFriends = () => {
        return friends.filter((friend) => {
            return friend.friend.fullname.toLowerCase().includes(search.toLowerCase());
        }).map(({ friend }) => { return { id: friend.id, fullname: friend.fullname } });
    }

    const getResultFromInvitations = () => {
        return invitations.filter((invitation) => {
            return invitation.emitter.fullname.toLowerCase().includes(search.toLowerCase());
        }).map((invitation) => { return { id: invitation.emitter.id, fullname: invitation.emitter.fullname } });
    }

    const getResultFromGroups = () => {
        return groups.filter((group) => {
            return group.name.toLowerCase().includes(search.toLowerCase());
        }).map((group) => { return { id: group.id, name: group.name } });
    }

  return (
    <div className="modal" id="searchModal">
        <div className="modal-backdrop" onClick={ () => { dispatch(closeSearchModal()) } } ></div>
        <div className="modal-content">
            <div className="input-search">
                <input type="search" name="" id="" value={search} placeholder={t('search.search')} onChange={ (e) => { setSearch(e.target.value) } } />
            </div>
            <div className="results">
                {results['conversations']?.length > 0 && <h2>{t('search.conversations')}</h2>}
                <ul>
                    {results['conversations']?.map((result, index) => {
                        return (
                            <li key={index} onClick={() => { dispatch(closeSearchModal()); navigate(`/messenger/${result.id}`) }}>{result.name}</li>
                        )
                    })}
                </ul>
                {results['friends']?.length > 0 && <h2>{t('search.friends')}</h2>}
                <ul>
                    {results['friends']?.map((result, index) => {
                        return (
                            <li key={index} onClick={() => { dispatch(closeSearchModal()); showProfile(result.id)  }}>{result.fullname}</li>
                        )
                    })}
                </ul>
                {results['invitations']?.length > 0 && <h2>{t('search.invitations')}</h2>}
                <ul>
                    {results['invitations']?.map((result, index) => {
                        return (
                            <li key={index} onClick={() => { dispatch(closeSearchModal()); showProfile(result.id)  }}>{result.fullname}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    </div>
  )
}
