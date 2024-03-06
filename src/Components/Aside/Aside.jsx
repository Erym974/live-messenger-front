import React, { useEffect } from 'react'

import { FaGear, FaArrowLeftLong } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdLogout } from "react-icons/md";

import './aside.scss';
import ButtonRounded from '../ButtonRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {  useAuth, useMessenger, useModal, useTheme } from '../../Hooks/CustomHooks';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { openSearchModal, toggleAside } from '../../Slices/settingsSlice';
import { Loader } from '../Loader';
import { Group } from './Group';

export default function Aside() {

    const { logoutUser, user } = useAuth();
    const { fetchGroups, groups, groupsIsLoading } = useMessenger()
    const { openModal } = useModal();
    const navigate = useNavigate()
    const { asideState } = useSelector(state => state.settings)

    const { t } = useTranslation()

    const { toggleTheme, themeIcon } = useTheme()

    const dispatch = useDispatch()
    
    /** Redirect user to settings */
    const goToSettings = () => {
        dispatch(toggleAside(false));
        navigate("/settings/general")
    }

    /** Listen event for CTRL+F */
    useEffect(() => {
        window.addEventListener('keydown', onCtrlF, true)

        return () => {
            window.removeEventListener('keydown', onCtrlF, true)
        }
    }, [])

    /** When user press CTRL+F */
    const onCtrlF = (e) => {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault()
            dispatch(openSearchModal())
        }
    }

    /** When user click on create group button */
    const handleCreateGroup = () => openModal("CreateGroup")

    /** When user is logged or updated */
    useEffect(() => {
        if(!user && !groups) return
        fetchGroups()
    }, [user])

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
                <>
                    <button className="btn-type-2 w-100" onClick={handleCreateGroup}>
                        <IoMdAdd />
                    </button>
                </>
                <section className="conversations">
                    {groupsIsLoading && <Loader />}
                    {groups?.map(group => 
                        <Group key={group.id} group={group} />
                    )}
                </section>
            </div>

            <div className="bottom">
            <button className="btn-type-2" onClick={() => { dispatch(toggleAside(!asideState)) }}><FaArrowLeftLong /></button>
            </div>

        </aside>
    )
}
