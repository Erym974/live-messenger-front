import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
    },
    reducers: {
        showProfile: (state, action) => {
            state.profile = action.payload;
        }
    }
})

export default profileSlice;