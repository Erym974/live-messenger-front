import React, { useEffect, useState } from 'react'
import { FaFloppyDisk, FaPen } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from '../../../Hooks/CustomHooks';
import toast from 'react-hot-toast';

export function Account() {

    const { t } = useTranslation()

    const { user, updateUser, updatePicture } = useAuth();

    const [datas, setDatas] = useState({ 
        firstname: user?.firstname, 
        lastname: user?.lastname, 
        email: user?.email, 
        biography: user?.biography, 
        coverPicture: user?.coverPicture, 
        profilePicture: user?.profilePicture 
    });

    const maxDescChar = 50;

    useEffect(() => {
        if(!user) return

        setDatas({ 
            firstname: user?.firstname, 
            lastname: user?.lastname, 
            email: user?.email, 
            biography: user?.biography, 
            coverPicture: user?.coverPicture, 
            profilePicture: user?.profilePicture 
        });
    }, [user])

    useEffect(() => {
        const length = document.getElementById('biography').value.length;
        document.querySelector('.charCount').innerHTML = `${length}/${maxDescChar}`;
    }, [datas])

    const handleChange = (evt, key) => {
        if(key === 'biography') {
            const length = evt.target.value.length;
            if(length > maxDescChar) return;
            document.querySelector('.charCount').innerHTML = `${length}/${maxDescChar}`;
        }
        setDatas({ ...datas, [key]: evt.target.value });
    }

    const handlePicture = ({ target: img }, type) => {
        const siblings =[...img.parentElement.children].filter(c=>c!==img)
        const inputFile = siblings.find(c=>c.tagName==='INPUT')
        if(!inputFile) return
        inputFile.click();

        inputFile.addEventListener('change', (evt) => {
            const file = evt.target.files[0];
            if(!file) return;
            updatePicture(file, type);
        })
    }

    const handleSave = async () => {
        let body = {}

        if(datas.firstname !== user?.firstname) body.firstname = datas.firstname;
        if(datas.lastname !== user?.lastname) body.lastname = datas.lastname;
        if(datas.email !== user?.email) body.email = datas.email;
        if(datas.biography !== user?.biography) body.biography = datas.biography;

        if(Object.keys(body).length === 0) return toast.error(t('settings.no_change'))

        updateUser(body)

    }

    return (
        <section id="account">
            <h1>{t('settings.my_account')}</h1>
            <form action="">
                <div className="top">
                    <div className="background-cover" onClick={(e) => { handlePicture(e, 'cover') }}>
                        <img src={datas?.coverPicture} alt="" id="cover-picture-render" />
                        <input type="file" id="cover-picture" className='d-none' />
                    </div>
                    <div className="profile-picture" onClick={(e) => { handlePicture(e, 'profile') }}>
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
                    <textarea type="text" name="biography" id="biography" value={datas?.biography} onChange={(evt) => { handleChange(evt, 'biography') }} placeholder=' ' />
                    <label htmlFor="biography">{t('general.biography')}</label>
                    <span className="charCount">0/40</span>
                </div>
                <div className="form-group">
                    <input type="email" name="email" id="email" value={datas?.email} onChange={(evt) => { handleChange(evt, 'email') }} placeholder=' ' />
                    <label htmlFor="email">{t('general.email')}</label>
                </div>
            </form>
            <div className="row jcfe">
                <button className={`save-button`} onClick={handleSave}>
                    {t('general.save')}
                </button>
            </div>
        </section>
    )
}
