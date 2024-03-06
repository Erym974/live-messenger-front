import { useState } from 'react'
import './authentification.scss'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth, useTranslation } from '../../Hooks/CustomHooks'
import { Navbar } from '../../Components/Public/Navbar';
import { Footer } from '../../Components/Public/Footer';

export default function Register() {

  const [datas, setDatas] = useState({email: "", firstname: "", lastname: "", password: "", password2: ""});
  const { registerUser } = useAuth();
  const { t } = useTranslation()

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if(!datas.email || !datas.firstname || !datas.lastname || !datas.password || !datas.password2) return toast.error(t('general.all_fields_required'));
    if(datas.password !== datas.password2) return toast.error(t('general.password_mismatch'));
    registerUser(datas)
    
  }

  const handleChange = (evt, key) => setDatas({...datas, [key]: evt.target.value});

  return (
    <div className="auth-pages">
      <Navbar />
      <section id="register">
        <div className="container">
          <header>
            <h1>{t('auth.register')}</h1>
          </header>
          <main>
            <form id="register-form" action="" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="email" name="email" id="email" value={datas.email} onChange={(evt) => { handleChange(evt, 'email') }} placeholder=' ' />
                <label htmlFor="email">{t('general.email')}</label>
              </div>
              <div className="form-group">
                <input type="text" name="firstname" id="firstname" value={datas.firstname} onChange={(evt) => { handleChange(evt, 'firstname') }} placeholder=' ' />
                <label htmlFor="email">{t('general.firstname')}</label>
              </div>
              <div className="form-group">
                <input type="text" name="lastname" id="lastname" value={datas.lastname} onChange={(evt) => { handleChange(evt, 'lastname') }} placeholder=' ' />
                <label htmlFor="email">{t('general.lastname')}</label>
              </div>
              <div className="form-group">
                <input type="password" name="password" id="password" value={datas.password} onChange={(evt) => { handleChange(evt, 'password') }} placeholder=' ' />
                <label htmlFor="password">{t('auth.password')}</label>
              </div>
              <div className="form-group">
                <input type="password" name="confirm-password" id="confirm-password" value={datas.password2} onChange={(evt) => { handleChange(evt, 'password2') }} placeholder=' ' />
                <label htmlFor="confirm-password">{t('auth.confirm_password')}</label>
              </div>
            </form>
          </main>
          <footer>
            <input type="submit" form="register-form" value={t('auth.register')} />
            <span>{t('auth.already_registered')} <Link to="/auth/login">{t('auth.login')}</Link></span>
          </footer>
        </div>
      </section>
      <Footer />
    </div>
  )
}
