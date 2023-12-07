import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
    name: "images",
    initialState: {
        // images: ["/ressources/profile_picture.jpg", "/ressources/istockphoto-1384023443-2048x2048.jpg", "/ressources/istockphoto-1171884242-2048x2048.jpg"],
        images: [],
        open: false,
        downloadable: false,
    },
    reducers: {
        setDownloadable: (state, action) => {
            state.downloadable = action.payload;
        },
        closeImages: (state, action) => {
            state.images = []
            state.open = false;
        },
        openImages: (state, action) => {
            state.images = action.payload;
            state.open = true;
        }
    }
})

export const { setDownloadable, closeImages, openImages  } = imagesSlice.actions;