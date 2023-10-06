import React, { useContext, useState } from 'react'

import { FaBell, FaBellSlash, FaGear, FaArrowLeftLong } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

import Conversation from "./Tabs/Conversation";

import './aside.scss';
import ButtonRounded from '../ButtonRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {  useAuth, useTheme } from '../../Hooks/CustomHooks';
import { useNavigate } from 'react-router-dom';

export default function Aside() {

    const { logoutUser, user } = useAuth();
    const navigate = useNavigate()

    const [aside, setAside] = useState(true)

    const { t } = useTranslation()

    const { toggleTheme, themeIcon } = useTheme()

    const notifications = useSelector(state => state.settings.notifications)
    const responsiveAside = useSelector(state => state.settings.responsiveAside)

    const dispatch = useDispatch()

    const toggleNotifications = () => dispatch({ type: "settings/toggleNotifications" })
    
    const goToSettings = () => {
        dispatch({ type: "settings/toggleResponsiveAside", payload: false })
        navigate("/settings/general")
    }

    const search = () => {
        
    }

    return (
        <aside data-toggle={aside} data-toggle-responsive={responsiveAside} >

            <div className="top">
            <img src={user?.profilePicture} alt={user?.firstname + " " + user?.lastname} />
            <div className="right">
                <span><strong>{user?.firstname} {user?.lastname}</strong></span>
                <span>{t('chat.online')}</span>
            </div>
            </div>

            <div className="settings">
            {/* <ButtonRounded onClick={search}>
                <AiOutlineSearch /> 
            </ButtonRounded>  */}
            <ButtonRounded onClick={toggleNotifications}>
                {notifications ? <FaBell /> : <FaBellSlash /> }
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
            <button onClick={() => { setAside(!aside) }}><FaArrowLeftLong /></button>
            </div>

        </aside>
    )
}
