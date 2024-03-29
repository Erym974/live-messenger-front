import { useDispatch, useSelector } from "react-redux"
import { setAuth, setLoading, setUser } from "../Slices/authSlice"
import { useTranslation } from "react-i18next"
import Notifications from "../Components/Notifications/Notifications"
import toast from "react-hot-toast"
import axios from "../Api/axios"
import { FaBullseye } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { getTokenPayload } from "../Utils/utils"

export default function useAuth() {

    const { loading, auth, user } = useSelector(state => state.auth)

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /**
     * 
     * DELETE Account
     * 
     */
    const deleteAccount = async () => {
        Notifications.Promise(async () => {
            const response = await axios.delete('/users/me')
            if(!response?.status) throw new Error(response?.message || t('error.occured'))
            dispatch(setAuth(null))
            dispatch(setUser(null))
            navigate('/auth/login')
            return true
        }, t('auth.deleting'), t('auth.deleted'), t('error.occured'))
    }

    /**
     * 
     * Check if the user is authenticated or not
     * 
     */
    const fetchAuth = async () => {
        if(auth) {

            const token = getTokenPayload(auth)

            if(token.exp * 1000 < Date.now()) {
                dispatch(setAuth(null))
                dispatch(setUser(null))
                dispatch(setLoading(false))
                return navigate('/auth/login')
            }

            const response = await axios.get('/users/me')
            if(!response?.status || response.hasOwnProperty('code')) {
                switch(response?.message) {
                    case "Invalid JWT Token":
                        toast.error(t('auth.invalid'))
                        break
                    default:
                        toast.error(t('auth.expired'))
                        break
                }
                dispatch(setAuth(null))
                dispatch(setUser(null))
                dispatch(setLoading(false))
                navigate('/auth/login')

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
        try {
            const response = await axios.post('/auth/login', user)
            if(response.hasOwnProperty('code')) return toast.error(t('auth.wrong_credentials'))
            dispatch(setAuth(response.token))

            return true
        } catch(err) {
            toast.error(t('error.occured'))
            return false
        }
    }

    /**
     * 
     *  Send a request to the server to resend and email
     * 
     * 
     */
    const sendActiveAccountRequest = () => {

        Notifications.Promise(async () => {
            const response = await axios.post('/auth/active-account/request', { email: user.email })
            if(!response?.status) throw new Error(response.message)
            return true
        }, t('auth.sending'), t('activeAccount.request_sended'), t('error.occured'))

    }

    /** 
     * 
     * Send the activation
     * 
     */
    const sendActiveAccount = async (token) => {

        Notifications.Promise(async () => {
            const response = await axios.post('/auth/active-account', { token })
            if(!response?.status) throw new Error(response.message)
            navigate('/settings/account')
        }, t('activeAccount.activation'), t('activeAccount.verified'), t('error.occured'))

    } 

    /** 
     * 
     * Send the reset password 
     * 
     */
    const sendResetPassword = async (passwords, token) => {
        Notifications.Promise(async () => {
            const response = await axios.post('/auth/reset-password/reset', { password: passwords[0], confirmPassword: passwords[1], token })
            if(!response.status) throw new Error(response.message)
            navigate('/auth/login')
        }, t('auth.sending'), t('auth.reset_password_edited'))
    }

    /** 
     * 
     * Send a reset password email
     * 
     */
    const sendResetPasswordRequest = (email) => {
        Notifications.Promise(async () => {
            const response = await axios.post('/auth/reset-password', { email })
            if(!response?.status) throw new Error(response.message)
            return navigate('/auth/login')
        }, t('auth.sending'), t('auth.reset_password_sended'), t('error.occured'))

    }

    /**
     * 
     * Try to register User.
     * 
     * @param {Object} user // { string: email, string: firstname, string: lastname, string: password, string: password2 }
     * @returns bool
     */
    const registerUser = async (user) => {
        Notifications.Promise(async () => {
            const response = await axios.post('/auth/register', user)
            if(!response.hasOwnProperty('status')) throw new Error(t('error.occured'))
            if(!response.status) throw new Error(response.message)
            return navigate('/auth/login')
        }, t('auth.registration_in_progress'), t('auth.registered'))
    }

    /**
     * 
     * Disconnect user
     * 
     */
    const logoutUser = () => {;
        dispatch(setAuth(null))
        dispatch(setUser(null))
    }

    /** 
     * Update user informations 
     */
    const updateUser = async(datas) => {
        Notifications.Promise(async () => {
            const response = await axios.patch('/users/me', datas)
            console.log(response);
            if(!response?.status) return FaBullseye
            dispatch(setUser(response.datas?.user))
            return true
        }, t('general.saving'), t('general.saved'), t('error.occured'))
    }

    /** Update user profile picture */
    const updatePicture = async(file, type) => {

        Notifications.Promise(async () => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('picture', type)
    
            const response = await axios.post('/users/me', formData)
            if(!response?.status) throw new Error(response?.message || t('error.occured')) 
            dispatch(setUser(response.datas?.user))
            return true
        }, t('general.saving'), t('general.saved'), t('error.occured'))

    }

    return { deleteAccount, loading, auth, user, connectUser, registerUser, logoutUser, fetchAuth, updateUser, updatePicture, sendResetPasswordRequest, sendResetPassword,sendActiveAccountRequest, sendActiveAccount }

}