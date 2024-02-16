import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeConversation, setGroup, setGroups, setReply as setReplySlice, setEmoji as setEmojiSlice, setMessages, setMessage, newMessage, replaceMessage, setEdition as setSliceEdition } from "../Slices/messengerSlice"
import axios from "../Api/axios"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { socket } from "../socket"
import toast from "react-hot-toast"

export default function useMessenger() {

    const dispatch = useDispatch()
    const { group, groups, messages, message, edition, reply, emoji, messages_showed } = useSelector(state => state.messenger)
    const { auth } = useSelector(state => state.auth)

    const [conversation, setConversation] = useState(null)
    const { current: messageLimit } = useRef(30)

    const { isLoading: groupsIsLoading, data: groupsResponse, refetch: fetchGroups } = useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/groups')
                if (!response.status || response.status === false) {
                  return [];
                }
                dispatch(setGroups(response.datas || []));
                return response.datas || [];
              } catch (error) {
                return [];
              }
        }
    })

    const { isLoading: messagesIsLoading, data: messageResponse, refetch: refetchMessages, isFetching: messageIsFetching, fetchNextPage: messageFetchNextPage, hasNextPage: messageHasNextPage } = useInfiniteQuery({
        queryKey: ['messages', conversation],
        enabled: true,
        getNextPageParam: (lastPage, allPages) => {
            if(allPages.length + 1 > lastPage?.datas?.pages) return undefined;
            else return allPages.length + 1
        },
        queryFn: async ({ pageParam = 1 }) => {
            if(conversation) return await axios.get(`/api/messages/${conversation}?limit=${messageLimit}&page=${pageParam}`)
        },
    })

    const { isLoading: groupIsLoading, data: groupResponse, refetch: fetchGroup } = useQuery({
        queryKey: ['group', conversation],
        enabled: false,
        queryFn: async (id) => {
            if(conversation) {
                try {
                    const response = await axios.get(`/api/groups/${conversation}`);
                    if (!response.status || response.status === false) return null;
                    dispatch(setGroup(response.datas))
                    return response.datas || null;
                } catch (error) {
                    return null;
                }
            }
        }
    })

    // Fetch group
    useEffect(() => {
        if(!conversation) return
        dispatch(setMessages([]))
        dispatch(setGroup(null))
        fetchGroup()
    }, [conversation])
    
    // Fetch messages
    useEffect(() => {
        if(messageIsFetching || messageResponse.pages[0] === undefined) return
        const msgs =  messageResponse.pages.reverse().map((page) => page.datas.messages).flat()
        dispatch(setMessages(msgs))
    }, [messageIsFetching])

    // Message edition
    useEffect(() => {
        if(edition.active && edition.content?.trim().length === 0) {
            setEdition({active: false, id: null, content: null})
        }
    }, [edition])

    useEffect(() => {
        if(!groupResponse) return

        socket.emit('join', {id: groupResponse.id, token: auth})

        socket.on('new-message', onMessageReceived)
        socket.on('message-updated', onMessageUpdated)
        socket.on('group-updated', onGroupUpdated)

        return () => {
            socket.emit('leave', groupResponse.id)

            socket.off('new-message')
            socket.off('message-updated')
            socket.off('group-updated')
        }
    }, [groupResponse])

    /** When the group is updated */
    const onGroupUpdated = async (group) => {
        dispatch(setGroup(group))
    }

    /** When we send a message */
    const sendMessage = async (id, content, files = []) => {

        let datasToSend = {message: content}

        if(reply != null) datasToSend = {...datasToSend, reply: reply.id}

        if(files.length > 0) {
            datasToSend = new FormData()
            datasToSend.append('group', id)
            datasToSend.append('message', content)
            Array.from(files.map(file => file.file)).forEach(file => {
                datasToSend.append('files[]', file);
            });

            // TODO : Send a message with file
            // socket.emit('send-message', {group: id, message: JSON.stringify(datasToSend), token: auth})
        } else {
            socket.emit('send-message', {group: id, message: datasToSend, token: auth})
        }

        
    }

    /** When we receive new message */
    const onMessageReceived = async (message) => {
        dispatch(newMessage(message))
    }

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

    return { onKick, setConversation, fetchGroups, kickUser, promoteUser, setEmoji, emoji, messageIsFetching, messageHasNextPage, groupResponse, groups, group, messages, message, messages_showed, edition, groupsIsLoading, reply, messageFetchNextPage, setReply, onMessageReceived, setEdition, fetchGroup, sendMessage, activeMessage,  deleteMessage, editMessage, reactToMessage }

}