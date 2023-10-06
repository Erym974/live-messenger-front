import { createSlice } from "@reduxjs/toolkit";


export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isModalOpen: false,
        modal: null
    },
    reducers: {
        openModal: (state, { payload }) => {
            state.isModalOpen = true;
            state.modal = payload;
        },
        closeModal: (state, action) => {
            state.isModalOpen = false;
            state.modal = null;
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;