import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        profileIsLoading: false
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setLoading: (state, action) => {
            state.profileIsLoading = action.payload;
        }
    }
})

export const { setProfile, setLoading } = profileSlice.actions;