import {createSlice} from "@reduxjs/toolkit";

const updateTaskModalSliceFunc = createSlice({
    name: 'updateTaskModalSliceName',
    initialState:{
        isUpdateTaskModalSliceModalOpen: false,
        taskDetails: null
    },
    reducer: {
        openUpdateTaskModal: (state, action) => {
            state.isUpdateTaskModalSliceModalOpen = true
            // state.taskDetails = action.payload
        },
        closeUpdateTaskModal: (state, action) => {
            state.isUpdateTaskModalSliceModalOpen = false
            // state.taskDetails = action.payload
        }
    }
});

export const {openUpdateTaskModal, closeUpdateTaskModal} = updateTaskModalSliceFunc.actions;

export default updateTaskModalSliceFunc.reducer;