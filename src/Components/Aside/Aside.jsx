import React, { useContext, useState } from 'react'

import { FaMessage, FaMoon, FaBell, FaBellSlash, FaGear, FaArrowLeftLong, FaSun  } from "react-icons/fa6";

import Conversation from "./Tabs/Conversation";

import Theme from '../../Constant/Theme'

import './aside.scss';
import ButtonRounded from '../ButtonRounded';
import { useDispatch, useSelector } from 'react-redux';

export default function Aside() {

    const [aside, setAside] = useState(true)

    const theme = useSelector(state => state.settings.theme)
    const notifications = useSelector(state => state.settings.notifications)
    const responsiveAside = useSelector(state => state.settings.responsiveAside)

    const dispatch = useDispatch()

    const toggleNotifications = () => dispatch({ type: "settings/toggleNotifications" })
    const toggleTheme = () => dispatch({ type: "settings/toggleTheme" })
    
    const goToSettings = () => {
        dispatch({ type: "settings/toggleResponsiveAside", payload: false })
        dispatch({ type: "messenger/changeConversation", payload: -1})
    }

    const goToChat = () => {
        dispatch({ type: "settings/toggleResponsiveAside", payload: false })
        dispatch({ type: "messenger/openLastConversation" })
    }

    return (
        <aside data-toggle={aside} data-toggle-responsive={responsiveAside} >

            <div className="top">
            <img src="/ressources/profile_picture.jpg" alt="" />
            <div className="right">
                <span><strong>John Doe</strong></span>
                <span>En ligne</span>
            </div>
            </div>

            <div className="settings">
            <ButtonRounded onClick={goToChat}>
                <FaMessage /> 
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
