import { useDispatch, useSelector } from "react-redux"
import { setProfile, setLoading } from "../Slices/profileSlice"
import axios from "../Api/axios"

export default function useProfile() {

    const { profile, profileIsLoading } = useSelector(state => state.profile)
    const dispatch = useDispatch()

    /**
     * 
     * @param {Int} id 
     * Open the profile modal of the user with the given id
     * 
     */
    const showProfile = async (id) => {
        updateLoading(true)
        const response = await axios.get(`/api/users/${id}`)
        updateLoading(false)
        if(!response?.status) return
        dispatch(setProfile(response?.datas))
    }
    const closeProfile = () => dispatch(setProfile(null))

    const updateLoading = (value) => dispatch(setLoading(value))

    return { profile, showProfile, closeProfile, profileIsLoading }

}