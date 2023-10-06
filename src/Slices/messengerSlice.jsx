import { createSlice } from "@reduxjs/toolkit";

export const messengerSlice = createSlice({
    name: "messenger",
    initialState: {
        group: null,
        groups: [],
        messages: [],
        message: null,
        edition: {active: false, id: null, content: null},
        loadingGroups: false,
        loadingGroup: false,
        loadingMessages: false,
    },
    reducers: {
        setGroup: (state, action) => {
            state.group = action.payload;
        },
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        newMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        replaceMessage: (state, action) => {
            const editedMessage = action.payload
            state.messages = state.messages.map(message => message.id === editedMessage.id ? action.payload : message)
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
        setLoadingMessages: (state, action) => {
            state.loadingMessages = action.payload;
        }
    }
})

export const { setGroup, setGroups, setMessages, setMessage, newMessage, replaceMessage, setEdition, setLoadingGroups, setLoadingGroup, setLoadingMessages } = messengerSlice.actions;