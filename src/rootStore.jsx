import { configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "./Slices/profileSlice";
import { messengerSlice } from "./Slices/messengerSlice";
import { settingsSlice } from "./Slices/settingsSlice";
import { authSlice } from "./Slices/authSlice";
import { friendsSlice } from "./Slices/friendsSlice";
import { modalSlice } from "./Slices/modalSlice";
import { generalSlice } from "./Slices/generalSlice";
import { imagesSlice } from "./Slices/imagesSlices";

const store = configureStore({
    reducer: {
        profile: profileSlice.reducer,
        messenger: messengerSlice.reducer, 
        settings: settingsSlice.reducer,
        auth: authSlice.reducer,
        friends: friendsSlice.reducer,
        modal: modalSlice.reducer,
        general: generalSlice.reducer,
        images: imagesSlice.reducer
    }
})

export default store;