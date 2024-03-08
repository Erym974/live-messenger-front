import React, { useEffect, useState } from 'react'
import useModal from '../../Hooks/useModal'
import useTranslation from '../../Hooks/useTranslation'
import useFriends from '../../Hooks/useFriends';
import Select from 'react-select';
import { socket } from './../../socket';
import useAuth from '../../Hooks/useAuth';
 
export default function AddMember() {

    const { t } = useTranslation()
    const { closeModal, params } = useModal()
    const { friends, fetchFriends } = useFriends()
    const { auth } = useAuth()

    const [availableMembers, setAvailableMembers] = useState([])
    const [members, setMembers] = useState([])

    // Load friends
    useEffect(() => {
        fetchFriends()
    }, [])

    useEffect(() => {
        if(!friends) return
        let available = friends.filter(friend => !params.members.includes(friend.friend.id))
        setAvailableMembers(available.map(friend => ({value: friend.friend.id, label: friend.friend.fullname})))
    }, [friends])

    /** When the user valide the group creation */
    const handleForm = async (evt) => {
        socket.emit('add-members', {id: params.id, members, token: auth})
        closeModal()
    }

    /** When user select or delete a member */
    const onMembersChange = (evt) => {
        setMembers(evt.map(e => e.value))
    }

  return (
    <div style={{ height: "80vh" }}>
        <div className="modal-body">
            <h2 className='text-center'>{t('addMember.title')}</h2>
            
            <div className="form-group">
                <Select defaultValue={null} isMulti name="members" options={availableMembers} placeholder={t('addMember.members')} className="basic-multi-select" classNamePrefix="select" onChange={onMembersChange} />
            </div>
            <hr className="my-3" />
        </div>
        <div className="modal-footer d-flex g-5 jce">
            <button className="" onClick={handleForm}>{(t('modal.add'))}</button>
            <button className="bg-danger" onClick={closeModal}>{(t('modal.cancel'))}</button>
        </div>
    </div>
  )
}
