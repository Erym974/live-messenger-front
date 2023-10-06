import React, { useState } from 'react'
import { useAuth, useTranslation } from '../../../Hooks/CustomHooks';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaFloppyDisk } from 'react-icons/fa6';
import toast from 'react-hot-toast';

export function Security() {

  const { t } = useTranslation()

  const { updateUser } = useAuth();

  const [saving, setSaving] = useState(false)
  const [datas, setDatas] = useState({ 
    password: "", 
    newPassword: "", 
    confirmNewPassword: "",
  });

  const handleChange = (evt, key) => {
    setDatas({ ...datas, [key]: evt.target.value });
  }

  const handleSave = async () => {
    if(saving) return;
    setSaving(true);

    if(datas.password.trim().length === 0) {
      setSaving(false);
      return toast.error(t('account.passwordRequired'))
    }
    if(datas.newPassword.trim().length === 0) {
      setSaving(false);
      return toast.error(t('account.newPsswordRequired'))
    }
    if(datas.confirmNewPassword.trim().length === 0) {
      setSaving(false);
      return toast.error(t('account.confirmNewPasswordRequired'))
    }

    
    const body = {
      password: datas.password,
      newPassword: datas.newPassword,
      confirmNewPassword: datas.confirmNewPassword,
    }

    const response = await updateUser(body)
    setSaving(false);
    if(response) return toast.success(t('account.edited'))
    else return toast.error(t('global.error'))

  }

  return (
    <section id="security">
        <h1>Sécurité</h1>
        <h2>Mot de passe</h2>
        <form action="" className='mt-3'>
          <div className="form-group">
              <input type="password" name="password" id="password" value={datas?.password} onChange={(evt) => { handleChange(evt, 'password') }} placeholder='' />
              <label htmlFor="text">{t('general.password')}</label>
          </div>
          <div className="form-group">
              <input type="password" name="newPassword" id="newPassword" value={datas?.newPassword} onChange={(evt) => { handleChange(evt, 'newPassword') }} placeholder='' />
              <label htmlFor="text">{t('general.newPassword')}</label>
          </div>
          <div className="form-group">
              <input type="password" name="confirmNewPassword" id="confirmNewPassword" value={datas?.confirmNewPassword} onChange={(evt) => { handleChange(evt, 'confirmNewPassword') }} placeholder='' />
              <label htmlFor="text">{t('general.confirmNewPassword')}</label>
          </div>
        </form>
        <div className="d-flex jce">
          <button className={`save-button ${saving && 'loader-svg'}`} onClick={handleSave}>
              {saving ? t('general.saving') : t('general.save')}
              {saving ? <AiOutlineLoading3Quarters /> : <FaFloppyDisk />}
          </button>
        </div>
    </section>
  )
}
