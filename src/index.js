import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from './Pages/Dashboard/Dashboard';
import Error from './Pages/Error';
import Login from './Pages/Authentification/Login';
import Register from './Pages/Authentification/Register';
import { AuthentificationProvider } from './Provider/AuthentificationProvider';

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import store from './rootStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.Fragment>
    <Provider store={store}>
      <AuthentificationProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={2500}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
        <Router>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </AuthentificationProvider>
    </Provider>
  </React.Fragment>
);
