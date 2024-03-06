import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Slices/authSlice";
import Notifications from "../Components/Notifications/Notifications"
import axios from "../Api/axios";
import { useEffect, useState } from "react";
import { useTranslation } from "./CustomHooks";

export default function useSettings() {

    const SETTINGS = ["allow-friend-request", "allow-notification", "language"]

    const { user } = useSelector(state => state.auth)
    const [isMobileView, setMobileView] = useState(false)
    const { t } = useTranslation()
    const dispatch = useDispatch()

    /** Set the mobile view */
    useEffect(() => {
        if(window.innerWidth <= 768) setMobileView(true)
        else setMobileView(false)
    }, [])

    /**
     * 
     * Fast function to edit a toggle setting
     * 
     */
    const toggleSetting = async (meta = null) => {

        if(meta === null) return console.error(`You must provide a meta to setSettings`)

        if(!SETTINGS.includes(meta)) return console.error(`The meta ${meta} is not allowed`)

        const setting = user.settings.find(setting => setting.meta === meta)

        if(!setting) return console.error(`The meta ${meta} is not found`)

        if(typeof setting.value != "boolean") {
            console.error(`The meta ${meta} is not a boolean`)
            return
        }

        Notifications.Promise(async () => {
            const response = await axios.post('/settings', { meta, value: !setting.value })
            if(!response?.status) return false
            dispatch(setUser(response.datas))
            return true
        }, t('general.saving'), t('general.saved'), t('error.occured'))

    } 

    /**
     * 
     * Functions to edit a setting from the user's settings.
     * 
     */
    const setSettings = async (meta = null, value = null) => {

        if(meta === null || value === null) {
            console.error(`You must provide a ${meta === null ? "meta" : "value"} to setSettings`)
            return
        } 
        if(!SETTINGS.includes(meta)) {
            console.error(`The meta ${meta} is not allowed`)
            return
        }

        Notifications.Promise(async () => {
            const response = await axios.post('/settings', { meta, value })
            if(!response?.status) return false
            dispatch(setUser(response.datas))
            return true
        }, t('general.saving'), t('general.saved'), t('error.occured'))

    } 

    return { isMobileView, setSettings, toggleSetting }

}