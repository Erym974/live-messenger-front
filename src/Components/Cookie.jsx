import React from 'react'
import { useDispatch } from 'react-redux'
import { acceptCookie } from '../Slices/generalSlice'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Cookie = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation()

    return (
        <div className="cookies">
            <p>{t('cookie.one')} <Link to="/privacy">{t('cookie.two')}</Link> {t('cookie.three')} <Link to="/terms">{t('cookie.four')}</Link>.</p>
            <div className="actions">
                <button onClick={() => dispatch(acceptCookie())}>{t('cookie.agree')}</button>
                <a href="https://google.com" className="btn bg-danger">{t('cookie.decline')}</a>
            </div>
        </div>
    )
}
