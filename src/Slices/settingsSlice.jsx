import { createSlice } from "@reduxjs/toolkit";
import Language from "../Constant/Language";
const { localStorage } = window;



export const settingsSlice = createSlice({
    name: "settings",
    initialState: () => {
        
        const language = localStorage.getItem('language') || Language.DEFAULT;
        const notifications = (localStorage.getItem('notifications') === "false") ? false : true;
        const responsiveAside = (localStorage.getItem('responsiveAside') === "false") ? false : true;

        return {
            notifications,
            responsiveAside,
            language,
        }
    },
    reducers: {
        setLanguage: (state, { payload }) => {
            localStorage.setItem('language', payload.language);
            state.language = payload.language;
        },
        toggleNotifications: (state) => {
            state.notifications = !state.notifications;
            localStorage.setItem('notifications', state.notifications);
        },
        toggleResponsiveAside: (state, { payload }) => {
            state.responsiveAside = payload;
            localStorage.setItem('responsiveAside', state.responsiveAside);
        }
    }
})

export const { setLanguage, toggleTheme, toggleNotifications, toggleResponsiveAside } = settingsSlice.actions;