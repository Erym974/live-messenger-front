import React, { useEffect, useState } from 'react'
import ButtonRounded from '../../../Components/ButtonRounded';
import { FaFloppyDisk, FaPen } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAuth from '../../../Hooks/useAuth';
import axios from '../../../Api/axios';
import { toast } from 'react-toastify';

export function Account() {

    const { t } = useTranslation()

    const { auth } = useAuth();

    const [saving, setSaving] = useState(false)

    const [datas, setDatas] = useState({ 
        firstname: auth?.user?.firstname, 
        lastname: auth?.user?.lastname, 
        email: auth?.user?.email, 
        description: auth?.user?.description, 
        coverPicture: auth?.user?.coverPicture, 
        profilePicture: auth?.user?.profilePicture 
    });

    const maxDescChar = 50;

    useEffect(() => {
        const length = document.getElementById('description').value.length;
        document.querySelector('.charCount').innerHTML = `${length}/${maxDescChar}`;
    }, [datas])

    const handleChange = (evt, key) => {
        if(key === 'description') {
            const length = evt.target.value.length;
            if(length > maxDescChar) return;
            document.querySelector('.charCount').innerHTML = `${length}/${maxDescChar}`;
        }
        setDatas({ ...datas, [key]: evt.target.value });
    }

    const handleCover = (evt) => {
        const coverInput = document.getElementById('cover-picture');
        coverInput.click();

        coverInput.addEventListener('change', (evt) => {
            const file = evt.target.files[0];
            if(!file) return;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = document.getElementById('cover-picture-render');
                img.src = reader.result;
            }
        })
    }

    const handleProfilePicture = (evt) => {
        const profileInput = document.getElementById('profile-picture');
        profileInput.click();

        profileInput.addEventListener('change', (evt) => {
            const file = evt.target.files[0];
            if(!file) return;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = document.getElementById('profile-picture-render');
                img.src = reader.result;
            }
        })
    }

    const handleSave = () => {
        setSaving(true);
        
        let body = {}

        if(datas.firstname !== auth?.user?.firstname) body.firstname = datas.firstname;
        if(datas.lastname !== auth?.user?.lastname) body.lastname = datas.lastname;
        if(datas.email !== auth?.user?.email) body.email = datas.email;
        if(datas.description !== auth?.user?.description) body.description = datas.description;

        axios.patch(`/users/${auth?.user?.id}`, body, { headers: { Authorization: `Bearer ${auth.accessToken}`, "Content-Type": "application/merge-patch+json" } })
        .then((response) => {
            toast.success(t('general.edit-success'))
            setSaving(false);
        })
        .catch((err) => {
            toast.error(t('general.edit-failed'));
        })

        setTimeout(() => {
            setSaving(false);
        }, 2000);
    }

    return (
        <section id="account">
            <h1>{t('settings.my_account')}</h1>
            <form action="">
                <div className="top">
                    <div className="background-cover" onClick={handleCover}>
                        <img src={datas?.coverPicture} alt="" id="cover-picture-render" />
                        <input type="file" id="cover-picture" className='d-none' />
                    </div>
                    <div className="profile-picture" onClick={handleProfilePicture}>
                        <img src={datas?.profilePicture} alt="" id="profile-picture-render" />
                        <FaPen />
                        <input type="file" id="profile-picture" className='d-none' />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <input type="text" name="firstname" id="firstname" value={datas?.firstname} onChange={(evt) => { handleChange(evt, 'firstname') }} placeholder=' ' />
                        <label htmlFor="text">{t('general.firstname')}</label>
                    </div>
                    <div className="form-group">
                        <input type="text" name="lastname" id="lastname" value={datas?.lastname} onChange={(evt) => { handleChange(evt, 'lastname') }} placeholder=' ' />
                        <label htmlFor="lastname">{t('general.lastname')}</label>
                    </div>
                </div>
                <div className="form-group mb-30">
                    <textarea type="text" name="description" id="description" value={datas?.description} onChange={(evt) => { handleChange(evt, 'description') }} placeholder=' ' />
                    <label htmlFor="description">{t('general.description')}</label>
                    <span className="charCount">0/40</span>
                </div>
                <div className="form-group">
                    <input type="email" name="email" id="email" value={datas?.email} onChange={(evt) => { handleChange(evt, 'email') }} placeholder=' ' />
                    <label htmlFor="email">{t('general.email')}</label>
                </div>
            </form>
            <div className="row jcfe">
                <button className={`save-button ${saving && 'loader-svg'}`} onClick={handleSave}>
                    {saving ? t('general.saving') : t('general.save')}
                    {saving ? <AiOutlineLoading3Quarters /> : <FaFloppyDisk />}
                </button>
            </div>
        </section>
    )
}
