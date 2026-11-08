import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '@common/store/loadingSlice.ts';

export const store = configureStore({
    reducer: {
        loading : loadingReducer
    },
})