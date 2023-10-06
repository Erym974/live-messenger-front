import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import  { useApi, useAuth } from "./CustomHooks"
import { setFriends, setInvites } from "../Slices/friendsSlice";

export default function useFriends(path = "api") {

    const [loading, setLoading] = useState(true)

    const { friends, invites: invitations } = useSelector(state => state.friends)
    const { user } = useAuth()
    const dispatch = useDispatch()

    const [filteredFriends, setFilteredFriends] = useState([])
    const [searchFriends, setSearchFriends] = useState("")

    const { get: getFriends, delet: deleteFriendApi } = useApi("api/friends")
    const {  get: getInvites, post: sendInviteApi, patch: acceptInvitationApi, delet: deleteInvitationApi } = useApi("api/invitations")
    const { get: getGroupApi } = useApi("api/friends/group")

    useEffect(() => {
        if(!searchFriends) return setFilteredFriends(friends)
        const filtered = friends.filter(f => 
            (f.friend.id !== user.id && f.friend.fullname?.toLowerCase().includes(searchFriends?.toLowerCase())) ||
            (f.user.id !== user.id && f.user.fullname?.toLowerCase().includes(searchFriends?.toLowerCase()))
          );
        setFilteredFriends(filtered)
    }, [searchFriends, friends])

    const fetchFriends = async () => {
        const response = await getFriends()
        if(!response?.status) return
        dispatch(setFriends(response?.datas))
        setLoading(false)
    }
    const fetchInvites = async () => {
        const response = await getInvites()
        if(!response?.status) return
        dispatch(setInvites(response?.datas))
    }

    const sendMessage = async (id) => {
        const response = await getGroupApi({ id })
        if(!response?.status) return
    }

    const sendInvite = async (code) => {
        const regex = new RegExp(/^\d{5}-\d{5}-\d{5}$/);
        if(!regex.test(code)) return "Invalid"
        if(code.length < 16 || code.length > 17) return "Invalid"

        const response = await sendInviteApi({code})
        if(!response?.status ||Number.isInteger(response?.status)) {
            if(response.message === "This user doesn't allow friend request") return "disallowed"
            if(response.message === "Already sent invitation") return "already_sent"
            if(response.message === "Already your friend") return "already_friend"
            if(response.message === "User not found") return "NotFound"
            if(response.message === "Yourself") return "Yourself"
            return "error"
        }
        updateFriends()
        return "sended"

    }

    const deleteInvitation = async (invitation) => {
        const response = await deleteInvitationApi({ invitation })
        if(!response?.status) return
        updateFriends()
    }

    const acceptInvite = async (invitation) => {
        const response = await acceptInvitationApi({ invitation })
        if(!response?.status) return
        updateFriends()
    }

    const deleteFriend = async (friends) => {
        const response = await deleteFriendApi({ friends })
        if(!response?.status) return
        updateFriends()
    }

    const updateFriends = async (id) => {
        await fetchFriends()
        await fetchInvites()
    }

    return { friends, filteredFriends, searchFriends, setSearchFriends, loading, invitations, sendInvite, deleteInvitation, acceptInvite, deleteFriend, updateFriends}

}