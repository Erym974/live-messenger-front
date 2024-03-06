import React from 'react'
import { Link } from 'react-router-dom'
import useTranslation from '../../Hooks/useTranslation'

export const Footer = () => {

  const { t } = useTranslation()

  return (
    <footer>
        <div className="block">
            <img src="/logo.svg" alt="Swiftchat" />
            <h3>Swiftchat</h3>
        </div>
        <div className="block">
            <h3>{t('public.links')}</h3>
            <ul>
                <li><Link to="/">{t('public.home')}</Link></li>
                <li><Link to="/blog">{t('public.blog')}</Link></li>
                <li><Link to="/careers">{t('public.careers')}</Link></li>
                <li><Link to="/terms">{t('public.terms')}</Link></li>
                <li><Link to="/privacy">{t('public.privacy')}</Link></li>
            </ul>
        </div>
    </footer>
  )
}
