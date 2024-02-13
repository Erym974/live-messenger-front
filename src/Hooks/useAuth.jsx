import { useDispatch, useSelector } from "react-redux"
import { setAuth, setLoading, setUser } from "../Slices/authSlice"
import { useTranslation } from "react-i18next"
import Notifications from "../Components/Notifications/Notifications"
import toast from "react-hot-toast"
import axios from "../Api/axios"
import { FaBullseye } from "react-icons/fa"

export default function useAuth() {

    const { loading, auth, user, mercure } = useSelector(state => state.auth)

    const { t } = useTranslation()
    const dispatch = useDispatch()

    /**
     * 
     * Check if the user is authenticated or not
     * 
     */
    const fetchAuth = async () => {
        if(auth) {
            const response = await axios.get('api/users/me')
            if(!response?.status) {
                if(response?.message === "Access denied") toast.error(t('auth.expired'))
                dispatch(setAuth(null))
                dispatch(setUser(null))
                dispatch(setLoading(false))
            } else {
                dispatch(setUser(response?.datas.user))
                dispatch(setLoading(false))
            }
        }
        else dispatch(setLoading(false))
    }

    /**
     * 
     * Try to connect User with his email and password.
     * 
     * @param {Object} user // { string: email, string: password, boolean: remember }
     * @returns bool
     */
    const connectUser = async (user) => {
        const response = await axios.post("api/auth/login", user)
        
        if(!response?.status) {
            toast.error(t('auth.wrong_credentials'))
            return false
        }
        dispatch(setAuth(response.datas.token))
        dispatch(setUser(response.datas.user))
        return true
    }

    /**
     * 
     * Try to register User.
     * 
     * @param {Object} user // { string: email, string: firstname, string: lastname, string: password, string: password2 }
     * @returns bool
     */
    const registerUser = async (user) => {
        const response = await axios.post("api/auth/register", user)
        return response.status
    }

    /**
     * 
     * Disconnect user
     * 
     */
    const logoutUser = () => {
        dispatch(setAuth(null))
        dispatch(setUser(null))
    }

    /** 
     * Update user informations 
     */
    const updateUser = async(datas) => {
        Notifications.Promise(async () => {
            const response = await axios.patch('api/users/me', datas)
            console.log(response);
            if(!response?.status) return FaBullseye
            dispatch(setUser(response.datas?.user))
            return true
        }, "Enregistrement en cours", "Enregistré", "Une erreur est survenue")
    }

    const updatePicture = async(file, type) => {

        Notifications.Promise(async () => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('picture', type)
    
            const response = await axios.post('api/users/me', formData)
            if(!response?.status) return false
            dispatch(setUser(response.datas?.user))
            return true
        }, "Enregistrement en cours", "Enregistré", "Une erreur est survenue")

    }

    return { loading, auth, user, mercure, connectUser, registerUser, logoutUser, fetchAuth, updateUser, updatePicture }

}