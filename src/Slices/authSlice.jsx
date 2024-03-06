import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: true,
        auth: Cookies.get("auth") ?? false,
        user: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setAuth: (state, action) => {
            state.auth = action.payload
            state.auth  === null ? 
                Cookies.remove("auth") :
                Cookies.set("auth", state.auth)
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
        }
    }
})

export const { setLoading, setAuth, setUser } = authSlice.actions;