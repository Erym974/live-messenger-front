import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import URL from '../../Constant/Url'

import axios from '../../Api/axios';
const LOGIN_URL = 'login';

export default function Login() {

  const [datas, setDatas] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, datas)
      const accessToken = response?.data.token
      const { data: { id, email, firstname, lastname, description, profilePicture, coverPicture } } = await axios.get('me', { headers: { Authorization: `Bearer ${accessToken}` }})
      setAuth((prev) => ({ ...prev, accessToken, remember, user: { id, email, firstname, lastname, description, profilePicture, coverPicture } }))
      navigate('/settings/general')
    } catch (error) {
      toast.error(t('register.login_failed'))
    }

  }

  const handleChange = (evt, key) => setDatas({ ...datas, [key]: evt.target.value });

  return (
    <section id="login">
      <div className="container">
        <header>
          <img src="/ressources/profile_picture.jpg" alt="" />
          <h1>{t('register.login')}</h1>
        </header>
        <main>
          <form id="login-form" action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" name="email" id="email" value={datas.email} onChange={(evt) => { handleChange(evt, 'email') }} placeholder=' ' />
              <label htmlFor="email">{t('general.email')}</label>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="password" value={datas.password} onChange={(evt) => { handleChange(evt, 'password') }} placeholder=' ' />
              <label htmlFor="password">{t('register.password')}</label>
            </div>
            <div className="form-group">
              <input type="checkbox" name="remember" checked={remember} onChange={() => { setRemember(!remember); }} />
              <label htmlFor="remember">{t('register.remember')}</label>
            </div>
          </form>
        </main>
        <footer>
          <input type="submit" form="login-form" value="Login" />
          <span>{t('register.not_registered')} <Link to="/auth/register">{t('register.register')}</Link></span>
        </footer>
      </div>
    </section>
  )
}
