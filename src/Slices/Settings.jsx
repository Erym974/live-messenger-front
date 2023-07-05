import { createSlice } from "@reduxjs/toolkit";
import Theme from "../Constant/Theme";
const { localStorage } = window;


const settingsSlice = createSlice({
    name: "settings",
    initialState: () => {
        const body = document.querySelector('body');

        const theme = localStorage.getItem('theme') || "light"
        body.classList.remove(Theme.LIGHT, Theme.DARK);
        body.classList.add(theme);

        const notifications = (localStorage.getItem('notifications') === "false") ? false : true;
        const responsiveAside = (localStorage.getItem('responsiveAside') === "false") ? false : true;

        return {
            theme,
            notifications,
            responsiveAside,
        }
    },
    reducers: {
        toggleTheme: (state, payload) => {
            if(state.theme === "light") state.theme = "dark";
            else state.theme = "light";

            localStorage.setItem('theme', state.theme);

            const body = document.querySelector('body');
            body.classList.remove(Theme.LIGHT, Theme.DARK);
            body.classList.add(state.theme);
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

export default settingsSlice;