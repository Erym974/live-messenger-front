import React, { useContext, useEffect, useState } from 'react'

import { FaBell, FaBellSlash, FaGear, FaArrowLeftLong } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

import Conversation from "./Conversation";

import './aside.scss';
import ButtonRounded from '../ButtonRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {  useAuth, useTheme } from '../../Hooks/CustomHooks';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { openSearchModal, toggleAside } from '../../Slices/settingsSlice';

export default function Aside() {

    const { logoutUser, user } = useAuth();
    const navigate = useNavigate()
    const { asideState } = useSelector(state => state.settings)

    const { t } = useTranslation()

    const { toggleTheme, themeIcon } = useTheme()

    const dispatch = useDispatch()
    
    const goToSettings = () => {
        dispatch(toggleAside(false));
        navigate("/settings/general")
    }

    useEffect(() => {
        window.addEventListener('keydown', onCtrlF, true)
        return () => {
            window.removeEventListener('keydown', onCtrlF, true)
        }
    }, [])

    const onCtrlF = (e) => {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault()
            dispatch(openSearchModal())
        }
    }

    return (
        <aside data-toggle={asideState} >

            <div className="top">
            <img src={user?.profilePicture} alt={user?.firstname + " " + user?.lastname} />
            <div className="right">
                <span><strong>{user?.firstname} {user?.lastname}</strong></span>
                <span>{t('chat.online')}</span>
            </div>
            </div>

            <div className="settings">
            <ButtonRounded onClick={() => { dispatch(openSearchModal()) }}>
                <FaSearch />
            </ButtonRounded>
            <ButtonRounded onClick={toggleTheme}>
                {themeIcon}
            </ButtonRounded>
            <ButtonRounded onClick={goToSettings}>
                <FaGear />
            </ButtonRounded>
            <ButtonRounded onClick={logoutUser}>
                <MdLogout />
            </ButtonRounded>
            </div>

            <div className="content">
                <Conversation />
            </div>

            <div className="bottom">
            <button onClick={() => { dispatch(toggleAside(!asideState)) }}><FaArrowLeftLong /></button>
            </div>

        </aside>
    )
}
