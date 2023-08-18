import 'react-toastify/dist/ReactToastify.css'
import './index.scss';
import "./i18n";

import React from 'react'
import { Provider } from 'react-redux'
import { AuthentificationProvider } from './Provider/AuthentificationProvider'
import { ToastContainer } from 'react-toastify'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Login from './Pages/Authentification/Login'
import Register from './Pages/Authentification/Register'
import RequireAuth from './Components/RequireAuth/RequireAuth';
import Error from './Pages/Error'

import store from './rootStore';
import Layout from './Components/Layout/Layout';
import RequireVisitor from './Components/RequireAuth/RequireVisitor';

import Messages from './Pages/Messenger/Messages'
import General from './Pages/Settings/General';
import Account from './Pages/Settings/Account';
import Security from './Pages/Settings/Security';
import Friends from './Pages/Settings/Friends';
import Message from './Pages/Messenger/Message';


export default function App() {
  return (
    <Provider store={store}>
      <AuthentificationProvider>
        <ToastContainer position="bottom-left" autoClose={2500} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss pauseOnHover theme="light" />
        
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route element={<RequireVisitor />}>
                      <Route path="/auth/login" element={<Login />} />
                      <Route path="/auth/register" element={<Register />} />
                    </Route>
                    
                    <Route element={<RequireAuth />}>
                        <Route path="/messenger" element={<Messages />} />
                        <Route path="/messenger/:id" element={<Message />} />
                        <Route path="/settings/general" element={<General />} />
                        <Route path="/settings/account" element={<Account />} />
                        <Route path="/settings/security" element={<Security />} />
                        <Route path="/settings/friends" element={<Friends />} />
                    </Route>

                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </Router>

      </AuthentificationProvider>
    </Provider>
  )
}
