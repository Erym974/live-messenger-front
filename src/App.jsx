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
import { useTheme, useAuth, useModal } from './Hooks/CustomHooks';
import PublicRoute from './Custom/PublicRoute';
import { Modal } from './Components/Modal';
import { socket } from './socket';


export default function App() {
  
  const { fetchAuth, auth } = useAuth()
  const { isModalOpen, searchModal } = useModal()
  
  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    };
  }, [])

  useTheme()

  useEffect(() => {
    fetchAuth()
  }, [])

  useEffect(() => {
    if(!auth) return
    
    socket.emit('authenticateUser', {
      token: auth,
    })

    socket.on('authenticateUser', (result) => {
        if(result.status === false) toast.error("Une erreure est survenue lors de la connexion au serveur.")
    })

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
