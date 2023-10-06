import React, { useEffect } from 'react'

import './../dashboard.scss';
import './settings.scss';
import Aside from "../../Components/Aside/Aside";
import { useDispatch, useSelector } from "react-redux";

import Profile from "../../Components/Profile";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ButtonRounded from '../../Components/ButtonRounded';
import { FaXmark } from 'react-icons/fa6';
import { useProfile } from '../../Hooks/CustomHooks';
import { useDocumentTitle } from '@uidotdev/usehooks';
import useNotification from '../../Hooks/useNotification';
import Notifications from '../../Components/Notifications/Notifications';
import { ModalImage } from '../../Components/ModalImage';

function Layout({ element, name }) {

  const navigate = useNavigate();
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    // Notifications.FriendRequest({ emitter: { fullname: "Rémy Richard" } })
  }, [useDocumentTitle(`Messenger | ${name}`)])

  const handleResponsiveAside = () => {
    dispatch({ type: "settings/toggleResponsiveAside", payload: true })
  }

  const { profile } = useProfile()
  const { open: openImage } = useSelector(state => state.images)

  return (
    <section id="dashboard">
        {profile && <Profile />}
        {openImage && <ModalImage />}
        <Aside />
        <section id="settings">
            <header className="block">
            <ul>
                <li onClick={() => navigate("/settings/general")}>{t('settings.general')}</li>
                <li onClick={() => navigate("/settings/account")}>{t('settings.my_account')}</li>
                <li onClick={() => navigate("/settings/security")}>{t('settings.security')}</li>
                <li onClick={() => navigate("/settings/friends")}>{t('settings.my_friends')}</li>
            </ul>
                <ButtonRounded size="small" attributes={{ "data-open-aside": "true" }} onClick={handleResponsiveAside}>
                <FaXmark />
                </ButtonRounded>
            </header>
            <main className="block">
                {element}
            </main>
            <footer className="block">

            </footer>
        </section>
    </section>
  )
}

export default Layout