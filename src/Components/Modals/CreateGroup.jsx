import React, { useEffect, useState } from 'react'
import useModal from '../../Hooks/useModal'
import useTranslation from '../../Hooks/useTranslation'
import toast from 'react-hot-toast';
import useFriends from '../../Hooks/useFriends';
import Select from 'react-select';
import axios from '../../Api/axios';
import { useNavigate } from "react-router-dom";
import { socket } from '../../socket';
import useAuth from '../../Hooks/useAuth';

export default function CreateGroup() {

    const { t } = useTranslation()
    const { closeModal } = useModal()
    const { friends, fetchFriends } = useFriends()
    const { auth } = useAuth()

    /** set datas */
    const [datas, setDatas] = useState({
        name: "",
        members: [],
    })

    const [availableMembers, setAvailableMembers] = useState([])

    // Load friends
    useEffect(() => {
        fetchFriends()
    }, [])

    /** When friends is loaded */
    useEffect(() => {
        if(!friends) return
        setAvailableMembers(friends.map(f => ({value: f.friend.id, label: f.friend.fullname})))
    }, [friends])

    /** When the user valide the group creation */
    const handleForm = async (evt) => {
        evt.preventDefault()
        if(datas.members.length < 2) return toast.error(t('createGroup.membersLength'))

        socket.emit('create-group', { token: auth, group: datas })
        closeModal()

    }

    /** When user select or delete a member */
    const onMembersChange = (evt) => {
        setDatas({
            ...datas,
            members: evt.map(e => e.value)
        })
    }



  return (
    <>
        <div className="modal-body" style={{ height: "80vh" }}>
        <h2 className='text-center'>{t('createGroup.title')}</h2>
        
        <div className="form-group">
            <input type="text" name="name" id="name" value={datas?.name} onChange={(evt) => { setDatas({...datas, name: evt.target.value}) }} placeholder=" " />
            <label htmlFor="text">{t("createGroup.name")}</label>
        </div>
        <div className="form-group">
            <Select defaultValue={null} isMulti name="members" options={availableMembers} placeholder={t('createGroup.members')} className="basic-multi-select" classNamePrefix="select" onChange={onMembersChange} />
        </div>
        <hr className="my-3" />
        </div>
        <div className="modal-footer d-flex g-5 jce">
            <button className="" onClick={handleForm}>{(t('modal.create'))}</button>
            <button className="bg-danger" onClick={closeModal}>{(t('modal.cancel'))}</button>
        </div>
    </>
  )
}
