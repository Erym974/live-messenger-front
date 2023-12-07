import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        friends: [],
        invites: [],
        listened: []
    },
    reducers: {
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        setInvites: (state, action) => {
            state.invites = action.payload;
        },
        addListened: (state, action) => {
            state.listened.push(action.payload);
        }, 
        removeListened: (state, action) => {
            state.listened = state.listened.filter(l => l !== action.payload);
        },
        pushNewInvite: (state, action) => {
            state.invites.push(action.payload);
        },
        pushNewFriend: (state, action) => {
            state.friends.push(action.payload);
        },
        removeInvite: (state, action) => {
            state.invites = state.invites.filter(i => i.id !== action.payload.id);
        }, 
        removeFriend: (state, action) => {
            state.friends = state.friends.filter(f => f.id !== action.payload.id);
        }
    }
})

export const { setFriends, setInvites, addListened, removeListened, pushNewInvite, pushNewFriend, removeInvite, removeFriend } = friendsSlice.actions;