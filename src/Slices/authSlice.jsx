import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: true,
        auth: localStorage.getItem("auth") ?? null,
        mercure: null,
        user: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setAuth: (state, action) => {
            state.auth = action.payload
            state.auth  === null ? 
                localStorage.removeItem("auth") : 
                localStorage.setItem("auth", state.auth)
        },
        setUser: (state, action) => {
            let user = action.payload
            if(user) {
                user.settings = user?.settings.map(setting => ({
                    value: setting.meta.allowed === "string" ? setting.value : JSON.parse(setting.value),
                    meta: setting.meta.name
                }));
            }
            state.user = user
        },
        setMercure: (state, action) => {
            const jwt = action.payload
            Cookies.set('mercureAuthorization', jwt, { expires: 1 })
            state.mercure = jwt
        }
    }
})

export const { setLoading, setAuth, setUser, setMercure, setNewConnection } = authSlice.actions;