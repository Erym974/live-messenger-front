import { createSlice } from "@reduxjs/toolkit";

export const messengerSlice = createSlice({
    name: "messenger",
    initialState: {
        group: null,
        groups: [],
        messages: [],
        message: null,
        emoji: null,
        reply: null,
        subMenu: null,
        edition: {active: false, id: null, content: null},
        loadingGroups: true,
        loadingGroup: true,
    },
    reducers: {
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
            state.messages_showed = state.messages.length
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        newMessage: (state, action) => {
            if(state.messages.find(message => message.id === action.payload.id)) return
            state.messages.push(action.payload);
            state.messages_showed = state.messages.length
            state.messages_total += 1
        },
        replaceMessage: (state, action) => {
            state.messages = state.messages.map(message => message.id === action.payload.id ? action.payload : message)
            state.groups = state.groups.map(group => group.id === state.group.id ? group.lastMessage.id === action.payload.id ? {...group, lastMessage: action.payload} : group : group)
        },
        setEdition: (state, action) => {
            state.edition = action.payload;
        },
        setLoadingGroups: (state, action) => {
            state.loadingGroups = action.payload;
        },
        setLoadingGroup: (state, action) => {
            state.loadingGroup = action.payload;
        },
        setReply: (state, action) => {
            state.reply = action.payload;
        },
        setEmoji: (state, action) => {
            state.emoji = action.payload;
        },
        removeConversation: (state, action) => {
            state.groups = state.groups.filter(group => group.id !== action.payload)
        },
        moveConversationToTop: (state, action) => {
            const newGroup = {...state.groups.find(group => group.id === action?.payload?.group), lastMessage: action?.payload?.message}
            state.groups = [newGroup, ...state.groups.filter(group => group.id !== action.payload.group)]
        }
    }
})

export const { moveConversationToTop, removeConversation, setReply, setEmoji, setTotalMessages, setGroup, setGroups, setSubMenu, setMessages, setMessage, newMessage, replaceMessage, setToggleScroll, setEdition, setLoadingGroups, setLoadingGroup } = messengerSlice.actions;