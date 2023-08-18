import React from 'react'

import './../dashboard.scss';
import './settings.scss';
import Aside from "../../Components/Aside/Aside";
import { useDispatch, useSelector } from "react-redux";

import Profile from "../../Components/Profile";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ButtonRounded from '../../Components/ButtonRounded';
import { FaXmark } from 'react-icons/fa6';

function Layout({ element }) {

  // const [responsiveAside, setResponsiveAside] = useState(true)

  const navigate = useNavigate();
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleResponsiveAside = () => {
    dispatch({ type: "settings/toggleResponsiveAside", payload: true })
  }

  const conversation = useSelector(state => state.messenger.conversation)
  const profile = useSelector(state => state.profile.profile)
  const responsiveAside = useSelector(state => state.settings.responsiveAside)

  return (
    <section id="dashboard">
        {profile && <Profile profile={profile} />}
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