import { createSlice } from "@reduxjs/toolkit";

export const realtimeSlice = createSlice({
    name: "realtime",
    initialState: {
        socketInitied: false
    },
    reducers: {
        setInitiedSocket: (state, action) => {
            state.socketInitied = action.payload
        }
    }
})

export const { addSubscribtion, removeSubscribtion, setInitiedSocket } = realtimeSlice.actions;