import React, { useState, useEffect } from 'react';
import { AuthentificationContext } from '../Context/AuthentificationContext';

export const AuthentificationProvider = ({ children }) => {

  const [session, setSession] = useState({jwt: null});

  useEffect(() => {
    if(localStorage.getItem('session') === null) localStorage.setItem('session', JSON.stringify(session));
    else setSession(JSON.parse(localStorage.getItem('session')))
  }, []);

  return (
    <AuthentificationContext.Provider value={{ session, setSession }}>
      {children}
    </AuthentificationContext.Provider>
  );
};