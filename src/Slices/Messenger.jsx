import { createSlice } from "@reduxjs/toolkit";

import { fakeConversations, fakeHistory } from "../faker";

const messengerSlice = createSlice({
    name: "messenger",
    initialState: {
        conversation: fakeConversations[0],
        history: fakeHistory
    },
    reducers: {
        sendMessage: (state, action) => {
            state.conversation.messages.push(action.payload);
        },
        changeConversation: (state, action) => {
            const id = action.payload;
            const conversation = fakeConversations.find((conversation) => conversation.id === id);
            state.conversation = conversation ?? null;
        },
        openLastConversation: (state) => {
            const conversation = fakeConversations[0];
            state.conversation = conversation ?? null;
        },
        showProfile: (state, action) => {
            
        }
    }
})

export default messengerSlice;