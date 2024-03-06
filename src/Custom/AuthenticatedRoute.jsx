import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, useError, useFriends, useMessenger } from '../Hooks/CustomHooks'
import { Loader } from '../Components/Loader'
import { socket } from './../socket'
import { moveConversationToTop } from './../Slices/messengerSlice';
import { useDispatch } from 'react-redux';

export default function AuthenticatedRoute() {

    const { user, loading, auth, fetchAuth } = useAuth()
    const location = useLocation()

    const [socketLoading, setSocketLoading] = useState(false)
    const { groups, fetchGroups } = useMessenger()
    const { error, setError } = useError()
    const dispatch = useDispatch()
    const { newInvite } = useFriends()
    const { onKick, leaveGroup } = useMessenger()
    const navigate = useNavigate()

    /** Log user */
    useEffect(() => {
      if(!auth) return
      fetchAuth()
    }, [auth])

    /** If there is not Auth then don't connect to socket */
    useEffect(() => {
      if(!user) return
      setSocketLoading(true)
      socket.connect()
      socket.on('connect', () => setSocketLoading(false))
      return () => {
        socket.disconnect()
        socket.off('connect')
      };
    }, [user])

    // Listen for socket connection errors
    useEffect(() => {
      let attempts = 0
      socket.on("connect_error", (err) => {
        console.log("Socket Connection Error", err, attempts);
        if(attempts < 2) attempts++
        else setError("server_connection_failed")
      });
      return () => socket.off("connect_error")
    }, [socket])

    /** On groups loaded */
    useEffect(() => {

      if(!groups) return

      socket.emit("join-conversation", {groups: groups.map(group => group.id), token: auth })

      socket.on('new-group', fetchGroups)
      socket.on('conversation-to-top', (params) => dispatch(moveConversationToTop({group: params.group, message: params.message})))

      return () => {
        socket.off("conversation-to-top")
        socket.off("new-group")
      }

    }, [groups])

    /**
     * 
     * On User Connect Subscribe to the socket events
     * 
     */
    useEffect(() => {
      if(!user) return

      /** Register to the socket list */
      socket.emit("register", {token: auth})
      /** Subscribe to invitations */
      socket.emit('join-invitation', {code: user?.friendCode})
      /** When we receive new invite event */
      socket.on('invitation-received', newInvite)
      /** When we are kicked from group */
      socket.on('kicked', onKick)
      socket.on('leaved', leaveGroup)
      return () => {
          socket.off('invitation-received')
          socket.off('kicked')
          socket.off('leaved')
      }
    }, [user])


    /** Error handling */
    useEffect(() => {
      if(!error) return
      navigate('/error')
    }, [error])

    return (
      (!loading && !socketLoading) ?
        auth != null ?
          <>
            {!user ? <Loader /> : <Outlet />}
          </> 
          : 
          <Navigate to="/auth/login" state={{ from: location }} replace />
      :
      <div className="d-flex aic jcc h-100">
        <Loader />
      </div>
    )
}
