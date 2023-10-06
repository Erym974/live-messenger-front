import './index.scss';
import "./i18n";
import { Toaster } from 'react-hot-toast';

import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";


import { Login, Register, Error, Messenger, General, Account, Security, Friends, Home } from './Pages/pages'

import ProtectedRoute from './Custom/ProtectedRoute';

import { useTheme, useAuth, useMessenger, useFriends, useModal, useRealtime } from './Hooks/CustomHooks';

import PublicRoute from './Custom/PublicRoute';
import { Modal } from './Components/Modal';


export default function App() {

  const { fetchAuth, auth, user } = useAuth()
  const { fetchGroups } = useMessenger()
  const { updateFriends } = useFriends()
  const { isModalOpen } = useModal()
  const { Subscribe } = useRealtime()

  useTheme()

  useEffect(() => {
    fetchAuth()
  }, [])

  useEffect(() => {
    if(!auth) return
    fetchGroups()
    updateFriends()
  }, [auth])

  useEffect(() => {
    if(!auth) return
    // let onNewFriendRequestSource = Subscribe(`/friends`, (datas) => {
        
    // })

    // return () => {
    //     if(onNewFriendRequestSource) onNewFriendRequestSource.close()
    // }
}, [auth])

  return (
        <>
          <Toaster
            position="bottom-right"
          />
          {isModalOpen && <Modal />}

          <Router>
              <Routes>
                    <Route element={<ProtectedRoute />}>
                      <Route path="/messenger/:id?" element={<Messenger />} />
                      <Route path="/settings/general" element={<General />} />
                      <Route path="/settings/account" element={<Account />} />
                      <Route path="/settings/security" element={<Security />} />
                      <Route path="/settings/friends" element={<Friends />} />
                    </Route>

                    <Route element={<PublicRoute />}>
                      <Route path="/auth/login" element={<Login />} />
                      <Route path="/auth/register" element={<Register />} />
                    </Route>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Error />} />
              </Routes>
          </Router>
        </>
  )
}
