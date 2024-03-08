import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeConversation, setGroup, setGroups, setReply as setReplySlice, setEmoji as setEmojiSlice, setMessages, setMessage, newMessage, replaceMessage, setEdition as setSliceEdition, setMessageFetching } from "../Slices/messengerSlice"
import axios from "../Api/axios"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { socket } from "../socket"
import toast from "react-hot-toast"

export default function useMessenger() {

    const dispatch = useDispatch()
    const { group, groups, messages, message, edition, reply, emoji, messages_showed, messagesIsFetching } = useSelector(state => state.messenger)
    const { auth } = useSelector(state => state.auth)

    const [conversation, setConversation] = useState(null)
    const { current: messageLimit } = useRef(30)

    const { isLoading: groupsIsLoading, refetch: fetchGroups } = useQuery({
        queryKey: ['groups'],
        enabled: false,
        queryFn: async () => {
            try {
                const response = await axios.get('/groups')
                if (!response.status || response.status === false) return [];
                dispatch(setGroups(response.datas || []));
                return response.datas || [];
              } catch (error) {
                return [];
              }
        }
    })

    const { data: messageResponse, refetch: fetchMessages, isFetching: messagesIsFetchingQuery, fetchNextPage: messageFetchNextPage, hasNextPage: messageHasNextPage } = useInfiniteQuery({
        queryKey: ['messages', conversation],
        enabled: false,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if(allPages.length + 1 > lastPage?.datas?.pages) return undefined;
            else return allPages.length + 1
        },
        queryFn: async ({ pageParam }) => {
            if(conversation) return await axios.get(`/messages/${conversation}?limit=${messageLimit}&page=${pageParam}`)
        },
    })

    const { data: groupResponse, isFetching: groupIsFetching, refetch: fetchGroup } = useQuery({
        queryKey: ['group', conversation],
        enabled: false,
        queryFn: async (id) => {
            if(conversation) {
                try {
                    const response = await axios.get(`/groups/${conversation}`);
                    if (!response.status || response.status === false) return null;
                    dispatch(setGroup(response.datas))
                    return response.datas || null;
                } catch (error) {
                    return null;
                }
            }
        }
    })

    useEffect(() => {
        dispatch(setMessageFetching(messagesIsFetchingQuery))
    }, [messagesIsFetchingQuery])

    // Fetch group
    useEffect(() => {
        if(!conversation) return
        if(group?.id === conversation) return

        dispatch(setMessages([]))
        dispatch(setGroup(null))

        fetchGroup()
    }, [conversation])

    // Fetch messages
    useEffect(() => {
        if(!groupResponse) return
        fetchMessages()
    }, [groupResponse])
    
    // Parse 
    useEffect(() => {
        if(!messageResponse) return
        if(messageResponse.pages[0] === undefined) return
        const msgs =  messageResponse.pages.reverse().map((page) => page.datas.messages).flat()
        dispatch(setMessages(msgs))
    }, [messageResponse])

    // Message edition
    useEffect(() => {
        if(edition.active && edition.content?.trim().length === 0) {
            setEdition({active: false, id: null, content: null})
        }
    }, [edition])

    /** Join all sockets events when we have the new group */
    useEffect(() => {
        if(!groupResponse) return

        socket.emit('join-group', {id: groupResponse.id, token: auth})

        socket.on(`new-message#${conversation}`, onMessageReceived)
        socket.on(`message-updated#${conversation}`, onMessageUpdated)
        socket.on(`group-updated#${conversation}`, onGroupUpdated)

        return () => {
            socket.emit('leave-group', groupResponse.id)

            socket.off(`new-message#${conversation}`)
            socket.off(`message-updated#${conversation}`)
            socket.off(`group-updated#${conversation}`)
        }
    }, [groupResponse])

    /** When the group is updated */
    const onGroupUpdated = async (group) => dispatch(setGroup(group))

    /** Check if we have the permission to access to a group id */
    const checkGroup = async (group) => {
        const response = await axios.get(`/permissions/group/${group}`)
        if(response?.status) return response.datas
        else return false 
    }

    /** When we send a message */
    const sendMessage = async (id, content, files = []) => {

        let datasToSend = {message: content}

        if(reply != null) datasToSend = {...datasToSend, reply: reply.id}

        if(files.length > 0) {
            socket.emit('send-message', {group: id, message: {message: content, files: files}, token: auth})
        } else {
            socket.emit('send-message', {group: id, message: datasToSend, token: auth})
        }
        
    }

    /** When we receive new message */
    const onMessageReceived = async (message) => dispatch(newMessage(message))

    /** When we delete a message */
    const deleteMessage = async (id) => {
        socket.emit('delete-message', {id, status: "deleted", token: auth})
    }

    /** When we receive an deleted message */
    const onMessageUpdated = async (message) => {
        dispatch(replaceMessage(message))
    }

    /** When we are kicked from the group */
    const onKick = async (group) => {
        toast.error(`You have been kicked from ${group?.name}`)
        dispatch(removeConversation(group?.id))
    }

    /** When we leave a group */
    const leaveGroup = async (group) => {
        toast.success(`You leave ${group?.name}`)
        dispatch(removeConversation(group?.id))
    }

    const activeMessage = async (id) => {
        if(message === id) dispatch(setMessage(null))
        else dispatch(setMessage(id))
        setEdition({active: false, id: null, content: null})
    }

    const setEdition = async (value) => {
        dispatch(setSliceEdition(value))
    }

    const editMessage = async () => {
        if(edition?.content?.trim()?.length > 0) {
            socket.emit('edit-message', {id: edition.id, content: edition.content, token: auth})
        }
        setEdition({active: false, id: null, content: null})
    }

    const reactToMessage = async (id, reaction) => {
        socket.emit('react-message', {id: id, reaction: reaction, token: auth})
    }

    const setReply = async (message) => {
        dispatch(setReplySlice(message))
    }

    const setEmoji = async (position, message) => {
        dispatch(setEmojiSlice(position, message))
    }

    const kickUser = async (user) => {
        socket.emit('kick-user', {id: group.id, user: user, token: auth})
    }

    const promoteUser = async (user) => {
        socket.emit('promote-user', {id: group.id, user: user, token: auth})
    }

    return { checkGroup, onKick, leaveGroup, setConversation, fetchGroups, kickUser, promoteUser, setEmoji, messagesIsFetching, groupIsFetching, emoji, messageHasNextPage, groupResponse, groups, group, messages, message, messages_showed, edition, groupsIsLoading, reply, messageFetchNextPage, setReply, onMessageReceived, setEdition, fetchGroup, sendMessage, activeMessage,  deleteMessage, editMessage, reactToMessage }

}