import { useState } from 'react'
import './authentification.scss'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function Register() {

  const [datas, setDatas] = useState({email: "", firstname: "", lastname: "", password: "", confirmPassword: ""});
  const { t } = useTranslation()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(datas.password != datas.confirmPassword) return toast.error('Your password does not match');
  }

  const handleChange = (evt, key) => setDatas({...datas, [key]: evt.target.value});

  return (
    <section id="register">
      <div className="container">
        <header>
          <h1>{t('register.register')}</h1>
        </header>
        <main>
          <form id="register-form" action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" name="email" id="email" value={datas.email} onChange={(evt) => { handleChange(evt, 'email') }} placeholder=' ' />
              <label htmlFor="email">{t('general.email')}</label>
            </div>
            <div className="form-group">
              <input type="email" name="email" id="email" value={datas.firstname} onChange={(evt) => { handleChange(evt, 'email') }} placeholder=' ' />
              <label htmlFor="email">{t('general.firstname')}</label>
            </div>
            <div className="form-group">
              <input type="email" name="email" id="email" value={datas.lastname} onChange={(evt) => { handleChange(evt, 'email') }} placeholder=' ' />
              <label htmlFor="email">{t('general.lastname')}</label>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="password" value={datas.password} onChange={(evt) => { handleChange(evt, 'password') }} placeholder=' ' />
              <label htmlFor="password">{t('register.password')}</label>
            </div>
            <div className="form-group">
              <input type="password" name="confirm-password" id="confirm-password" value={datas.confirmPassword} onChange={(evt) => { handleChange(evt, 'confirmPassword') }} placeholder=' ' />
              <label htmlFor="confirm-password">{t('register.confirm_password')}</label>
            </div>
          </form>
        </main>
        <footer>
          <input type="submit" form="register-form" value="Signup" />
          <span>{t('register.already_registered')} <Link to="/auth/login">{t('register.login')}</Link></span>
        </footer>
      </div>
    </section>
  )
}
