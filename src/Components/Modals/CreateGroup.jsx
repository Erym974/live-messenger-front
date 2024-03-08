import React, { useEffect, useState } from 'react'
import useModal from '../../Hooks/useModal'
import useTranslation from '../../Hooks/useTranslation'
import toast from 'react-hot-toast';
import useFriends from '../../Hooks/useFriends';
import Select from 'react-select';
import axios from '../../Api/axios';
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {

    const { t } = useTranslation()
    const { closeModal } = useModal()
    const { friends, fetchFriends } = useFriends()
    const navigate = useNavigate();

    /** set datas */
    const [datas, setDatas] = useState({
        name: "",
        members: [],
    })

    const [availableMembers, setAvailableMembers] = useState([])
    const [creationInProgess, setCreationInProgess] = useState(false)

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
        if(datas.members.length < 2) {
            return toast.error(t('createGroup.membersLength'))
        }

        setCreationInProgess(true)

        const response = await axios.post('/groups', datas)
        if(!response.status) return toast.error(t('createGroup.failed'))

        setCreationInProgess(false)
        closeModal()
        toast.success(t('createGroup.success'))
        console.log(`/messenger/${response?.datas?.id}`);
        navigate(`/messenger/${response?.datas?.id}`)
        

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
            <Select
                defaultValue={null}
                isMulti
                name="members"
                options={availableMembers}
                placeholder={t('createGroup.members')}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={onMembersChange}
            />
        </div>
        <hr className="my-3" />
        </div>
        <div className="modal-footer d-flex g-5 jce">
            {!creationInProgess ? 
                <button className="" onClick={handleForm}>{(t('modal.create'))}</button> :
                <button disabled>{(t('global.saving'))}...</button>
            }
            <button className="bg-danger" onClick={closeModal}>{(t('modal.cancel'))}</button>
        </div>
    </>
  )
}
