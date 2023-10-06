import FormSwitch from '../../../Components/FormSwitch'
import { MenuItem, Select } from '@mui/material';
import Language from '../../../Constant/Language';
import { SelectLanguageItem } from '../../../Components/SelectLanguageItem/SelectLanguageItem';
import { useAuth, useSettings, useTranslation } from '../../../Hooks/CustomHooks';

export function General() {

  const { language, t } = useTranslation()
  const { toggleSetting, setSettings } = useSettings()
  const { user } = useAuth()

  const handleLanguageChange = ({ target: { value } }) => {
    setSettings('language', value)
  }

  return (
    <section id="general">
        <h1>{t('settings.general')}</h1>
        <FormSwitch setData={() => { toggleSetting("allow-friend-request") }} data={user.settings.find(setting => setting.meta === "allow-friend-request").value} >{t('settings.allow_friends')}</FormSwitch>

        <div className="language-selector">
          <span>{t('settings.language_selector')}</span>
          <Select
            value={language}
            label="Language"
            onChange={handleLanguageChange}
          >
            {Language.LIST.map(lang => (
                <MenuItem value={lang.code} key={lang.code}>
                    <SelectLanguageItem language={lang} />
                </MenuItem>
            ))}
          </Select>
        </div>
    </section>
  )
}
