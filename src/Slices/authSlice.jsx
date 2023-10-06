import { createSlice } from "@reduxjs/toolkit";

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
            state.mercure = action.payload
        }
    }
})

export const { setLoading, setAuth, setUser, setMercure } = authSlice.actions;