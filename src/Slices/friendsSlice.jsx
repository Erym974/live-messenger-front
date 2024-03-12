import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        friends: [],
        invites: [],
        listened: [],
        onlines: []
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
        },
        toggleOnline: (state, action) => {
            const who = action.payload.id
            const online = action.payload.status

            if(online) state.onlines.push(who)
            else state.onlines = state.onlines.filter(o => o !== who)
        },
    }
})

export const { setFriends, setInvites, addListened, removeListened, pushNewInvite, pushNewFriend, removeInvite, removeFriend, removeOnline, toggleOnline } = friendsSlice.actions;