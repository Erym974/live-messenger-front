import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setProfile } from "../Slices/profileSlice"
import  { useApi } from "./CustomHooks"

export default function useProfile() {

    const { profile } = useSelector(state => state.profile)
    const { get: getProfile } = useApi("api/users")
    const dispatch = useDispatch()

    const updateProfile = async () => {
        if(!profile) return
        const response = await getProfile([profile?.user?.id])
        if(!response?.status) return
        dispatch(setProfile(response?.datas))
    }
    const showProfile = async (id) => {
        const response = await getProfile([id])
        if(!response?.status) return
        dispatch(setProfile(response?.datas))
    }
    const closeProfile = () => dispatch(setProfile(null))

    return { profile, showProfile, closeProfile, updateProfile }

}