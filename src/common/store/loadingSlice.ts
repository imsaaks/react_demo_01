import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {isShow: false},
    reducers: {
        showLoading: (state) => {
            state.isShow = true;
        },
        hideLoading: (state) => {
            state.isShow = false;
        }
    }
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;