import React, { useEffect, useState } from 'react'
import ButtonRounded from '../../../Components/ButtonRounded';
import { FaFloppyDisk, FaPen } from 'react-icons/fa6';

export default function Account() {

    const [datas, setDatas] = useState({ 
        firstname: "John", 
        lastname:"Doe", 
        email: "johndoe@gmail.com", 
        description: "Bonjour monde !", 
        coverPicture: "https://picsum.photos/960/540", 
        profilePicture: "https://picsum.photos/200" 
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

    return (
        <section id="account">
            <h1>Mon compte</h1>
            <form action="">
                <div className="top">
                    <div className="background-cover" onClick={handleCover}>
                        <img src={datas.coverPicture} alt="" id="cover-picture-render" />
                        <input type="file" id="cover-picture" className='d-none' />
                    </div>
                    <div className="profile-picture" onClick={handleProfilePicture}>
                        <img src={datas.profilePicture} alt="" id="profile-picture-render" />
                        <FaPen />
                        <input type="file" id="profile-picture" className='d-none' />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <input type="text" name="firstname" id="firstname" value={datas.firstname} onChange={(evt) => { handleChange(evt, 'firstname') }} placeholder=' ' />
                        <label htmlFor="text">Prénom</label>
                    </div>
                    <div className="form-group">
                        <input type="text" name="lastname" id="lastname" value={datas.lastname} onChange={(evt) => { handleChange(evt, 'lastname') }} placeholder=' ' />
                        <label htmlFor="lastname">Nom</label>
                    </div>
                </div>
                <div className="form-group mb-30">
                    <textarea type="text" name="description" id="description" value={datas.description} onChange={(evt) => { handleChange(evt, 'description') }} placeholder=' ' />
                    <label htmlFor="description">Description</label>
                    <span className="charCount">0/40</span>
                </div>
                <div className="form-group">
                    <input type="email" name="email" id="email" value={datas.email} onChange={(evt) => { handleChange(evt, 'email') }} placeholder=' ' />
                    <label htmlFor="email">Email</label>
                </div>
            </form>
            <div className="row jcfe">
                <button className="save-button">
                    Enregistrer
                    <FaFloppyDisk />
                </button>
            </div>
        </section>
    )
}
