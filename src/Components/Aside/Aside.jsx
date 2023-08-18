import React, { useContext, useState } from 'react'

import { FaMessage, FaMoon, FaBell, FaBellSlash, FaGear, FaArrowLeftLong, FaSun  } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";

import Conversation from "./Tabs/Conversation";

import Theme from '../../Constant/Theme'

import './aside.scss';
import ButtonRounded from '../ButtonRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Aside() {

    const { setAuth, setLogged, auth } = useAuth();
    const navigate = useNavigate()

    const [aside, setAside] = useState(true)

    const { t } = useTranslation()

    const theme = useSelector(state => state.settings.theme)
    const notifications = useSelector(state => state.settings.notifications)
    const responsiveAside = useSelector(state => state.settings.responsiveAside)

    const dispatch = useDispatch()

    const toggleNotifications = () => dispatch({ type: "settings/toggleNotifications" })
    const toggleTheme = () => dispatch({ type: "settings/toggleTheme" })
    
    const goToSettings = () => {
        dispatch({ type: "settings/toggleResponsiveAside", payload: false })
        navigate("/settings/general")
    }

    const search = () => {
        
    }

    const handleLogout = () => {
        localStorage.removeItem('auth');
        setAuth(null);
        setLogged(false);
    }

    return (
        <aside data-toggle={aside} data-toggle-responsive={responsiveAside} >

            <div className="top">
            <img src={auth?.user?.profilePicture} alt={auth?.user?.firstname + " " + auth?.user?.firstname} />
            <div className="right">
                <span><strong>{auth?.user?.firstname} {auth?.user?.firstname}</strong></span>
                <span>{t('chat.online')}</span>
            </div>
            </div>

            <div className="settings">
            <ButtonRounded onClick={search}>
                <AiOutlineSearch /> 
            </ButtonRounded> 
            <ButtonRounded onClick={toggleNotifications}>
                {notifications ? <FaBell /> : <FaBellSlash /> }
            </ButtonRounded>
            <ButtonRounded onClick={toggleTheme}>
                {theme === Theme.DARK ? <FaSun /> : <FaMoon />}
            </ButtonRounded>
            <ButtonRounded onClick={goToSettings}>
                <FaGear />
            </ButtonRounded>
            <ButtonRounded onClick={handleLogout}>
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
