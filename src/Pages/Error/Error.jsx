import { NavLink } from 'react-router-dom'
import useError from '../../Hooks/useError'
import useTranslation from '../../Hooks/useTranslation'
import './error.scss'

export default function Error() {
  
  const { t } = useTranslation()
  const { error } = useError()
  
  return (
    <section className="error">
      <h2>Oups...</h2>
      {error ?
      <>
        <h1>{t(`error.${error}`)}</h1>
        <h3>{t('error.please_retry')}</h3>
      </>
      :
      <>
        <h1>{t('error.lost')}</h1>
        <NavLink to="/" className="btn">{t('error.back_home')}</NavLink>
      </>  
      }
    </section>
  )
}
