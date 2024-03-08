import { useEffect, useState } from "react"
import Language from "../Constant/Language"
import { useTranslation as tr } from 'react-i18next';
import { useAuth, useLocalStorage } from './CustomHooks'

export default function useTranslation() {

    const { t, i18n } = tr()

    const { user } = useAuth()

    const [local, setLocal] = useLocalStorage('language', Language.DEFAULT.code)
    const [language, setLanguage] = useState(local || Language.DEFAULT.code)

    useEffect(() => {
        if(!user) return
        const setting = user.settings.find(setting => setting.meta === "language")
        if(setting) setLanguage(setting.value)
    }, [user])

    useEffect(() => {
        document.documentElement.lang = language
        setLocal(language)
        i18n.changeLanguage(language)
    }, [language])

    const getLanguageData = (language) => {
        return Language.LIST.find(lang => lang.code === language)
    }

    return { language, setLanguage, t, getLanguageData, Languages: Language.LIST }

}