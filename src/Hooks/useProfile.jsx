import { useDispatch, useSelector } from "react-redux"
import { setProfile } from "../Slices/profileSlice"
import axios from "../Api/axios"

export default function useProfile() {

    const { profile } = useSelector(state => state.profile)
    const dispatch = useDispatch()

    /**
     * 
     * @param {Int} id 
     * Open the profile modal of the user with the given id
     * 
     */
    const showProfile = async (id) => {
        const response = await axios.get(`/api/users/${id}`)
        if(!response?.status) return
        dispatch(setProfile(response?.datas))
    }
    const closeProfile = () => dispatch(setProfile(null))

    return { profile, showProfile, closeProfile }

}