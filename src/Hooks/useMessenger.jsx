import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGroup, setGroups, setReply as setReplySlice, setMessages, setMessage, newMessage, replaceMessage, setEdition as setSliceEdition, setLoadingGroup, setLoadingGroups, setToggleScroll, setTotalMessages, addMoreMessages } from "../Slices/messengerSlice"
import axios from "../Api/axios"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import useRealtime from "./useRealtime"
import { socket } from "../socket"

export default function useMessenger() {

    const dispatch = useDispatch()
    const { group, groups, messages, message, edition, reply, messages_showed } = useSelector(state => state.messenger)

    const [conversation, setConversation] = useState(null)
    const { current: messageLimit } = useRef(10)

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
        }
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
        socket.emit('join', groupResponse.id)
        socket.on('message', messageReceived)
        return () => {
            socket.emit('leave', groupResponse.id)
            socket.on('message', messageReceived)
        }
    }, [groupResponse])

    const sendMessage = async (id, content, files = []) => {

        let datasToSend = {group: id, message: content}

        if(reply != null) datasToSend = {...datasToSend, reply: reply.id}

        if(files.length > 0) {
            datasToSend = new FormData()
            datasToSend.append('group', id)
            datasToSend.append('message', content)
            Array.from(files.map(file => file.file)).forEach(file => {
                datasToSend.append('files[]', file);
            });
        }

        socket.emit('message', datasToSend)
        
        // const response = await axios.post('/api/messages', datasToSend)
        // if(!response?.status) return
        // if(!response.datas) return
    }

    const messageReceived = async (message) => {
        dispatch(newMessage(message))
    }

    const activeMessage = async (id) => {
        if(message === id) dispatch(setMessage(null))
        else dispatch(setMessage(id))
        setEdition({active: false, id: null, content: null})
    }

    const onEditMessage = async (id, message) => {
        dispatch(replaceMessage(message))
    }

    const deleteMessage = async (id) => {
        const response = await axios.patch('api/message', { id, status: "deleted" })
        if(!response?.status) return
        // dispatch(replaceMessage({id, message: response.datas}))
    }

    const setEdition = async (value) => {
        dispatch(setSliceEdition(value))
    }

    const editMessage = async () => {
        if(edition?.content?.trim()?.length > 0) {
            const response = await axios.patch('api/message', { id: edition.id, content: edition.content })
            if(!response?.status) return
        }
        setEdition({active: false, id: null, content: null})
    }

    const reactToMessage = async (id, reaction) => {
        const response = await axios.patch('api/message', { id: id, reaction: reaction })
        if(!response?.status) return
        // dispatch(replaceMessage({id: id, message: response.datas})) 
    }

    const setReply = async (message) => {
        dispatch(setReplySlice(message))
    }

    return { setConversation, fetchGroups, messageIsFetching, messageHasNextPage, groupResponse, groups, group, messages, message, messages_showed, edition, groupsIsLoading, reply, messageFetchNextPage, setReply, onEditMessage, messageReceived, setEdition, fetchGroup, sendMessage, activeMessage,  deleteMessage, editMessage, reactToMessage }

}