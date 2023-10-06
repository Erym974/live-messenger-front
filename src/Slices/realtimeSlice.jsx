import { createSlice } from "@reduxjs/toolkit";

export const realtimeSlice = createSlice({
    name: "realtime",
    initialState: {
        subscribions: []
    },
    reducers: {
        addSubscribtion: (state, action) => {
            state.subscribions.push(action.payload)
        },
    }
})

export const { addSubscribtion } = realtimeSlice.actions;