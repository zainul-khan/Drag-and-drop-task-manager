import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    loading: false,
    error: ''
};


const utilsSliceFunc = createSlice({
    name: 'utilsName',
    initialState,
    reducers: {
        requestSent: (state, action) => {
            state.loading = true
        },
        responseRecieved: (state, action) => {
            state.loading = false
        },
        recievedError: (state, action) => {
            // state.loading = false
            state.error = action.payload
        }
    },
});

export const { requestSent, responseRecieved, recievedError } = utilsSliceFunc.actions;


export default utilsSliceFunc.reducer;