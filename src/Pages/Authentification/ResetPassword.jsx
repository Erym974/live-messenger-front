import React, { useEffect, useState } from 'react'
import useTranslation from '../../Hooks/useTranslation';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { Navbar } from '../../Components/Public/Navbar';
import { Footer } from '../../Components/Public/Footer';

export const ResetPassword = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { sendResetPasswordRequest, sendResetPassword } = useAuth();
    const { token } = useParams();
  
    const { t } = useTranslation()

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        sendResetPasswordRequest(email)
    }

    const handleSubmitResetPassword = async (evt) => {
        evt.preventDefault();
        if(!password) return toast.error(t('auth.password_cannot_be_empty'))
        if(password != confirmPassword) return toast.error(t('general.password_mismatch'))
        sendResetPassword([password, confirmPassword], token)
    }

  
    return (
        <div className="auth-pages">
            <Navbar />
            <section id="reset-password">
        
                <div className="container">
                    <header>
                        <h1>{t('auth.reset_password_title')}</h1>
                    </header>
                    {!token ?
                    <main>
                        <form id="reset-password-form" action="" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="email" name="email" id="email" autoComplete="email" value={email} onChange={(evt) => { setEmail(evt.target.value) }} placeholder=' ' />
                                <label htmlFor="email">{t('general.email')}</label>
                            </div>
                        </form>
                    </main>
                    :
                    <main>
                        <form id="reset-password-form" action="" onSubmit={handleSubmitResetPassword}>
                            <div className="form-group">
                                <input type="password" name="password" id="password" autoComplete="new-password" value={password} onChange={(evt) => { setPassword(evt.target.value) }} placeholder=' ' />
                                <label htmlFor="password">{t('general.password')}</label>
                            </div>
                            <div className="form-group">
                                <input type="password" name="confirm-password" id="confirm-password" autoComplete="new-password" value={confirmPassword} onChange={(evt) => { setConfirmPassword(evt.target.value) }} placeholder=' ' />
                                <label htmlFor="confirm-password">{t('general.confirmNewPassword')}</label>
                            </div>
                        </form>
                    </main>
                    }
                    <footer>
                        <input type="submit" form="reset-password-form" value={t('auth.reset_password_send')} />
                        <span><Link to="/auth/login">{t('auth.reset_password_back')}</Link></span>
                    </footer>
                </div>
            
            </section>
            <Footer />
        </div>
    )
}
