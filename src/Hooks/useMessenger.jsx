import { useEffect, useState } from "react"
import  { useApi } from "./CustomHooks"
import { useDispatch, useSelector } from "react-redux"
import { setGroup, setGroups, setMessages, setMessage, newMessage, replaceMessage, setEdition as setSliceEdition, setLoadingGroup, setLoadingGroups, setLoadingMessages } from "../Slices/messengerSlice"

export default function useMessenger() {

    const dispatch = useDispatch()

    const { group, groups, messages, message, edition, loadingGroups, loadingMessages } = useSelector(state => state.messenger)

    const { get: getGroups } = useApi("api/groups")
    const { get: getGroup } = useApi("api/groups")
    const { get: getMessages } = useApi("api/messages?limit=50")
    const { post: sendMessagesApi } = useApi("api/messages")
    const { patch: editMessageApi } = useApi("api/message")

    useEffect(() => {
        if(edition.active && edition.content?.trim().length === 0) {
            setEdition({active: false, id: null, content: null})
        }
    }, [edition])

    const fetchGroups = async () => {
        dispatch(setLoadingGroups(true))
        const response = await getGroups()
        dispatch(setLoadingGroups(false))
        if(!response?.status) return
        dispatch(setGroups(response.datas))
    }

    const fetchGroup = async (id) => {
        dispatch(setLoadingGroup(true))
        if(group) dispatch(setGroup(null))
        if(messages.length > 0) dispatch(setMessages([]))
        const response = await getGroup([id])
        dispatch(setLoadingGroup(false))
        if(!response?.status) return  
        dispatch(setGroup(response.datas))
    }

    const fetchMessages = async (id) => {
        dispatch(setLoadingMessages(true))
        const response = await getMessages([id])
        dispatch(setLoadingMessages(false))
        if(!response?.status) return
        dispatch(setMessages(response.datas))
    }

    const sendMessage = async (id, content) => {
        const response = await sendMessagesApi({group: id, message: content})
        if(!response?.status) return
    }

    const messageReceived = async (id, message) => {
        dispatch(newMessage(message))
        pushNewMessage(id, message)
    }

    const pushNewMessage = async (id, message) => {
        
        let tempsGroups = [...groups];
        let tempGroup = {...groups.find(g => g.id == id)};

        const index = groups.indexOf(groups.find(g => g.id == id));

        tempsGroups.splice(index, 1);
        tempGroup.lastMessage = message
        tempsGroups.splice(0, 0, tempGroup);
        dispatch(setGroups(tempsGroups))

        const target = document.getElementById("scroll-target");
        target.scrollIntoView({ behavior: 'smooth'});
    }

    const activeMessage = async (id) => {
        if(message === id) dispatch(setMessage(null))
        else dispatch(setMessage(id))
        setEdition({active: false, id: null, content: null})
    }

    const onEditMessage = async (message) => {
        dispatch(replaceMessage(message))
    }

    const deleteMessage = async (id) => {
        const response = await editMessageApi({ id, status: "deleted" })
        if(!response?.status) return
        // dispatch(replaceMessage({id, message: response.datas}))
    }

    const setEdition = async (value) => {
        dispatch(setSliceEdition(value))
    }

    const editMessage = async () => {
        if(edition?.content?.trim()?.length > 0) {
            const response = await editMessageApi({ id: edition.id, content: edition.content })
            if(!response?.status) return
            // dispatch(replaceMessage({id: edition.id, message: response.datas}))  
        }
        setEdition({active: false, id: null, content: null})
    }

    const reactToMessage = async (id, reaction) => {
        const response = await editMessageApi({ id: id, reaction: reaction })
        if(!response?.status) return
        // dispatch(replaceMessage({id: id, message: response.datas})) 
    }

    return { groups, group, messages, message, edition, loadingMessages, loadingGroups, onEditMessage, messageReceived, setEdition, fetchGroup, fetchGroups, fetchMessages, sendMessage, activeMessage,  deleteMessage, editMessage, reactToMessage }

}