import React, { useState, useEffect } from 'react';
import { AuthentificationContext } from '../Context/AuthentificationContext';
import axios from '../Api/axios';

export const AuthentificationProvider = ({ children }) => {

  const [auth, setAuth] = useState(null);
  const [logged, setLogged] = useState(true);

  useEffect(() => {
      const accessToken = localStorage.getItem('auth');
      if(accessToken === null) {
        setLogged(false);
        return;
      }
      setLogged(true)
      axios.get('me', { headers: { Authorization: `Bearer ${accessToken}` }}).then((response) => {
        const { data: { id, email, firstname, lastname, description, profilePicture, coverPicture } } = response;
        setAuth((prev) => ({ ...prev, accessToken, remember: false, user: { id, email, firstname, lastname, description, profilePicture, coverPicture  } }))
      })
      .catch(() => {
        setLogged(false);
        localStorage.removeItem('auth');
      })
  }, [])

  useEffect(() => {
    if (auth === null) return;
    if(auth.remember) localStorage.setItem('auth', auth.accessToken);
    setLogged(true);
  }, [auth])

  return (
    <AuthentificationContext.Provider value={{ auth, setAuth, logged, setLogged }}>
      {children}
    </AuthentificationContext.Provider>
  );
};