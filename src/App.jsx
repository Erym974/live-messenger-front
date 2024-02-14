import './index.scss';
import "./i18n";
import toast, { Toaster } from 'react-hot-toast';

import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";


import { Login, Register, Error, Messenger, General, Account, Security, Friends, Home } from './Pages/pages'
import ProtectedRoute from './Custom/ProtectedRoute';
import { useTheme, useAuth, useModal, useFriends, useMessenger } from './Hooks/CustomHooks';
import PublicRoute from './Custom/PublicRoute';
import { Modal } from './Components/Modal';
import { socket } from './socket';


export default function App() {
  
  const { fetchAuth, user } = useAuth()
  const { newInvite } = useFriends()
  const { onKick, } = useMessenger()
  const { isModalOpen, searchModal } = useModal()
  
  /** If there is not Auth then don't connect to socket */
  useEffect(() => {
    if(!user) return
    socket.connect()
    return () => {
      socket.disconnect()
    };
  }, [user])

  useTheme()

  useEffect(() => {
    fetchAuth()
  }, [])

    /**
     * 
     * On User Connect
     * 
     */
    useEffect(() => {
      if(!user) return
  
      /* Subscribe to invitations */
      socket.emit('join-invitation', {code: user?.friendCode})

      /** When we receive new invite event */
      socket.on('invitation-received', newInvite)
      socket.on('kicked', onKick)
      return () => {
          socket.off('invitation-received')
          socket.off('kicked')
      }
  }, [user])

  return (
        <>
          <Toaster
            position="bottom-right"
          />
          
          <Router>
          {isModalOpen && <Modal />}
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
