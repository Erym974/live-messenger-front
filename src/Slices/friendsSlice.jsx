import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        friends: [],
        invites: [],
    },
    reducers: {
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        setInvites: (state, action) => {
            state.invites = action.payload;
        },
    }
})

export const { setFriends, setInvites } = friendsSlice.actions;