import { createSlice } from "@reduxjs/toolkit";


export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isModalOpen: false,
        modal: null,
        params: null
    },
    reducers: {
        openModal: (state, { payload }) => {
            state.isModalOpen = true;
            state.modal = payload.name;
            state.params = payload.params;
        },
        closeModal: (state, action) => {
            state.isModalOpen = false;
            state.modal = null;
            state.params = null;
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;