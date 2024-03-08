import React, { useEffect, useState } from 'react'
import useModal from '../../Hooks/useModal'
import useTranslation from '../../Hooks/useTranslation'
import { socket } from './../../socket';
import useAuth from '../../Hooks/useAuth';

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import toast from 'react-hot-toast';

 
export default function EditGroup() {

    const { t } = useTranslation()
    const { closeModal, params } = useModal()
    const { auth } = useAuth()
    const [emoji, setEmoji] = useState(false)
    const [datas, setDatas] = useState({ name: params.name, emoji: params.emoji, picture: params.picture })

    /** When the user valide the group creation */
    const handleForm = async (evt) => {
        evt.preventDefault()
        let newData = { ...datas };
        if(datas.picture === params.picture) delete newData.picture
        if(datas.name === params.name) delete newData.name
        if(datas.emoji === params.emoji) delete newData.emoji
        
        if(Object.keys(newData).length === 0) return toast.error('editGroup.no_changes')

        socket.emit('edit-group', {id: params.id, token: auth, group: newData})
        closeModal()
    }

    useEffect(() => {
        if(!emoji) return
        document.addEventListener('click', checkEmojiClick, true)
        document.addEventListener('mousemove', checkMouseDistance, true)
        return () => {
            document.removeEventListener('click', checkEmojiClick, true)
            document.removeEventListener('mousemove', checkMouseDistance, true)
        }
    }, [emoji])

    const checkEmojiClick = (e) => {
        if(e.target.closest('.emoji-form-group') === null) return setEmoji(null)
        return
    }

    const checkMouseDistance = (e) => {
        const element = emoji.target
        if(!element) return
        const rect = element.getBoundingClientRect()
        const y = rect.top + window.scrollY
        const x = rect.left + window.scrollX

        const distanceY = e.clientY - y
        const distanceX = e.clientX - x

        if(distanceX > 40 || distanceX < -360) return setEmoji(null)
        if(distanceY > 500 || distanceY < -10) return setEmoji(null)
        // if(distanceY > 500 || distanceY < -20) return setEmoji(null)
    }

    const handleEmoji = (e) => setEmoji({ event: {screenY: e.screenY, screenX: e.screenX}, target: e.target })

    const handleChange = (value, key) => setDatas({ ...datas, [key]: value });

    const insertEmoji = (evt) => {
        handleChange(evt.native, 'emoji')
        setEmoji(null);
    }

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            handleChange(reader.result, 'picture')
        };
        reader.readAsDataURL(file);
    }

  return (
    <div style={{ minHeight: "80vh", overflowX: "hidden" }}>
        <div className="modal-body">
            <h2 className='text-center'>{t('editGroup.title')}</h2>
            
            <div className="form-group">
                <div className="">
                    <div className="d-flex aic jcc">
                        <img src={datas.picture} alt="Picture of the group" className="rounded mb-3" style={{ height: 100, width: 100, objectFit: 'cover' }} />
                    </div>
                    <input type="file" name="picture" id="picture" onChange={handleFile} />
                </div>
                <div className="form-group">
                    <input type="text" name="name" id="name" value={datas.name} onChange={(evt) => { handleChange(evt.target.value, 'name') }} placeholder=' ' />
                    <label htmlFor="name">{t('editGroup.name')}</label>
                </div>
                <div className="form-group emoji-form-group">
                    <input type="text" name="emoji" id="emoji" value={datas.emoji} onChange={(evt) => { handleChange(evt.target.value, 'emoji') }} placeholder=' ' disabled/>
                    <label htmlFor="emoji">{t('editGroup.emoji')}</label>
                    <em-emoji shortcodes=":smile:" size="1.5rem" onClick={handleEmoji}></em-emoji>
                    {emoji && (
                    <div className="edit-group-emoji">
                        <Picker data={data} onEmojiSelect={insertEmoji} />
                    </div>
                    )}
                </div>
            </div>
            <hr className="my-3" />
        </div>
        <div className="modal-footer d-flex g-5 jce">
            <button className="" onClick={handleForm}>{(t('modal.save'))}</button>
            <button className="bg-danger" onClick={closeModal}>{(t('modal.cancel'))}</button>
        </div>
    </div>
  )
}
