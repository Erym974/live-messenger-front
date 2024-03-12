import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addListened,
  pushNewFriend,
  pushNewInvite,
  setFriends,
  setInvites,
} from "../Slices/friendsSlice";
import axios from "../Api/axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { socket } from "../socket"
import Notifications from "../Components/Notifications/Notifications";
import toast from 'react-hot-toast';
import { useTranslation } from "./CustomHooks";

export default function useFriends(opts) {
  const { friends, invites: invitations, listened, onlines } = useSelector((state) => state.friends);
  const { user } = useAuth()
  const dispatch = useDispatch();
  const { t } = useTranslation()

  /** Fetch friends */
  const { isFetching: friendsIsLoading, refetch: fetchFriends } = useQuery({
    queryKey: ["friends"],
    enabled: false,
    queryFn: async (id) => {
      if(!user) return null
      try {
        const response = await axios.get('/friends');
        if (!response.status || response.status === false) return [];
        dispatch(setFriends(response.datas || []));
        return response.datas || [];
      } catch (error) {
        return [];
      }
    },
  });

  /** Fetch invitations */
  const { isFetching: invitationsIsLoading, refetch: fetchInvites } = useQuery({
    queryKey: ["invitations"],
    enabled: false,
    queryFn: async (id) => {
      if(!user) return null
      try {
        const response = await axios.get('/invitations');
        if (!response.status || response.status === false) return [];
        dispatch(setInvites(response.datas || []));
        return response.datas || [];
      } catch (error) {
        return [];
      }
    },
  });

  useEffect(() => {
    if (!listened.includes("acceptInvitation")) {
      window.addEventListener("acceptInvitation", addInviteFromEventListener, true);
      dispatch(addListened("acceptInvitation"));
    }
    if (!listened.includes("declineInvitation")) {
      window.addEventListener("declineInvitation", removeInviteFromEventListener,true);
      dispatch(addListened("declineInvitation"));
    }
  }, []);

  const addInviteFromEventListener = (e) => acceptInvite(e.detail);
  const removeInviteFromEventListener = (e) => deleteInvitation(e.detail);

  /**
   *
   * Add a new invitation to the list
   *
   */
  const newInvite = async (invitation) => {
    dispatch(pushNewInvite(invitation));
    Notifications.FriendRequest(invitation)
  };

  /**
   *
   * Add a new friend to the list
   *
   */
  const newFriend = async (friend) => {
    dispatch(pushNewFriend(friend));
  };

  /**
   *
   * Send a invitation to a user with his friend id
   *
   */
  const sendInvite = async (code) => {
    const regex = new RegExp(/^\d{5}-\d{5}-\d{5}$/);
    if (!regex.test(code)) return "Invalid";
    if (code.length < 16 || code.length > 17) return "Invalid";
    const response = await axios.post('/invitations', { code });

    if (!response?.status || Number.isInteger(response?.status)) {
      toast.error(response.message);
      return false
    }
    dispatch(pushNewInvite(response.datas));
    socket.emit("invitation-sended", response.datas)
    toast.success(t('friends.invite_sended'))
    return "sended";
  };

  /**
   *
   * Delete an invitation from the list
   *
   */
  const deleteInvitation = async (invitation) => {
    const response = await axios.delete('/invitations', {
      data: { invitation },
    });
    if (!response?.status) return;
    fetchInvites()
  };

  /**
   *
   * Accept an invitation from the list
   *
   */
  const acceptInvite = async (invitation) => {
    const response = await axios.patch('/invitations', { invitation });
    if (!response?.status) return;
    fetchFriends()
    fetchInvites()
  };

  /**
   *
   * Delete a friend from the list
   *
   */
  const deleteFriend = async (friend) => {
    const response = await axios.delete('/friends', {data: { friend: friend },});
    if (!response?.status) return;
    fetchFriends()
  };

  return { onlines, friends, friendsIsLoading, invitations, invitationsIsLoading, fetchInvites, fetchFriends, newFriend, newInvite, sendInvite, deleteInvitation, acceptInvite, deleteFriend };
}
