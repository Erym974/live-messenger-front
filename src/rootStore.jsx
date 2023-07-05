import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./Slices/Profile";
import messengerSlice from "./Slices/Messenger";
import settingsSlice from "./Slices/Settings";

const store = configureStore({
    reducer: {
        profile: profileSlice.reducer,
        messenger: messengerSlice.reducer, 
        settings: settingsSlice.reducer,
    }
})

export default store;