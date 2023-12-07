import { createSlice } from "@reduxjs/toolkit";

export const messengerSlice = createSlice({
    name: "messenger",
    initialState: {
        group: null,
        groups: [],
        messages: [],
        message: null,
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
        replaceGroup: (state, action) => {
            state.groups = state.groups.map(group => group.id === action.payload.id ? action.payload : group)
            const group = state.groups.find(group => group.id === action.payload.id)
            group.unread = true
            state.groups = [group, ...state.groups.filter(group => group.id !== action.payload.id)]
        },
        setReaded: (state, action) => {
            state.groups = state.groups.map(group => group.id === action.payload ? {...group, unread: false} : group)
        },
        addMoreMessages: (state, action) => {
            state.messages = [...action.payload, ...state.messages]
            state.messages_showed = state.messages.length
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
            state.groups = state.groups.map(group => group.id === state.group.id ? {...group, lastMessage: action.payload} : group)
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
        }
    }
})

export const { addMoreMessages, setReply, setTotalMessages, setGroup, setGroups, setSubMenu, setMessages, replaceGroup, setMessage, newMessage, setReaded, replaceMessage, setToggleScroll, setEdition, setLoadingGroups, setLoadingGroup } = messengerSlice.actions;