import React, { useState } from 'react'


import ButtonRounded from '../../../Components/ButtonRounded'
import './settings.scss';
import { FaXmark } from 'react-icons/fa6';
import Account from './Account';
import Friends from './Friends';
import Security from './Security';
import General from './General';
import { useDispatch, useSelector } from 'react-redux';

export default function Settings() {

  const dispatch = useDispatch()
  const handleResponsiveAside = () => dispatch({ type: "settings/toggleResponsiveAside", payload: true })
  const [tab, setTab] = useState("general")

  return (
    <section id="settings">
          <header className="block">
            <ul>
              <li onClick={() => setTab("general")}>Géneral</li>
              <li onClick={() => setTab("account")}>Mon compte</li>
              <li onClick={() => setTab("security")}>Sécurité</li>
              <li onClick={() => setTab("friends")}>Mes amis</li>
            </ul>
              <ButtonRounded size="small" attributes={{ "data-open-aside": "true" }} onClick={handleResponsiveAside}>
                <FaXmark />
              </ButtonRounded>
          </header>
          <main className="block">
            {tab === "general" && <General />}
            {tab === "account" && <Account />}
            {tab === "security" && <Security />}
            {tab === "friends" && <Friends />}
          </main>
          <footer className="block">

          </footer>
    </section>
    )
}
