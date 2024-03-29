import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useAuth, useTranslation } from '../../Hooks/CustomHooks';

export const Navbar = (props) => {

  const [hamburger, setHamburger] = useState(false)
  const { language, setLanguage, getLanguageData, Languages, t } = useTranslation()
  const { auth } = useAuth()

  return (
    <header>
      <nav {...props} >
        <Link to="/" className='logo'>
          <img src="/logo.svg" alt="Logo of Swift Chat" />
          <h1>Swift<span>chat</span></h1>
        </Link>
        <ul className='links'>
          <li><Link to="/">{t('public.home')}</Link></li>
          <li><Link to="/blog">{t('public.blog')}</Link></li>
          <li><Link to="/careers">{t('public.careers')}</Link></li>
        </ul>
        <ul className="auth">
          {!auth ?
          <>
            <li><Link to='/auth/register'>{t('public.register')}</Link></li>
            <li><Link to='/auth/login' className="special">{t('public.login')}</Link></li>
          </>  :
            <li><Link to='/settings/account' className="special">{t('public.app')}</Link></li>
          }
          <li>
            <div className="lang-dropdown">
              <div className="current-lang">
                <img src={`/flags/${getLanguageData(language).code}.svg`} alt="Current locale flag" />
                <span>{getLanguageData(language).name}</span>
              </div>
              <div className="dropdown-content">
                {Languages.map(lang => <button key={lang.code} onClick={() => setLanguage(lang.code)}>
                  <img src={`/flags/${lang.code}.svg`} alt={`${lang.name} flag`} />
                  <span>{lang.name}</span>
                </button>)}
              </div>
            </div>
          </li>
        </ul>
        <div className="hamburger" data-open={hamburger}>
          <button className="hamburger-toggler" onClick={() => setHamburger(!hamburger)}>
            <GiHamburgerMenu />
          </button>
          <div className="hamburger-links">
            <button className="close" onClick={() => setHamburger(!hamburger)}>
              <MdClose />
            </button>
            <ul>
              <li><Link to="/">{t('public.home')}</Link></li>
              <li><Link to="/blog">{t('public.blog')}</Link></li>
              <li><Link to="/careers">{t('public.careers')}</Link></li>
              {!auth ?
              <>
                <li><Link to='/auth/register'>{t('public.register')}</Link></li>
                <li><Link to='/auth/login' className="special">{t('public.login')}</Link></li>
              </> :
                <li><Link to='/settings/account' className="special">{t('public.app')}</Link></li>
              }
              <li className='mt-5'>
                <div className="lang-dropdown">
                  <div className="current-lang">
                    <img src={`/flags/${getLanguageData(language).code}.svg`} alt="Current locale flag" />
                    <span>{getLanguageData(language).name}</span>
                  </div>
                  <div className="dropdown-content">
                    {Languages.map(lang => <button key={lang.code} onClick={() => setLanguage(lang.code)}>
                      <img src={`/flags/${lang.code}.svg`} alt={`${lang.name} flag`} />
                      <span>{lang.name}</span>
                    </button>)}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
