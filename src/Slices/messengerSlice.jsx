import { createSlice } from "@reduxjs/toolkit";

export const messengerSlice = createSlice({
    name: "messenger",
    initialState: {
        group: null,
        groups: [],
        messages: [],
        message: null,
        messagesIsFetching: false,
        emoji: null,
        reply: null,
        subMenu: null,
        edition: {active: false, id: null, content: null},
        messagesDatas: {
            isFetching: false,
            hasNextPage: true
        },
        groupDatas: {
            isFetching: false,
        }
    },
    reducers: {
        setMessageFetching: (state, action) => {
            state.messagesIsFetching = action.payload;
        },
        setGroup: (state, action) => {
            state.group = action.payload;
        },
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        setSubMenu: (state, action) => {
            state.subMenu = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        newMessage: (state, action) => {
            if(state.messages.find(message => message.id === action.payload.id)) return replaceMessage(state, action)
            state.messages.push(action.payload)
        },
        replaceMessage: (state, action) => {
            state.messages = state.messages.map(message => message.id === action.payload.id ? action.payload : message)
            state.groups = state.groups.map(group => group.id === state.group?.id ? group.lastMessage?.id === action.payload?.id ? {...group, lastMessage: action.payload} : group : group)
        },
        setEdition: (state, action) => {
            state.edition = action.payload;
        },
        setReply: (state, action) => {
            state.reply = action.payload;
        },
        setEmoji: (state, action) => {
            state.emoji = action.payload;
        },
        addConversation: (state, action) => {
            state.groups = [action.payload, ...state.groups]
        },
        removeConversation: (state, action) => {
            state.groups = state.groups.filter(group => group.id !== action.payload)
        },
        moveConversationToTop: (state, action) => {
            const newGroup = {...state.groups.find(group => group.id === action?.payload?.group), lastMessage: action?.payload?.message}
            state.groups = [newGroup, ...state.groups.filter(group => group.id !== action.payload.group)]
        },
        updateConversation: (state, action) => {
            const newData = action.payload.group;
            const updatedGroups = state.groups.map(group => {
                if (group.id === newData.id) {
                    return {...group, picture: newData.picture, name: newData.name};
                }
                return group;
            });
            state.groups = updatedGroups;
        },
        addGroupInCache: (state, action) => {
            state.caches.group[action.payload.id] = action.payload;
        },
        setMessagesDatas: (state, action) => {
            const data = action.payload.data
            const value = action.payload.value
            state.messagesDatas[data] = value
        },
        setGroupDatas: (state, action) => {
            const data = action.payload.data
            const value = action.payload.value
            state.groupDatas[data] = value
        }
    }
})

export const { setGroupDatas, setMessagesDatas, addConversation, addGroupInCache, setMessageFetching,setMessageNextPage,  moveConversationToTop, updateConversation, removeConversation, setReply, setEmoji, setGroup, setGroups, setSubMenu, setMessages, setMessage, newMessage, replaceMessage, setEdition } = messengerSlice.actions;