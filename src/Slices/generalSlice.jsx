import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const generalSlice = createSlice({
    name: "general",
    initialState: {
        socketInitied: false,
        error: null,
        cookie: JSON.parse(Cookies.get('cookies') ?? null),
    },
    reducers: {
        setInitiedSocket: (state, action) => {
            state.socketInitied = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        acceptCookie: (state, action) => {
            Cookies.set('cookies', true, { path: '/' })
            state.cookie = true
        }
    }
})

export const { setError, setInitiedSocket, acceptCookie } = generalSlice.actions;