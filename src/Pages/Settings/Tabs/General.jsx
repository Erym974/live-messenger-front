import React, { useEffect, useState } from 'react'
import FormSwitch from '../../../Components/FormSwitch'
import { MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Language from '../../../Constant/Language';
import { useTranslation } from 'react-i18next';
import { SelectLanguageItem } from '../../../Components/SelectLanguageItem/SelectLanguageItem';

export function General() {

  const dispatch = useDispatch()
  const settings = useSelector(state => state.settings)

  const { t, i18n } = useTranslation()

  const handleLanguageChange = ({ target: { value } }) => {
    i18n.changeLanguage(value)
    dispatch({ type: "settings/setLanguage", payload: { language: value } })
  }

  const [allowFriends, setAllowFriends] = useState(false);

  return (
    <section id="general">
        <h1>{t('settings.general')}</h1>
        <FormSwitch setData={setAllowFriends} data={allowFriends} >{t('settings.allow_friends')}</FormSwitch>

        <div className="language-selector">
          <span>{t('settings.language_selector')}</span>
          <Select
            value={settings.language}
            label="Language"
            onChange={handleLanguageChange}
          >
            <MenuItem value={Language.FRENCH.code}>
              <SelectLanguageItem language={Language.FRENCH} />
            </MenuItem>
            <MenuItem value={Language.ENGLISH.code}>
              <SelectLanguageItem language={Language.ENGLISH} />
            </MenuItem>
          </Select>
        </div>
    </section>
  )
}
