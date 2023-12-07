import { createSlice } from "@reduxjs/toolkit";
import Language from "../Constant/Language";
const { localStorage } = window;



export const settingsSlice = createSlice({
    name: "settings",
    initialState: () => {
        
        const language = localStorage.getItem('language') || Language.DEFAULT;
        const asideState = (localStorage.getItem('asideState') === "false") ? false : true;

        return {
            asideState,
            language,
            searchModal: false,
        }
    },
    reducers: {
        setLanguage: (state, { payload }) => {
            localStorage.setItem('language', payload.language);
            state.language = payload.language;
        },
        toggleAside: (state, { payload }) => {
            state.asideState = payload;
            localStorage.setItem('asideState', state.asideState);
        },
        openSearchModal: (state) => {
            state.searchModal = true;
        },
        closeSearchModal: (state) => {
            state.searchModal = false;
        }
    }
})

export const { setLanguage, toggleTheme, toggleAside, openSearchModal, closeSearchModal } = settingsSlice.actions;