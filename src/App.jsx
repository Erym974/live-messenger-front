import './index.scss';
import "./i18n";
import { Toaster } from 'react-hot-toast';

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { Login, Register, Error, Messenger, General, Account, Security, Friends, Home, Careers, Blog, Terms, Privacy, ResetPassword, ActiveAccount } from './Pages/pages'
import AuthenticatedRoute from './Custom/AuthenticatedRoute';
import { useTheme, useModal } from './Hooks/CustomHooks';
import PublicRoute from './Custom/PublicRoute';
import { Modal } from './Components/Modal';
import { Cookie } from './Components/Cookie';
import { useSelector } from 'react-redux';


export default function App() {
  
  const { isModalOpen } = useModal()
  const { cookie } = useSelector(state => state.general)

  useTheme()

  return (
        <>
          <Toaster position="bottom-right" />

          <Router>
          {!cookie && <Cookie />}
          {isModalOpen && <Modal />}
              <Routes>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path="/messenger/:id" element={<Messenger />} />
                        <Route path="/settings/general" element={<General />} />
                        <Route path="/settings/account" element={<Account />} />
                        <Route path="/settings/security" element={<Security />} />
                        <Route path="/settings/friends" element={<Friends />} />
                    </Route>

                    <Route element={<PublicRoute />}>
                      <Route path="/auth/login" element={<Login />} />
                      <Route path="/auth/register" element={<Register />} />
                      <Route path="/auth/reset-password/:token?" element={<ResetPassword />} />
                    </Route>
                    <Route path="/auth/active-account/:token" element={<ActiveAccount />} />
                    

                    <Route path="/" element={<Home />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="*" element={<Error />} />
              </Routes>
          </Router>
        </>
  )
}
