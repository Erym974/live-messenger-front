import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Hooks/CustomHooks'

export default function Login() {

  const [datas, setDatas] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const { connectUser } = useAuth();
  const { t } = useTranslation()

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true)
    const logged = await connectUser(datas)
    setLoading(false)
  }

  const handleChange = (value, key) => setDatas({ ...datas, [key]: value });

  return (
    <section id="login">
      <div className="container">
        <header>
          <img src="/ressources/profile_picture.jpg" alt="" />
          <h1>{t('auth.login')}</h1>
        </header>
        <main>
          <form id="login-form" action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" name="email" id="email" value={datas.email} onChange={(evt) => { handleChange(evt.target.value, 'email') }} placeholder=' ' />
              <label htmlFor="email">{t('general.email')}</label>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="password" value={datas.password} onChange={(evt) => { handleChange(evt.target.value, 'password') }} placeholder=' ' />
              <label htmlFor="password">{t('auth.password')}</label>
            </div>
            <div className="form-group">
              <input type="checkbox" name="remember" checked={datas.remember} onChange={() => { handleChange(!datas.remember, 'remember') }} />
              <label htmlFor="remember">{t('auth.remember')}</label>
            </div>
          </form>
        </main>
        <footer>
          <input type="submit" form="login-form" disabled={loading} value={loading ? t('auth.loggingin') : t('auth.login')} />
          <span>{t('auth.not_registered')} <Link to="/auth/register">{t('auth.register')}</Link></span>
        </footer>
      </div>
    </section>
  )
}
