import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import  { useApi } from "./CustomHooks"
import { setAuth, setLoading, setMercure, setUser } from "../Slices/authSlice"
import { useTranslation } from "react-i18next"
import Notifications from "../Components/Notifications/Notifications"
import toast from "react-hot-toast"

export default function useAuth() {

    const { loading, auth, user, mercure } = useSelector(state => state.auth)
    const { post: loginApi } = useApi("auth/login")
    const { post: registerApi } = useApi("auth/register")
    const { get: mePathApi } = useApi("api/users/me")
    const { patch: updateUserApi } = useApi("api/users/me")
    const { post: updatePictureApi } = useApi("api/users/me")
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const fetchAuth = () => {
        if(auth && auth != "null") refreshUser()
        else dispatch(setLoading(false))
    }

    const refreshUser = async () => {
        const response = await mePathApi()

        console.log(response);

        if(!response?.status) {
            if(response?.message === "Access denied") toast.error(t('auth.expired'))
            dispatch(setAuth(null))
            dispatch(setUser(null))
            dispatch(setLoading(false))
        } else {
            dispatch(setMercure(response.datas.mercure))
            dispatch(setUser(response?.datas.user))
            dispatch(setLoading(false))
        }
    }

    const logUser = async (user) => {
        dispatch(setLoading(true))
        const response = await loginApi(user)
        if(!response?.status) {
            dispatch(setLoading(false))
            return false
        }
        dispatch(setMercure(response.datas.mercure))
        dispatch(setAuth(response.datas.token))
        dispatch(setUser(response.datas.user))
        dispatch(setLoading(false))
        return true
    }

    const registerUser = async (user) => {
        const response = await registerApi(user)
        return response.status
    }

    const logoutUser = () => {
        dispatch(setAuth(null))
        dispatch(setUser(null))
    }

    const updateUser = async(datas) => {
        Notifications.Promise(async () => {
            const response = await updateUserApi(datas)
            if(!response?.status) return false
            dispatch(setUser(response.datas))
            return true
        }, "Enregistrement en cours", "Enregistré", "Une erreur est survenue")
    }

    const updatePicture = async(file, type) => {

        Notifications.Promise(async () => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('picture', type)
    
            const response = await updatePictureApi(formData)
            if(!response?.status) return false
            dispatch(setUser(response.datas))
            return true
        }, "Enregistrement en cours", "Enregistré", "Une erreur est survenue")

    }

    return { loading, auth, user, mercure, logUser, registerUser, logoutUser, fetchAuth, updateUser, updatePicture }

}