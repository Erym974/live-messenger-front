import { useDispatch, useSelector } from "react-redux";
import  { useApi } from "./CustomHooks"
import { setUser } from "../Slices/authSlice";

export default function useSettings() {

    const SETTINGS = ["allow-friend-request", "allow-notification", "language"]

    const { post: postSettings } = useApi("api/settings")
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const toggleSetting = async (meta = null) => {

        if(meta === null) return console.error(`You must provide a meta to setSettings`)

        if(!SETTINGS.includes(meta)) return console.error(`The meta ${meta} is not allowed`)

        const setting = user.settings.find(setting => setting.meta === meta)

        if(!setting) return console.error(`The meta ${meta} is not found`)

        if(typeof setting.value != "boolean") {
            console.error(`The meta ${meta} is not a boolean`)
            return
        }
        
        const response = await postSettings({ meta, value: !setting.value })
        if(!response?.status) return
        return dispatch(setUser(response.datas))

    } 

    const setSettings = async (meta = null, value = null) => {

        if(meta === null || value === null) {
            console.error(`You must provide a ${meta === null ? "meta" : "value"} to setSettings`)
            return
        } 
        if(!SETTINGS.includes(meta)) {
            console.error(`The meta ${meta} is not allowed`)
            return
        }
        const response = await postSettings({ meta, value })
        if(!response?.status) return
        return dispatch(setUser(response.datas))

    } 

    return { setSettings, toggleSetting }

}